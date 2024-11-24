import MatchDayCard from '../MatchDayCard/MatchDayCard';
import './MatchWeekCard.scss';
import FixtureData from '../../type/FixtureData';

type MatchWeekCardPropType = {
  data: FixtureData[];
}

const MatchWeekCard = ({ data }: MatchWeekCardPropType) => {
  const leagueCode: string = data[0].area.name;
  let leagueURL: string;

  switch(leagueCode){
    case "England":
      leagueURL = "england-leagues"
      break;
    case "Spain":
      leagueURL = "spain-leagues"
      break;
    case "Germany":
      leagueURL = "germany-leagues"
      break;
    case "Italy":
      leagueURL = "italy-leagues"
      break;
    case "France":
      leagueURL = "france-leagues"
      break;
    case "Europe":
      leagueURL = "europe-leagues"  
  }
  
  return (
    <section className='matchweek-container'>
      {data.map((matchDayData) => {
        return (
          <MatchDayCard key={matchDayData.id} data={matchDayData} linkID={`/${leagueURL}/${matchDayData.id}`}/>
        )
      })}
    </section>
  )
}

export default MatchWeekCard;