// import { IProfile } from "../../interfaces/IProfile";
import parse from 'html-react-parser';
import { ShortDate } from '../ShortDate';
import { INewsItems } from '../../interfaces';

interface IProps {
  newsItems: INewsItems[];
}

export const Card = ({ newsItems }: IProps) => {
  if (!newsItems.length) return

  return (
    newsItems.map((item, idx) => {
      const {
        author, contents, date, tags, title
      } = item;

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
