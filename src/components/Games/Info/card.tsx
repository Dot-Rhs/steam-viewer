// import { IProfile } from "../../interfaces/IProfile";
import parse from 'html-react-parser';
import { IGameInfo } from '../../../interfaces';

import './styles.css'

// interface IProps {
//   user: IProfile;
// }

interface IProps {
  data: IGameInfo
}

export const Card = ({ data }: IProps) => {
  console.log('GAMEINFO: ', data);

  return (

    <div className="info"  >
      <img src={data.headerImg} alt='header image' />
      <p className='player-count'>Current Players Online: {data.currentPlayers}</p>
      <div>
        <h2 role="doc-subtitle">{data.name}</h2>
        <p>
          <i>Released {data.releaseDate?.date}</i>
          {/* <ShortDate time={date} /> by {author} */}
        </p>
      </div>
      <div className="news-item-container">
      </div>
      <div className="content-info">
        <p>{parse(data.description)}</p>
        {/* {parse(contents)} */}
      </div>
      <div className='screenshots-container'>
        {/* make clickable links or modal expansion to full shot */}
        {data.screenshots?.map((shot, i) => <img key={`tag-${ i }`} src={shot.path_thumbnail} />)}
      </div>
    </div >
  )
  //   })
  // );
};
