import FootballData from '../../type/FootballData';
import FixtureData from '../../type/NewFootballData';
import './MatchDayCard.scss';

type MatchDayCardPropTypes = {
  data: FixtureData;
}

const MatchDayCard = ({ data }: MatchDayCardPropTypes) => {

  const currentTime: string = new Date().toISOString();


  return (
    <div className='matchday-card'>

      <p className='matchday-card__status'> {new Date(data.utcDate).getTime() >= new Date(currentTime).getTime() ? data.utcDate.slice(0,10) : data.status}</p>

      <div className='matchday-card__main-info-container'>
        <header className='matchday-card__main-info-container--verses'>
          <div className='matchday-card__main-info-container--teams'>
            <img src={data.homeTeam.crest} alt="homeBadge" height={'15px'} width={'15px'} />
            <span>{data.homeTeam.shortName}</span>
          </div>

          <div className='matchday-card__main-info-container--teams'>
            <img src={data.awayTeam.crest} alt="awayBadge" height={'15px'} width={'15px'} />
            <span>{data.awayTeam.shortName}</span>
          </div>

        </header>

        {new Date(data.utcDate).getTime() <= new Date(currentTime).getTime() ?
          <div className='matchday-card__main-info-container--score-card'>
            <span>{data.score.fullTime.home ? data.score.fullTime.home : data.score.halfTime.home ? data.score.halfTime.home : 0}</span>
            <span>{data.score.fullTime.away ? data.score.fullTime.away : data.score.halfTime.away ? data.score.halfTime.away : 0}</span>
          </div>
          :
          <div className='matchday-card__main-info-container--score-card'>
            <p className='matchday-card__time'>{data.utcDate?.slice(11,16)} KO</p>
          </div>  
        }
      </div>
    </div> 
  )
}

export default MatchDayCard;