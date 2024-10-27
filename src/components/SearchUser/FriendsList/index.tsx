import { useEffect, useState } from "react"


export const FriendsList = ({ friends }) => {
    const [friendsList, setFriendsList] = useState([]);
    const [userData, setUserData] = useState(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const handleFetch = async () => {
            setLoading(() => true);
            const friendsDetails = await friends.map(async (friend, idx) => {

                try {
                    const getPlayer = await fetch(`${ import.meta.env.VITE_LOCAL_PLAYERS_API_BASE_DOMAIN }/getPlayerInfo/${ friend.steamid }`);
                    // const getFriends = await fetch(`http://localhost:5000/getFriends/${ value }`)
                    const data = await getPlayer.json();
                    // const friendsData = await getFriends.json()
                    // console.log('FRIENDSLISTDAAA: ', data.players[0])
                    // setUserData(() => ({ player: data.players[0], friendsList: data.friends }));
                    // setUserName(() => "");
                    return data.players[0]
                } catch (error: unknown) {
                    if (error instanceof Error) setErrorMsg(() => error?.message);
                }
            })

            const resolvedResults = await Promise.allSettled(friendsDetails)

            const finalResults = resolvedResults.map(res => {
                if (res.status === 'fulfilled') return res.value
            })

            setFriendsList(() => finalResults)

            console.log('ASDASDASDASD: ', finalResults)
            setLoading(() => false);
        };

        if (!!friends.length) {
            handleFetch()
        }
    }, [])
    console.log('FRIENDS: ', friends)
    return (
        !!friendsList.length ? friendsList.map((friend, idx) => (<div>
            {friend.personaname}
        </div>)) : null

    )
}