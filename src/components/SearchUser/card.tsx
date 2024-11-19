// import { IProfile } from "../../interfaces/IProfile";

import { IFriendsData, IGameDetailed, IGameInfo, IPlayerGames, IPlayerInfo, IRecentlyPlayed } from "../../interfaces";
import { ShortDate } from "../ShortDate";
import { FriendsList } from "./FriendsList";
import { GamesList } from "./GamesList";
import { PersonaState } from "./PersonaState";
import { RecentlyPlayedList } from "./RecentlyPlayedList";

interface IProps {
  player: IPlayerInfo;
  friendsList?: IFriendsData[];
  gamesList?: IPlayerGames;
  recentlyPlayed?: IRecentlyPlayed
}

export const PersonaCard = ({ player, friendsList, gamesList, recentlyPlayed }: IProps) => {
  const {
    steamid, communityvisibilitystate, personaname, profileurl, avatarfull, personastate, realname, timecreated, lastlogoff
  } = player;

  return (
    <div className="user">
      <div className="name-container">
        <img src={avatarfull} className="avatar" alt="User Image" />
        <div className="name-details">
          <a href={profileurl}>{personaname} <img src={'/src/assets/icons/external-link.svg'} alt='External Link' />
          </a>
          {realname && <p>
            {realname}
          </p>
          }
          <p>Steam ID: {steamid}</p>
          {communityvisibilitystate === 3 && <p>
            User joined on {" "}
            <ShortDate time={timecreated} />
          </p>}
          <p>
            User last logged off {" "}
            <ShortDate time={lastlogoff} />
          </p>
          <PersonaState state={personastate} />
        </div>
      </div>
      {friendsList?.length ?
        <>
          <h2>Friends List</h2>
          <div className="friends-info">
            <FriendsList friends={friendsList} />
          </div>
        </>
        : null}

      {gamesList &&
        <>
          <h2>{personaname}'s Games</h2>
          <div className="games-info">
            <GamesList gamesList={gamesList} userId={player.steamid} />
            {/* <FriendsList friends={friendsList} /> */}
          </div>
        </>
      }
    </div>
  );
};
