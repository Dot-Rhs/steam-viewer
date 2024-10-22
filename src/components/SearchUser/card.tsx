// import { IProfile } from "../../interfaces/IProfile";

// interface IProps {
//   user: IProfile;
// }

const PersonaState = ({ state }) => {
  const states = {
    0: 'Offline', 1: 'Online', 2: 'Busy', 3: 'Away', 4: 'Snooze', 5: 'looking to trade', 6: 'looking to play'
  }

  return (<div>
    <p>Status:</p>
    <p><b>{states[state]}</b></p>
  </div>)
}

const ShortDate = ({ time }) => {
  const createdDate = new Date(time * 1000);

  return (
    <>
      {`${ createdDate.getDate() } ${ createdDate.toLocaleString("en-GB", {
        timeZone: "UTC",
        month: "short"
      }) } ${ createdDate.getFullYear() }`}
    </>
  )
}

export const Card = ({ user }) => {
  const {
    steamid, communityvisibilitystate, profilestate, personaname, profileurl, avatar, avatarmedium, avatarfull, hash, personastate, realname, primaryclanid, timecreated, personastateflags, loccountrycode, locstatecode, loccityid, lastlogoff, gameid, gameextrainfo,
  } = user;

  const createdDate = new Date(timecreated * 1000);
  const lastLogOff = new Date(lastlogoff * 1000)
  console.log('JOHNOSN: ', steamid, communityvisibilitystate, profilestate, personaname, profileurl, avatar, avatarmedium, avatarfull, hash, personastate, realname, primaryclanid, timecreated, personastateflags, loccountrycode, locstatecode, loccityid, lastlogoff, gameid, gameextrainfo,);

  return (
    <div className="user">
      <div>
        <img src={avatarfull} className="avatar" alt="User Image" />
      </div>
      <div className="name-container">
        <a href={profileurl}>{personaname}{realname && <p>
          {realname}
        </p>
        }
        </a>

        <p>
          User joined on {" "}
          <ShortDate time={timecreated} />
        </p>
        <p>
          User last logged off {" "}
          <ShortDate time={lastlogoff} />
        </p>
      </div>
      <div className="profile-info">
        <PersonaState state={personastate} />
        <div>
          <p>Steam ID</p>
          <p>{steamid}</p>
        </div>
        {/* <div>
          <p>Following</p>
          <p>{following}</p>
        </div>*/}
      </div>
    </div>
  );
};
