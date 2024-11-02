import { useEffect, useState } from "react"
import isSuccessful from "../../../helpers/isSuccesful";
import { IFriendsData, IPlayerInfo } from "../../../interfaces";

interface IProps {
    friends: IFriendsData[]
}

export const FriendsList = ({ friends }: IProps) => {
    const [friendsList, setFriendsList] = useState<IPlayerInfo[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const abortController = new AbortController()

        const handleFetch = async () => {
            setLoading(() => true);

            // Rework this to get rid of map and use comma-delimited ids as supported by steam api
            const friendsDetails = await friends.map(async (friend) => {
                try {
                    const getPlayer = await fetch(`${ import.meta.env.VITE_LOCAL_PLAYERS_API_BASE_DOMAIN }/getPlayerInfo/${ friend.steamid }`, { signal: abortController.signal });

                    const data = await getPlayer.json();

                    return data.players[0]
                } catch (error: unknown) {
                    if (abortController.signal.aborted) return

                    if (error instanceof Error) setErrorMsg(() => error?.message);
                }
            })

            const resolvedResults = await Promise.allSettled(friendsDetails)

            const finalResults = resolvedResults.filter(isSuccessful).filter(res => res?.value !== undefined).map(({ value }) => value)

            if (finalResults.length) setFriendsList(() => finalResults)

            setLoading(() => false);
        };

        if (friends.length) {
            handleFetch()
        }

        return () => {
            return abortController.abort()
        }
    }, [])

    return (
        <>
            {friendsList.length ? friendsList.map((friend) => (<div key={friend.steamid}>
                <img src={friend.avatarfull} alt={`${ friend.personaname } avatar`} />
                {/* <p>
                {friend.personaname}
                </p> */}

            </div>)) : null}
            {loading ? <p>Loading...</p> : null}
        </>

    )
}