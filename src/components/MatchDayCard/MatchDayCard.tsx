import FixtureData from '../../type/FixtureData';
import infoArrow from '../../assets/info-arrow-icon.png';
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
            <img className="team-badge" src={data.homeTeam.crest} alt="homeBadge" height={'20px'} width={'20px'} />
          </div>
          
          {new Date(data.utcDate).getTime() <= new Date(currentTime).getTime() && data.status !== "POSTPONED" ?
            <div className='matchday-card__main-info-container--score-card'>
              <span>{data.score.fullTime.home ? data.score.fullTime.home : data.score.halfTime.home ? data.score.halfTime.home : 0} - {data.score.fullTime.away ? data.score.fullTime.away : data.score.halfTime.away ? data.score.halfTime.away : 0}</span>
            </div>
          : new Date(data.utcDate).getTime() > new Date(currentTime).getTime() ?
          <div className='matchday-card__main-info-container--time-card'>
            <p className='matchday-card__time'>{data.utcDate?.slice(11,16)} KO</p>
          </div> 
          :
          <div className='matchday-card__main-info-container--score-card'>
            <span>N - A</span>
          </div> 
          }

          <div className='matchday-card__main-info-container--teams'>
            <img className="team-badge" src={data.awayTeam.crest} alt="awayBadge" height={'20px'} width={'20px'} />
            <span>{data.awayTeam.tla}</span>
          </div>
        </div>

        <Link to={linkID} state={data} className='matchday-card__main-info-container--more-info-btn'>More info <img src={infoArrow} alt="infoArrow" width={"15px"} height={"15px"} /></Link>
      </div>
    </div> 
  )
}

export default MatchDayCard;