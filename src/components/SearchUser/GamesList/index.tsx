import { useEffect, useRef, useState } from "react"

export const GamesList = ({ gamesList }) => {
    const [gameData, setGameData] = useState({ games: [] });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [count, setCount] = useState<number>(10)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const handleFetch = async () => {

            let i = count - 10
            setLoading(() => true);



            let temp = gamesList.games.slice(count - 10, count)
            console.log('GAAAMES: ', abortController);
            while (i <= count) {

                let results = [];
                let batch = [];
                for (let j = 0; j < 3; j++) {
                    let thisParam = temp.pop();
                    if (thisParam) {
                        try {
                            const response = await fetch(`${ import.meta.env.VITE_LOCAL_GAMES_API_BASE_DOMAIN }/getGameInfo/${ thisParam.appid }`, { signal: abortController.signal })


                            const responseData = await response.json()

                            if (responseData.success) {
                                let old = [...batch]
                                console.log('GARBALDI: ', responseData);

                                batch.push(responseData.data);
                            }

                        } catch (error) {
                            console.log('ABORT: ', abortController);
                            if (abortController.signal.aborted) return

                            if (error instanceof Error) setErrorMsg(() => error?.message);
                        }
                    }
                    i = i + j
                }
                let old = [...results]
                results = results.concat(await Promise.allSettled(batch));
                const newGamesList = results.map(item => item.value)

                console.log('GARAGE: ', await newGamesList, i)
                if (newGamesList.length) {

                    setGameData((prev) => ({ games: [...prev.games, ...newGamesList] }))
                }
                await new Promise(ok => setTimeout(ok, 400));

                // results = results.map(item => item.value)
            }


            setLoading(() => false);
            // return results;
            // }

        };

        if ((gamesList?.games?.length)) {
            handleFetch()
        }

        if (count > 10) {

            handleFetch()
        }

        return () => {
            console.log('Cleanup: ')
            return abortController.abort()
        }

    }, [count])

    // console.log('FRIENDS: ', games)

    return (
        <>
            {!!gameData?.games?.length ? gameData.games.map((game, idx) => (<div key={`${ idx }gamep-appid${ game.steam_appid }`}>
                <img src={game.capsule_imagev5} alt={`${ game.name } image`} key={`${ idx }image-appid${ game.steam_appid }`} />
                {/* <p>
                {friend.personaname}
                </p> */}
            </div>)) : null}
            <button onClick={() => setCount((prev) => prev + 10)
            }>Load More...</button>
        </>

    )
}