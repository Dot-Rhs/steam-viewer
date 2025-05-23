import { useEffect, useState } from "react"
import { IOwnedGame, IPlayerGames } from "../../../interfaces";
import { GameInfo } from "./GameInfo";
import useStateContext from "../../context/hook/useStateContext";

interface IProps {
    gamesList: IPlayerGames
    userId: string | number;
}

const defaultCount = 10

export const GamesList = ({ gamesList, userId }: IProps) => {
    const { gameData, setGameData, currentId } = useStateContext()

    // const [gameData, setGameData] = useState<IGameData>({ games: [] });
    const [_errorMsg, setErrorMsg] = useState<string | null>(null);
    const [count, setCount] = useState<number>(defaultCount > gameData?.games?.length ? defaultCount : gameData?.games?.length)
    const [loading, setLoading] = useState(false);

    const batchDelayFetch = async (abortSignal: AbortSignal) => {
        if (gameData?.games?.length && currentId === userId && count === gameData?.games?.length) return
        console.log('bon');

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

    return (
        <>
            {gameData?.games?.length ? gameData.games.map((game, idx) => (
                <GameInfo gameData={game} userId={userId} key={idx + game.steam_appid} disabled={loading} />)) : null}
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