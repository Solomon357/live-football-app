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
      <h4 className='matchday-card__verses'>{data.strEvent}</h4>
      <p className='matchday-card__time'>{data.strTime}</p>

      <div className='matchday-card__history-container'>
        <h4><img src={data.strHomeTeamBadge} alt="homeBadge" height={'20px'} width={'20px'} /> v <img src={data.strAwayTeamBadge} alt="homeBadge" height={'20px'} width={'20px'} /></h4>
        {/* <p>{data.strHomeTeamBadge} 5 - 2 Team {data.strAwayTeamBadge}</p> */}
        {/* <p>Team {data} 2 - 0 Team {data + 1}</p>
        <p>Team {data} 0 - 1 Team {data + 1}</p> */}
      </div>
    </div> 
  )
}

export default MatchDayCard;