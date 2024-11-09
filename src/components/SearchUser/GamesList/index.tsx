import { useEffect, useRef, useState } from "react"
import { IGameDetailed, IGameInfo, IOwnedGame, IPlayerGames } from "../../../interfaces";
import { GameInfo } from "./GameInfo";

interface IProps {
    gamesList: IPlayerGames
    userId: number;
}
interface IGameData {
    games: IGameDetailed[]
}

const defaultCount = 10

export const GamesList = ({ gamesList, userId }: IProps) => {
    const [gameData, setGameData] = useState<IGameData>({ games: [] });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [count, setCount] = useState<number>(defaultCount)
    const [loading, setLoading] = useState(false);

    const batchDelayFetch = async (abortSignal: AbortSignal) => {
        setLoading(() => true)

        let i = 0

        const temp: IOwnedGame[] = gamesList.games.slice(count - defaultCount, count)

        while (i <= count) {
            for (let j = 0; j < 3; j++) {
                const tempGame = temp[i]

                if (tempGame) {
                    try {
                        const response = await fetch(`${ import.meta.env.VITE_LOCAL_GAMES_API_BASE_DOMAIN }/getGameInfo/${ tempGame.appid }`, { signal: abortSignal })

                        const responseData = await response.json()

                        if (responseData?.success
                            && responseData?.data) {
                            setGameData((prev) => ({ games: [...prev.games, responseData.data] }))
                        }
                    } catch (error) {
                        if (abortSignal.aborted) return

                        if (error instanceof Error) setErrorMsg(() => error?.message);
                    }
                }
                i = i + 1
            }
            await new Promise(ok => setTimeout(ok, 400));
        }

        setLoading(() => false)
    }

    useEffect(() => {
        const abortController = new AbortController();

        const handleFetch = async () => {
            await batchDelayFetch(abortController.signal)
        };

        if ((gamesList?.games?.length && count === defaultCount)) {
            handleFetch()
        }

        if (count > defaultCount) {
            handleFetch()
        }

        return () => {
            return abortController.abort()
        }

    }, [count])

    // Just do achievements for now

    return (
        <>
            {gameData?.games?.length ? gameData.games.map((game, idx) => (
                <GameInfo gameData={game} userId={userId} key={idx + game.steam_appid} />)) : null}
            <div>
                {loading ? <p>Loading...</p> : null}
                {!loading && count < gamesList.games.length ?
                    <>
                        <p>...{gamesList.games.length - gameData.games.length} more</p>
                        <button onClick={() => setCount((prev) => prev + defaultCount)
                        }>Load More</button>
                    </>
                    : null}
            </div>
        </>
    )
}