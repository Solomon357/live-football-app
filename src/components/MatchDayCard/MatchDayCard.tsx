import FixtureData from '../../type/FixtureData';
import './MatchDayCard.scss';
import { Link } from 'react-router-dom';

type MatchDayCardPropTypes = {
  data: FixtureData;
  linkID: string;
}

const MatchDayCard = ({ data, linkID }: MatchDayCardPropTypes) => {

  const currentTime: string = new Date().toISOString();


  return (
    <div className='matchday-card'>

      <p className='matchday-card__status'> {new Date(data.utcDate).getTime() >= new Date(currentTime).getTime() ? data.utcDate.slice(0,10) : data.status}</p>

      <div className='matchday-card__main-info-container'>
        <div className='matchday-card__main-info-container--main'>

          <div className='matchday-card__main-info-container--teams'>
            <span>{data.homeTeam.tla}</span>
            <img src={data.homeTeam.crest} alt="homeBadge" height={'20px'} width={'20px'} />
          </div>
          
          {new Date(data.utcDate).getTime() <= new Date(currentTime).getTime() ?
            <div className='matchday-card__main-info-container--score-card'>
              <span>{data.score.fullTime.home ? data.score.fullTime.home : data.score.halfTime.home ? data.score.halfTime.home : 0}</span>
              <span> - </span>
              <span>{data.score.fullTime.away ? data.score.fullTime.away : data.score.halfTime.away ? data.score.halfTime.away : 0}</span>
            </div>
          :
          <div className='matchday-card__main-info-container--time-card'>
            <p className='matchday-card__time'>{data.utcDate?.slice(11,16)} KO</p>
          </div>  
          }

          <div className='matchday-card__main-info-container--teams'>
            <img src={data.awayTeam.crest} alt="awayBadge" height={'20px'} width={'20px'} />
            <span>{data.awayTeam.tla}</span>
          </div>
        </div>

        <Link to={linkID}>More info</Link>
      </div>
    </div> 
  )
}

export default MatchDayCard;