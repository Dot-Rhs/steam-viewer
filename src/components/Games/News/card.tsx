// import { IProfile } from "../../interfaces/IProfile";
import parse from 'html-react-parser';
import { ShortDate } from '../../ShortDate';

// interface IProps {
//   user: IProfile;
// }

export const Card = ({ newsItems }) => {
  if (!newsItems.length) return

  return (
    newsItems.map((item, idx) => {
      const {
        appid, author, contents, date, feed_type, feedlabel, feedname, gid, is_external_url, tags, title, url
      } = item;

      // console.log('JOHNOSN: ', newsItems);

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
          </div>
          <div className="content-info">
            {parse(contents)}
          </div>
        </div>
      )
    })
  );
};
