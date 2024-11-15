import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import { getPrimedFixtureData, } from '../helperFunctions/helperFunctions';
import FixtureData from '../type/NewFootballData';
import { ClubTableData } from '../type/ClubTableData';
import PlayerTableData from '../type/PlayerTableData';
import StandingsTable from '../components/StandingsTable/StandingsTable';
import PlayerTable from '../components/PlayerTable/PlayerTable';

// type PremPagePropType = {
//   champData: FootballData[][],
//   euroData: FootballData[][],
//   searchChampData: FootballData[],
//   searchEuroData: FootballData[],
//   url?: string
// }


  //Domestic Competitions
  //  4328: Prem ID
  //  4329: EFL Championship ID
  //  4397: English League 2
  //  4396: English League 3
const PremPage = () => {

  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [premData, setPremData] = useState<FixtureData[]>([]);
  const [premStandingsData, setPremStandingsData] = useState<ClubTableData[]>([]);
	const [premScorersData, setPremScorersData] = useState<PlayerTableData[]>([]);


  useEffect(() => {

    const key: string = import.meta.env.VITE_API_KEY;

    let leagueStartDate: Date | string =  new Date();
    leagueStartDate.setDate((leagueStartDate.getDate() - (leagueStartDate.getDay() + 4) % 7) -7);

    let leagueEndDate: Date | string = new Date();
    leagueEndDate.setMonth(leagueStartDate.getMonth() + 2);

    leagueStartDate = leagueStartDate.toISOString().slice(0,10);
    leagueEndDate = leagueEndDate.toISOString().slice(0,10);

    const accessParams = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-Auth-Token': key
      }
    }
      const premRequest = fetch(`/api/v4/competitions/PL/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`, accessParams).then(res => res.json())
      const premStandingsRequest = fetch(`/api/v4/competitions/PL/standings`, accessParams).then(res => res.json());
      const premScorersRequest = fetch(`/api/v4/competitions/PL/scorers`, accessParams).then(res => res.json());
  
      Promise.all([premRequest, premStandingsRequest, premScorersRequest])
      .then(([dataPrem, premStandingsData , premScorersData]) => {
        setCompetitionTitle(dataPrem.competition.name);
        setCompetitionBadge(dataPrem.competition.emblem);
        setPremData(dataPrem.matches)
        setPremStandingsData(premStandingsData.standings[0].table)
        setPremScorersData(premScorersData.scorers)
      })
      .catch((err) => console.log(err))
  
  }, [])

  console.log("Prem data in Component", premData) //test
  
  const premWeekData = getPrimedFixtureData(premData);
  console.log("grouped new prem data",premWeekData)

  return (
    <section>
      {premWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
        </header>

        <Carousel heading={competitionTitle} data={premWeekData} searchData={premData}/>
      </>
      :
      <p>Loading...</p>
      }
      <div className="table-container"> 
        <StandingsTable tableData={premStandingsData} />

        <PlayerTable tableData={premScorersData} />
      </div>
    </section>
  )
}

export default PremPage;