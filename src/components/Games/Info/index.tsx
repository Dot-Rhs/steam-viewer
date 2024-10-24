import { useEffect, useState } from "react";
import { Card } from "./card"
import { IGameInfo } from "../interfaces";

export const InfoPanel = ({ appId }) => {
    const [gameInfo, setGameInfo] = useState<IGameInfo | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchInfo = async () => {

            setLoading(() => true);
            try {
                console.log('sdsds');
                const getGameInfo = await fetch(`http://localhost:5000/gameInfo/${ appId }`);
                console.log('what2: ', appId);

                const data = await getGameInfo.json();
                // const friendsData = await getFriends.json()
                if (data[`${ appId }`] && data[`${ appId }`].success === true) {
                    const gameData = data[`${ appId }`].data

                    const formattedData = {
                        id: gameData.steam_appid,
                        name: gameData.name,
                        description: gameData.detailed_description,
                        languages: gameData.supported_languages,
                        headerImg: gameData.header_image,
                        website: gameData.website,
                        screenshots: gameData.screenshots,
                        releaseDate: gameData.release_date,
                        backgroundImg: gameData.background
                    }

                    setGameInfo((prev) => (formattedData));
                }
                // setAppId(() => val);

                // console.log('DAAA: ', await data[`${ appId }`])
                // if (tempHeight === null) return;
                // setHeight(height === 0 ? tempHeight : 0);
            } catch (error: unknown) {
                console.log('you got an errrrr: ', error)
                if (error instanceof Error) setErrorMsg(() => error?.message);
            }
            setLoading(() => false);
        }
        if (gameInfo?.id !== appId) fetchInfo()
    }, [appId])

    return (
        <div>INFOOOO
            {loading && <h2>Loading...</h2>}
            {errorMsg && <h2>{errorMsg}</h2>}
            <>
                {(!loading && gameInfo !== null) ? (
                    <Card data={gameInfo} />) : null
                }
            </>
        </div>
    )
}