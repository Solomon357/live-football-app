import { Link } from 'react-router-dom';
import FootballData from '../../type/FixtureData';
import MatchDayCard from '../MatchDayCard/MatchDayCard';
import './MatchWeekCard.scss';
import FixtureData from '../../type/FixtureData';

type MatchWeekCardPropType = {
  data: FixtureData[],
  url?: string
}

const MatchWeekCard = ({ data, url }: MatchWeekCardPropType) => {
  
return (
  <section className='matchweek-container'>
    {data.map((matchDayData) => {
      return (
        <Link className="matchweek-container__matchday-link" key={matchDayData.id} to={`/live-football-app/${url}/${matchDayData.id}`}>
          <MatchDayCard data={matchDayData}/>
        </Link>
      )
    })}
  </section>
)
}

export default MatchWeekCard;