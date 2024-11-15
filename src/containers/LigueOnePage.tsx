import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import { getPrimedFixtureData } from '../helperFunctions/helperFunctions';
import FixtureData from '../type/NewFootballData';
import { ClubTableData } from '../type/ClubTableData';
import PlayerTableData from '../type/PlayerTableData';
import StandingsTable from '../components/StandingsTable/StandingsTable';
import PlayerTable from '../components/PlayerTable/PlayerTable';

// type LigueOnePagePropTypes = {
//   champData: FootballData[][],
//   euroData: FootballData[][],
//   searchChampData: FootballData[],
//   searchEuroData: FootballData[],
//   url?: string
// }
//Domestic Competitions
  //  4334: Ligue 1 ID
  //  5203: France Première Ligue
  //  4401: French Ligue 2

const LigueOnePage = () => {
  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [ligueOneData, setLigueOneData] = useState<FixtureData[]>([]);
  const [ligueOneStandingsData, setLigueOneStandingsData] = useState<ClubTableData[]>([]);
	const [ligueOneScorersData, setLigueOneScorersData] = useState<PlayerTableData[]>([]);


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
      const ligueOneRequest = fetch(`/api/v4/competitions/FL1/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`, accessParams).then(res => res.json())
      const ligueOneStandingsRequest = fetch(`/api/v4/competitions/FL1/standings`, accessParams).then(res => res.json());
      const ligueOneScorersRequest = fetch(`/api/v4/competitions/FL1/scorers`, accessParams).then(res => res.json());
  
      Promise.all([ligueOneRequest, ligueOneStandingsRequest, ligueOneScorersRequest])
      .then(([dataLigueOne, ligueOneStandingsData, ligueOneScorersData]) => {
        setCompetitionTitle(dataLigueOne.competition.name);
        setCompetitionBadge(dataLigueOne.competition.emblem);
        setLigueOneData(dataLigueOne.matches)
        setLigueOneStandingsData(ligueOneStandingsData.standings[0].table);
        setLigueOneScorersData(ligueOneScorersData.scorers);
      })
      .catch((err) => console.log(err))
  }, [])

  console.log("Ligue One data in Component", ligueOneData) //test
  
  const ligueOneWeekData = getPrimedFixtureData(ligueOneData);
  console.log("grouped new prem data",ligueOneWeekData)

  return (
    <section>
      {ligueOneWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
        </header>

        <Carousel heading={competitionTitle} data={ligueOneWeekData} searchData={ligueOneData}/>
      </>
      :
      <p>Loading...</p>
      }
      <div className="table-container"> 
        <StandingsTable tableData={ligueOneStandingsData} />

        <PlayerTable tableData={ligueOneScorersData} />
      </div>
    </section>
  )
}

export default LigueOnePage