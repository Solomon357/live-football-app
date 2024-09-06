import { useEffect, useState } from 'react';
import MatchDayCard from '../MatchDayCard/MatchDayCard';
import './MatchWeekCard.scss';

type MatchWeekCardPropType = {
  key: number;
}

const MatchWeekCard = ({ key }: MatchWeekCardPropType) => {

  const [placeholderData, setPlaceholderData] = useState<number[]>([]);

  useEffect(() => {
    setPlaceholderData([0,1,2,3,4,5,6,7,8])
  },[]);

return (
  <section className='matchweek-container'>
    <h3>Current Match Week {key}</h3>
    <div className="matchweek-container__card">
    
      {placeholderData.map((data) => {
        return <MatchDayCard key={data}/>;
      })}
    </div>
  </section>
)
}

export default MatchWeekCard