import { useEffect, useState } from "react"
import { IFriendsData, IPlayerInfo } from "../../../interfaces";
import { Friend } from "./Friend";
import useStateContext from "../../context/hook/useStateContext";

interface IProps {
    friends: IFriendsData[]
    userId: string | number;
}

export interface IFriendsState extends IFriendsData, Omit<IPlayerInfo, 'steamid'> { }

const defaultCount = 20

export const FriendsList = ({ friends, userId }: IProps) => {
    const { friendsCache, setFriendsCache, currentId } = useStateContext()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(defaultCount >= friendsCache?.length ? defaultCount : friendsCache?.length)


    useEffect(() => {
        if (friendsCache?.length && currentId === userId && friendsCache.length >= count) return

        const abortController = new AbortController()

        const handleFetch = async () => {
            setErrorMsg(() => null);
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

                    setFriendsCache((prev) => [...prev, ...result])
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
            {friendsCache.length ? friendsCache.map((friend) => (<Friend data={friend} key={friend.steamid} />
            )) : null}
            <div>
                {loading ? <p>Loading...</p> : null}
                {errorMsg ? <p>Error getting friends...</p> : null}
                {!loading && count < friends.length ?
                    <>
                        <p>...{friends.length - friendsCache.length} more</p>
                        <button onClick={() => setCount((prev) => prev + defaultCount)
                        }>Load More</button>
                    </>
                    : null}
            </div>
        </>
    )
}