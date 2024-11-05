import { useEffect, useState } from "react"
import isSuccessful from "../../../helpers/isSuccesful";
import { IFriendsData, IPlayerInfo } from "../../../interfaces";
import Tooltip from "../../Tooltip";
import { ShortDate } from "../../ShortDate";
import { Friend } from "./Friend";

interface IProps {
    friends: IFriendsData[]
}

export interface IFriendsState extends IFriendsData, Omit<IPlayerInfo, 'steamid'> { }

const defaultCount = 20

export const FriendsList = ({ friends }: IProps) => {
    const [friendsList, setFriendsList] = useState<IFriendsState[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(20)


    useEffect(() => {
        const abortController = new AbortController()

        const handleFetch = async () => {
            setLoading(() => true);
            const friendIds = friends.slice(count - defaultCount, count).map(friend => friend.steamid).toString()

            // Rework this to get rid of map and use comma-delimited ids as supported by steam api
            // const friendsDetails = await friends.map(async (friend) => {
            try {
                const getPlayer = await fetch(`${ import.meta.env.VITE_LOCAL_PLAYERS_API_BASE_DOMAIN }/getPlayerInfo/${ friendIds }`, { signal: abortController.signal });

                const data = await getPlayer.json() as { players: IPlayerInfo[] }

                if ('players' in data && data.players.length) {
                    const result: IFriendsState[] = data.players.map((player) => {
                        const details = friends.find(friend => friend.steamid === player.steamid)

                        if (details) {
                            return { ...player, ...details }
                        }
                    }).filter(x => !!x)

                    setFriendsList((prev) => [...prev, ...result])
                }

            } catch (error: unknown) {
                if (abortController.signal.aborted) return

                if (error instanceof Error) setErrorMsg(() => error?.message);
            }

            setLoading(() => false);
        };

        if (friends.length || count > defaultCount) {
            handleFetch()
        }

        return () => {
            return abortController.abort()
        }
    }, [friends, count])


    return (
        <>
            {friendsList.length ? friendsList.map((friend) => (<Friend data={friend} key={friend.steamid} />
            )) : null}
            <div>
                {loading ? <p>Loading...</p> : null}
                {errorMsg ? <p>Error getting friends...</p> : null}
                {!loading && count < friends.length ?
                    <>
                        <p>...{friends.length - friendsList.length} more</p>
                        <button onClick={() => setCount((prev) => prev + defaultCount)
                        }>Load More</button>
                    </>
                    : null}
            </div>
        </>

    )
}