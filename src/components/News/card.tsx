// import { IProfile } from "../../interfaces/IProfile";
import parse from 'html-react-parser';

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

export const Card = ({ newsItems }) => {
  if (!newsItems.length) return

  return (
    newsItems.map((item, idx) => {
      const {
        appid, author, contents, date, feed_type, feedlabel, feedname, gid, is_external_url, tags, title, url
      } = item;

      // console.log('JOHNOSN: ', appid, author, contents, date, feed_type, feedlabel, feedname, gid, is_external_url, tags, title, url);

      return (

        <div className="article" key={`news-item-${ idx }`} >
          <div>
            <h2 role="doc-subtitle">{title}</h2>
          </div>
          <div className="news-item-container">
            <p>
              Posted on
              <ShortDate time={date} /> by {author}
            </p>
            {tags?.map((tag, i) => <p key={`tag-${ i }`}><i>tags: </i>{tag}</p>)}
            {/* <a href={profileurl}>{personaname}{realname && <p>
              {realname}
              </p>
              }
              </a> */}
            {/* <p>
              User joined on {" "}
              <ShortDate time={timecreated} />
              </p> */}
          </div>
          <div className="content-info">
            {parse(contents)}
            {/* <PersonaState state={personastate} />
            <div>
              <p>Steam ID</p>
              <p>{steamid}</p>
            </div> */}
            {/* <div>
          <p>Following</p>
          <p>{following}</p>
          </div>*/}
          </div>
        </div>
      )
    })
  );
};
