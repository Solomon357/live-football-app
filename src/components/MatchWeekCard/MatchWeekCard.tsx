import FootballData from '../../type/FootballData';
import MatchDayCard from '../MatchDayCard/MatchDayCard';
import './MatchWeekCard.scss';

type MatchWeekCardPropType = {
  data: FootballData[];
}

const MatchWeekCard = ({ data }: MatchWeekCardPropType) => {
// I want to generate MatchDayCards according to their intRound. So matchweek 4 will only hold matchDays with intRound 4 
//I think to do this I will need an array that holds an array of objects that are grouped by intRound
return (
  <section className='matchweek-container'>
    {data.map((matchDayData, i) => {
      return (
        <MatchDayCard key={i} data={matchDayData}/>
      )
    })}
  </section>
)
}

export default MatchWeekCard;