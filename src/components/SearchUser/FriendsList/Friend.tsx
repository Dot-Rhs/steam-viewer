import { useRef, useState } from "react";
import { ShortDate } from "../../ShortDate";
import { Modal } from "../../modal";
import { PersonaState } from "../PersonaState";
import { useClickOutside } from "../../useClickOutside";
import { IFriendsState } from ".";
import { PersonaCard } from "../card";

interface IProps {
    data: IFriendsState
}

export const Friend = ({ data }: IProps) => {
    const friendRef = useRef(null)
    const [openModal, setOpenModal] = useState(false);
    useClickOutside(friendRef, () => setOpenModal(() => false))

    console.log('DAAATAAA: ', data);

    const { personaname, avatarfull, steamid, friend_since, communityvisibilitystate, profileurl, personastate } = data

    return (
        <>
            <div ref={friendRef}>
                <img src={avatarfull} alt={`${ personaname } avatar`} onClick={() => setOpenModal(() => true)} />
            </div>

            {
                openModal ? (
                    <Modal
                        id="A-VERY-UNIQUE-MODAL"
                        // footer={
                        //     <div>
                        //         <p>A FOOTY ASS FOOTER</p>
                        //     </div>
                        // }
                        // header={personaname}
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