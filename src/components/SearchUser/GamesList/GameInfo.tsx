import { useEffect, useRef, useState } from "react"
import { useClickOutside } from "../../useClickOutside"
import { Modal } from "../../modal"
import { IGameDetailed } from "../../../interfaces"
import Tooltip from "../../Tooltip";

interface IProps {
    gameData: IGameDetailed;
    userId: number;
}


export const GameInfo = ({ gameData, userId }: IProps) => {
    const [info, setInfo] = useState({
        achievements: {
            achieved: [], unachieved: []
        }, stats: []
    })
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const fetchStats = async () => {

            setLoading(() => true);
            console.log(`http://localhost:5000/getUserGameStats/${ userId }/${ gameData.steam_appid }`);
            try {
                const getStats = await fetch(`http://localhost:5000/getUserGameStats/${ userId }/${ gameData.steam_appid }`);

                const data = await getStats.json();
                console.log('what2: ', data);

                setInfo(() => data)
                // const friendsData = await getFriends.json()
                // console.log('DAAA: ', contentRef.current.getBoundingClientRect().height)
                // if (data.appnews.newsitems) {
                //     setAppData((prev) => ({ newsitems: [...prev.newsitems, ...data.appnews.newsitems] }));
                // }
                // setAppId(() => val);

                // if (tempHeight === null) return;
                // setHeight(height === 0 ? tempHeight : 0);
            } catch (error: unknown) {
                if (error instanceof Error) setErrorMsg(() => error?.message);
            }
            setLoading(() => false);
        }

        if (openModal) fetchStats()
    }, [openModal])

    const ModalBody = () => {
        const { achievements, stats } = info
        const { achieved, unachieved } = achievements

        if (loading) return (<p>Loading User Stats...</p>)
        if (errorMsg) return (<p>{errorMsg}</p>)

        return (
            <div>
                {(achieved?.length || unachieved?.length) ? (<div><h2>
                    Achievements
                </h2>
                    <div className='achievements-list'>
                        {achieved?.map(item => <Tooltip content={<><p><b>{item.displayName} Achieved</b></p>
                            <p className="description"><i>{item.description}</i></p>
                        </>}>
                            <img src={item.icon} alt={`${ item.displayName } Achieved`} className="info-image"></img>
                        </Tooltip>
                        )}
                        {unachieved?.map(item => <Tooltip content={<><p><b>{item.displayName} Unachieved</b></p>
                            <p className="description"><i>{item.description}</i></p>
                        </>}>
                            <img src={item.icon} alt={`${ item.displayName } Unachieved`} className="info-image"></img>
                        </Tooltip>
                        )}
                    </div>

                </div>) : <p>No Achievement data available</p>}

                {stats.length ?
                    <div><h2>Stats</h2>
                        <div className="stats-list">
                            {stats.map(item => <p>{item.displayName}: <b>{item.value ?? 0}</b></p>)}
                        </div>
                    </div> : <p>No Stats data available</p>}
            </div>
        )
    }

    return (
        <>
            <div key={`gamep-appid${ gameData.steam_appid }`} >
                <img src={gameData?.capsule_image} alt={`${ gameData.name } image`} key={`image-appid${ gameData.steam_appid }`} onClick={() => setOpenModal(() => true)} className="info-image" />
            </div>

            {openModal ? (
                <Modal
                    id="player-modal"
                    body={<ModalBody />
                    }
                    closeModal={() => setOpenModal(() => false)}
                />
            ) : null}

        </>
    )
}