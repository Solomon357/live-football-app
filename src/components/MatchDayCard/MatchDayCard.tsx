import './MatchDayCard.scss';

type MatchDayCardPropTypes = {
  key:number;
}

const MatchDayCard = ({ key }:MatchDayCardPropTypes) => {
  return (
    <div className='matchday-card'>
      <h4> Team 1 v Team 2 {key}</h4>     
    </div> 
  )
}

export default MatchDayCard