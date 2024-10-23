// import { IProfile } from "../../interfaces/IProfile";

import { ShortDate } from "../ShortDate";
import { PersonaState } from "./PersonaState";

// interface IProps {
//   user: IProfile;
// }

export const Card = ({ user }) => {
  const {
    steamid, communityvisibilitystate, profilestate, personaname, profileurl, avatar, avatarmedium, avatarfull, hash, personastate, realname, primaryclanid, timecreated, personastateflags, loccountrycode, locstatecode, loccityid, lastlogoff, gameid, gameextrainfo,
  } = user;

  const createdDate = new Date(timecreated * 1000);
  const lastLogOff = new Date(lastlogoff * 1000)
  console.log('JOHNOSN: ', steamid, communityvisibilitystate, profilestate, personaname, profileurl, avatar, avatarmedium, avatarfull, hash, personastate, realname, primaryclanid, timecreated, personastateflags, loccountrycode, locstatecode, loccityid, lastlogoff, gameid, gameextrainfo,);

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
          <p>
            User joined on {" "}
            <ShortDate time={timecreated} />
          </p>
          <p>
            User last logged off {" "}
            <ShortDate time={lastlogoff} />
          </p>
          <PersonaState state={personastate} />
        </div>
      </div>
      <div className="profile-info">
      </div>
    </div>
  );
};
