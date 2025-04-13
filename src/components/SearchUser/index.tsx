import { useState } from "react";
import { PersonaCard } from "./card";
// import { IProfile } from "../../interfaces/IProfile";
import "./styles.css";
import { SearchBar } from "../SearchBar";
import { IUserData, IUserResponse } from "../../interfaces";
import useStateContext from "../context/hook/useStateContext";

export const SearchUser = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { playerData, setPlayerData, setCurrentId } = useStateContext();

  const handleSubmit = async (value: string) => {
    setErrorMsg(() => null);
    // Steam ID is 17 digits long. Bigger than allowed number of digits in a JS number, without the use of BigNum packages. 
    if (playerData?.player.steamid.toString() === value) {
      setUserData(() => playerData)
      return
    }

    const regex = new RegExp('^[0-9]+$')

    if (!regex.test(value)) return setErrorMsg(() => "Please enter a valid Steam ID\nNumeric values only");

    setLoading(() => true);
    try {
      const getPlayer = await fetch(`${ import.meta.env.VITE_LOCAL_SERVER_API_BASE_DOMAIN }/player/${ value }`);

      const data = await getPlayer.json() as IUserResponse

      setUserData(() => ({ player: data.players[0], friendsList: data.friends, gamesList: data.ownedGames, recentlyPlayed: data.recentlyPlayed }));
      setPlayerData(() => ({ player: data.players[0], friendsList: data.friends, gamesList: data.ownedGames, recentlyPlayed: data.recentlyPlayed }));
      setCurrentId(() => value)
    } catch (error: unknown) {
      if (error instanceof Error) setErrorMsg(() => error?.message);
    }
    setLoading(() => false);
  };

  return (
    <div className="profile-container">
      <SearchBar handleSubmit={handleSubmit} placeHolder={"Enter Steam ID for player..."} name='search-by-player-id' />

      {loading && <h2>Loading...</h2>}
      {errorMsg && <h2>{errorMsg}</h2>}
      {userData !== null && (!loading || errorMsg) ? (
        <PersonaCard player={userData.player} gamesList={userData.gamesList} friendsList={userData.friendsList} recentlyPlayed={userData.recentlyPlayed} />
      ) : null}
    </div>
  );
};
