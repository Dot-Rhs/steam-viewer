import { useEffect, useState } from "react";
import { Card } from "./card"
import { IGameInfo } from "../../../interfaces";

interface IProps {
    appId: number
}

export const InfoPanel = ({ appId }: IProps) => {
    const [gameInfo, setGameInfo] = useState<IGameInfo | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchInfo = async () => {

            setLoading(() => true);
            try {
                const getGameInfo = await fetch(`${ import.meta.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN }/aggregateGameInfo/${ appId }`);
                console.log('what2: ', appId);

                const infoData = await getGameInfo.json();
                console.log('INFO: ', infoData);



                if (infoData.success) {
                    const gameData = infoData.data

                    const formattedData = {
                        id: gameData.steam_appid,
                        name: gameData.name,
                        description: gameData.detailed_description,
                        languages: gameData.supported_languages,
                        headerImg: gameData.header_image,
                        website: gameData.website,
                        screenshots: gameData.screenshots,
                        releaseDate: gameData.release_date,
                        backgroundImg: gameData.background,
                        currentPlayers: gameData.currentPlayers
                    }

                    setGameInfo(() => (formattedData));
                }

            } catch (error: unknown) {
                if (error instanceof Error) setErrorMsg(() => error?.message);
            }
            setLoading(() => false);
        }
        if (gameInfo?.id !== appId) fetchInfo()
    }, [appId])

    return (
        <div className="info-container">
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