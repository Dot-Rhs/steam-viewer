import { useEffect, useRef, useState } from "react"
import { useClickOutside } from "../../useClickOutside"
import { Modal } from "../../modal"
import { IGameDetailed } from "../../../interfaces"
// import Tooltip from "../../Tooltip/Tooltip.tsx";
// import Tooltip from "../../Tooltip/index.tsx"
import { Tooltip } from 'react-tooltip'

interface IProps {
    gameData: IGameDetailed;
    userId: number;
    disabled?: boolean;
}

interface IStateInfo {
    achievements: {
        achieved: [], unachieved: []
    }, stats: []
}

// Get total num achievements 3/12 etc etc etc
// Maybe global total if poss
// Fix scroll issue with tooltip

export const GameInfo = ({ gameData, userId, disabled = false }: IProps) => {
    const [info, setInfo] = useState<IStateInfo>({
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

                const data = await getStats.json() as IStateInfo;

                setInfo(() => data)
            } catch (error: unknown) {
                if (error instanceof Error) setErrorMsg(() => error?.message);
            }
            setLoading(() => false);
        }

        if (openModal) fetchStats()
    }, [openModal, gameData, userId])

    const ModalBody = () => {
        const { achievements, stats } = info
        const { achieved, unachieved } = achievements

        if (loading) return (<p>Loading User Stats...</p>)
        if (errorMsg) return (<p>{errorMsg}</p>)

        return (
            <div>
                <h2>{gameData.name}</h2>
                {(achieved?.length || unachieved?.length) ? (<div><h2>
                    Achievements
                </h2>
                    <div className='achievements-list'>
                        {achieved?.map(item => {
                            return (
                                <>
                                    <a data-tooltip-id="achieved-tooltip"
                                        data-tooltip-html={`<div><p><b>${ item.displayName } <br>Achieved</b></p>
                                            <p className="description"><i>${ item.description }</i></p>
                                        </div>`}
                                        data-tooltip-offset={15}
                                    >
                                        <img src={item.icon} alt={`${ item.displayName } Achieved`} className="info-image"></img>
                                    </a>
                                </>
                            )
                        })}
                        <Tooltip id='achieved-tooltip' />
                        {unachieved?.map(item => {
                            return (
                                <>
                                    <a data-tooltip-id="unachieved-tooltip"
                                        data-tooltip-html={`<div><p><b>${ item.displayName } Unachieved</b></p>
                                            <p className="description"><i>${ item.description }</i></p>
                                        </div>`}
                                        data-tooltip-offset={15}
                                    >
                                        <img src={item.icon} alt={`${ item.displayName } Unachieved`} className="info-image"></img>
                                    </a>
                                </>
                            )
                        })}
                        <Tooltip id='unachieved-tooltip' />
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
        <div style={disabled ? {
            filter: 'blur(10px)'
            , pointerEvents: 'none'
        } : {}}>
            <a data-tooltip-id={`${ gameData.steam_appid }-tooltip`}>

                <div key={`gamep-appid${ gameData.steam_appid }`} >
                    <img src={gameData?.capsule_image} alt={`${ gameData.name } image`} key={`image-appid${ gameData.steam_appid }`} onClick={() => setOpenModal(() => true)} className="info-image" />
                </div>
            </a>

            <Tooltip id={`${ gameData.steam_appid }-tooltip`} offset={15} >
                {gameData.name}
            </Tooltip>

            {openModal ? (
                <Modal
                    id="player-modal"
                    body={<ModalBody />
                    }
                    closeModal={() => setOpenModal(() => false)}
                />
            ) : null}

        </div>
    )
}