import { useEffect, useState } from "react"
import { Modal } from "../../modal"
import { IGameDetailed } from "../../../interfaces"
import { Tooltip } from 'react-tooltip'

interface IProps {
    gameData: IGameDetailed;
    userId: string | number;
    disabled?: boolean;
}

interface IAchievements {
    name: string,
    defaultvalue: number,
    displayName: string,
    hidden: number,
    description: string,
    icon: string,
    icongray: string,
    achieved?: number
}

interface IStats {
    name: string,
    defaultvalue: number,
    displayName: string,
    value: number
}

interface IStateInfo {
    achievements: {
        achieved: IAchievements[], unachieved: IAchievements[]
    }, stats: IStats[]
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
            try {
                const getStats = await fetch(`${ import.meta.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN }/getUserGameStats/${ userId }/${ gameData.steam_appid }`);

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
                    <div className='achievements-list' key={gameData.steam_appid}>
                        {achieved?.map((item, idx) => {
                            return (
                                // <>
                                <a data-tooltip-id="achieved-tooltip"
                                    data-tooltip-html={`<div><p><b>${ item.displayName } <br>Achieved</b></p>
                                            <p className="description"><i>${ item.description }</i></p>
                                        </div>`}
                                    data-tooltip-offset={15} key={item.displayName + idx}
                                >
                                    <img src={item.icon} alt={`${ item.displayName } Achieved`} className="info-image"></img>
                                </a>
                            )
                        })}
                        <Tooltip id='achieved-tooltip' />
                        {unachieved?.map((item: IAchievements, idx: number) => {
                            return (
                                <a data-tooltip-id="unachieved-tooltip"
                                    data-tooltip-html={`<div><p><b>${ item.displayName } Unachieved</b></p>
                                            <p className="description"><i>${ item.description }</i></p>
                                        </div>`}
                                    data-tooltip-offset={15}
                                    key={item.displayName + idx}
                                >
                                    <img src={item.icon} alt={`${ item.displayName } Unachieved`} className="info-image"></img>
                                </a>

                            )
                        })}
                        <Tooltip id='unachieved-tooltip' />
                    </div>

                </div>) : <p>No Achievement data available</p>}

                {stats.length ?
                    <div><h2>Stats</h2>
                        <div className="stats-list">
                            {stats.map((item, idx) => <p key={item.displayName + idx}>{item.displayName}: <b>{item.value ?? 0}</b></p>)}
                        </div>
                    </div> : <p>No Stats data available</p>}
            </div>
        )
    }

    return (
        <div style={disabled ? {
            filter: 'blur(10px)'
            , pointerEvents: 'none'
        } : { cursor: "pointer" }}>
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
                    id={"player-modal"}
                    body={<ModalBody />
                    }
                    closeModal={() => setOpenModal(() => false)}
                />
            ) : null}

        </div>
    )
}