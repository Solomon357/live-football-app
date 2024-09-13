import FootballData from '../../type/FootballData';
import './MatchDayCard.scss';

type MatchDayCardPropTypes = {
  data: FootballData;
}
//Dumb Component
const MatchDayCard = ({ data }: MatchDayCardPropTypes) => {
  return (
    <div className='matchday-card'>

      <p className='matchday-card__status'> {data.strStatus}</p>

      <div className='matchday-card__main-info-container'>
        <header className='matchday-card__main-info-container--verses'>
          <div className='matchday-card__main-info-container--teams'>
            <img src={data.strHomeTeamBadge} alt="homeBadge" height={'15px'} width={'15px'} />
            <span>{data.strHomeTeam}</span>
          </div>

          <div className='matchday-card__main-info-container--teams'>
            <img src={data.strAwayTeamBadge} alt="awayBadge" height={'15px'} width={'15px'} />
            <span>{data.strAwayTeam}</span>
          </div>

        </header>

        {data.intHomeScore && data.intAwayScore ?
          <div className='matchday-card__main-info-container--score-card'>
            <p>{data.intHomeScore}</p>
            <p>{data.intAwayScore}</p>
          </div>
          :
          <div className='matchday-card__main-info-container--score-card'>
            <p className='matchday-card__time'>{data.dateEvent}</p>
            <p className='matchday-card__time'>{data.strTime?.slice(0,5)} KO</p>
          </div>  
        }
      </div>
    </div> 
  )
}

export default MatchDayCard;