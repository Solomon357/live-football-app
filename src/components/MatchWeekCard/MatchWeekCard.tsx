import { Link } from 'react-router-dom';
import FootballData from '../../type/FootballData';
import MatchDayCard from '../MatchDayCard/MatchDayCard';
import './MatchWeekCard.scss';

type MatchWeekCardPropType = {
  data: FootballData[],
  url?: string
}

const MatchWeekCard = ({ data, url }: MatchWeekCardPropType) => {
  
return (
  <section className='matchweek-container'>
    {data.map((matchDayData) => {
      return (
        <Link className="matchweek-container__matchday-link" key={matchDayData.idEvent} to={`/${url}/${matchDayData.idVenue}`}>
          <MatchDayCard data={matchDayData}/>
        </Link>
      )
    })}
  </section>
)
}

export default MatchWeekCard;