import './MatchDayCard.scss';

type MatchDayCardPropTypes = {
  data:number;
}

const MatchDayCard = ({ data }: MatchDayCardPropTypes) => {
  return (
    <div className='matchday-card'>
      <p className='matchday-card__status'> Live/upcoming</p>
      <h4 className='matchday-card__verses'>Team {data} v Team {data + 1}</h4>
      <p className='matchday-card__time'>KO Time</p>

      <div className='matchday-card__history-container'>
        <h4>Team {data} v Team {data + 1} H2H</h4>
        <p>Team {data} 5 - 2 Team {data + 1}</p>
        {/* <p>Team {data} 2 - 0 Team {data + 1}</p>
        <p>Team {data} 0 - 1 Team {data + 1}</p> */}
      </div>
    </div> 
  )
}

export default MatchDayCard;