import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import { getPrimedFixtureData } from '../helperFunctions/helperFunctions';
import FixtureData from '../type/NewFootballData';
import { ClubTableData } from '../type/ClubTableData';
import PlayerTableData from '../type/PlayerTableData';
import StandingsTable from '../components/StandingsTable/StandingsTable';
import PlayerTable from '../components/PlayerTable/PlayerTable';

// type BundesligaPagePropTypes = {
//   champData: FootballData[][],
//   euroData: FootballData[][],
//   searchChampData: FootballData[],
//   searchEuroData: FootballData[],
//   url?: string
// }

const BundesligaPage = () => {
  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [bundesligaData, setBundesligaData] = useState<FixtureData[]>([]);
  const [bundesligaStandingsData, setBundesligaStandingsData] = useState<ClubTableData[]>([]);
	const [bundesligaScorersData, setBundesligaScorersData] = useState<PlayerTableData[]>([]);


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
        "Content-Type": "application/json",
        'X-Auth-Token': key
      }
    }

    const bundesligaRequest = fetch(`/api/v4/competitions/BL1/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`, accessParams).then(res => res.json())
    const bundesligaStandingsRequest = fetch(`/api/v4/competitions/BL1/standings`, accessParams).then(res => res.json());
    const bundesligaScorersRequest = fetch(`/api/v4/competitions/BL1/scorers`, accessParams).then(res => res.json());

    Promise.all([bundesligaRequest, bundesligaStandingsRequest, bundesligaScorersRequest])
    .then(([dataBundesliga, bundesligaStandingsData, bundesligaScorersData]) => {
      setCompetitionTitle(dataBundesliga.competition.name);
      setCompetitionBadge(dataBundesliga.competition.emblem);
      setBundesligaData(dataBundesliga.matches)
      setBundesligaStandingsData(bundesligaStandingsData.standings[0].table)
      setBundesligaScorersData(bundesligaScorersData.scorers)
    })
    .catch((err) => console.log(err))

  }, [])

  console.log("bundesliga data in Component", bundesligaData) //test

  const bundesligaWeekData = getPrimedFixtureData(bundesligaData);
  console.log("grouped new prem data",bundesligaWeekData)

  return (
    <section>
      {bundesligaWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
        </header>

        <Carousel heading={competitionTitle} data={bundesligaWeekData} searchData={bundesligaData}/>
      </>
      :
      <p>Loading...</p>
      }
      <div className="table-container"> 
        <StandingsTable tableData={bundesligaStandingsData} />

        <PlayerTable tableData={bundesligaScorersData} />
      </div>
    </section>
  )
}

export default BundesligaPage