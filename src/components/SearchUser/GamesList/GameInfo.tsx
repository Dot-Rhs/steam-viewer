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
    const [info, setInfo] = useState()
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
        if (loading) return (<p>Loading User Stats...</p>)
        if (errorMsg) return (<p>{errorMsg}</p>)

        return (
            <div>
                <div><h2>
                    Achievements
                </h2>
                    <div className='achievements-list'>
                        {info?.achievements?.achieved?.map(item => <Tooltip content={`${ item.displayName } Achieved`}>
                            <img src={item.icon} alt={`${ item.displayName } Achieved`}></img>
                        </Tooltip>
                        )}
                        {info?.achievements?.unachieved?.map(item => <Tooltip content={`${ item.displayName } Unachieved`}>
                            <img src={item.icon} alt={`${ item.displayName } Unachieved`}></img>
                        </Tooltip>
                        )}
                    </div>

                </div>
                <div><h2>Stats</h2>
                    <div>
                        {/* {info?.stats} */}
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div key={`gamep-appid${ gameData.steam_appid }`} >
                <img src={gameData?.capsule_image} alt={`${ gameData.name } image`} key={`image-appid${ gameData.steam_appid }`} onClick={() => setOpenModal(() => true)} />
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