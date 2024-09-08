import MatchDayCard from '../MatchDayCard/MatchDayCard';
import './MatchWeekCard.scss';

type MatchWeekCardPropType = {
  data: number[];
}

const MatchWeekCard = ({ data }: MatchWeekCardPropType) => {

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