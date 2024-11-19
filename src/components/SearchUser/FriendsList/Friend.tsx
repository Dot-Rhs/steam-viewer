import { useRef, useState } from "react";
import { ShortDate } from "../../ShortDate";
import { Modal } from "../../modal";
import { PersonaState } from "../PersonaState";
import { useClickOutside } from "../../useClickOutside";
import { IFriendsState } from ".";
import { PersonaCard } from "../card";
import { Tooltip } from "react-tooltip";

interface IProps {
    data: IFriendsState
}

export const Friend = ({ data }: IProps) => {
    const [openModal, setOpenModal] = useState(false);

    const { personaname, avatarfull } = data

    return (
        <>
            <a data-tooltip-id={`${ personaname }-tooltip`} >

                <div style={{ cursor: "pointer" }}>
                    <img src={avatarfull} alt={`${ personaname } avatar`} onClick={() => setOpenModal(() => true)} className="info-image" />
                </div>
            </a>

            <Tooltip id={`${ personaname }-tooltip`} offset={20}>
                {personaname}
            </Tooltip>

            {
                openModal ? (
                    <Modal
                        id="player-modal"
                        body={<PersonaCard player={data} />
                        }
                        closeModal={() => setOpenModal(() => false)}
                    />
                ) : null
            }
        </>
    )
}


// <>
//     {/* <h1>{name}</h1> */}
//     <p>Steam ID: {steamid}</p>
//     <PersonaState state={personastate} />
//     <p>Friend since <ShortDate time={friend_since} /></p>
//     <a href={profileurl}>{profileurl}</a>
// </>