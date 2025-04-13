// import { IProfile } from "../../interfaces/IProfile";

import { IFriendsData, IPlayerGames, IPlayerInfo, IRecentlyPlayed } from "../../interfaces";
import { ShortDate } from "../ShortDate";
import { FriendsList } from "./FriendsList";
import { GamesList } from "./GamesList";
import { PersonaState } from "./PersonaState";

interface IProps {
  player: IPlayerInfo;
  friendsList?: IFriendsData[];
  gamesList?: IPlayerGames;
  recentlyPlayed?: IRecentlyPlayed
}

export const PersonaCard = ({ player, friendsList, gamesList }: IProps) => {
  const {
    steamid, communityvisibilitystate, personaname, profileurl, avatarfull, personastate, realname, timecreated, lastlogoff
  } = player;

  return (
    <div className="user">
      <div className="name-container">
        <img src={avatarfull} className="avatar" alt="User Image" />
        <div className="name-details">
          <a href={profileurl}>{personaname} <img src={'/assets/icons/external-link.svg'} alt='External Link' />
          </a>
          {realname &&
            <p>
              {realname}
            </p>
          }
          <p>Steam ID: {steamid}</p>
          {communityvisibilitystate === 3 && timecreated !== undefined ? <p>
            User joined on {" "}
            <ShortDate time={timecreated} />
          </p> : null}
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
            <FriendsList friends={friendsList} userId={player.steamid} />
          </div>
        </>
        : null}

      {gamesList &&
        <>
          <h2>{personaname}'s Games</h2>
          <div className="games-info">
            <GamesList gamesList={gamesList} userId={player.steamid} />
          </div>
        </>
      }
    </div>
  );
};
