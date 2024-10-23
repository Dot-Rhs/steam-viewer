import { useState } from "react";
import { Card } from "./card";
// import { IProfile } from "../../interfaces/IProfile";
import "./styles.css";
import { SearchBar } from "../SearchBar";

export const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (value) => {
    setLoading(() => true);
    try {
      const getPlayer = await fetch(`http://localhost:5000/getPlayer/${ value }`);
      const getFriends = await fetch(`http://localhost:5000/getFriends/${ value }`)
      const data = await getPlayer.json();
      const friendsData = await getFriends.json()
      console.log('DAAA: ', friendsData)
      setUserData(() => data.response.players[0]);
      setUserName(() => "");
    } catch (error: unknown) {
      if (error instanceof Error) setErrorMsg(() => error?.message);
    }
    setLoading(() => false);
  };

  return (
    <div className="profile-container">
      <SearchBar handleSubmit={handleSubmit} placeHolder={"Enter Steam ID for player..."} name='search-by-player-id' />
      {/* <div className="input-wrapper">
        <input
          name="search-by-name"
          type="text"
          placeholder="Enter Steam ID for player..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button onClick={handleSubmit}>Search</button>
      </div> */}

      {loading && <h2>Loading...</h2>}
      {errorMsg && <h2>{errorMsg}</h2>}
      {userData !== null && (!loading || errorMsg) ? (
        <Card user={userData} />
      ) : null}
    </div>
  );
};
