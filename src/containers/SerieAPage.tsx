import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import { getPrimedFixtureData } from '../helperFunctions/helperFunctions';
import FixtureData from '../type/FixtureData';
import { ClubData } from '../type/ClubData';
import StandingsTable from '../components/StandingsTable/StandingsTable';
import PlayerTable from '../components/PlayerTable/PlayerTable';
import PlayerData from '../type/PlayerData';

// type SerieAPagePropTypes = {
//   champData: FootballData[][],
//   euroData: FootballData[][],
//   searchChampData: FootballData[],
//   searchEuroData: FootballData[],
//   url?: string
// }

const SerieAPage = () => {
  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [serieAData, setSerieAData] = useState<FixtureData[]>([]);
  const [serieAStandingsData, setSerieAStandingsData] = useState<ClubData[]>([]);
	const [serieAScorersData, setSerieAScorersData] = useState<PlayerData[]>([]);


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
      const serieARequest = fetch(`/api/v4/competitions/SA/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`, accessParams).then(res => res.json())
      const serieAStandingsRequest = fetch(`/api/v4/competitions/SA/standings`, accessParams).then(res => res.json());
      const serieAScorersRequest = fetch(`/api/v4/competitions/SA/scorers`, accessParams).then(res => res.json());
  
      Promise.all([serieARequest, serieAStandingsRequest, serieAScorersRequest])
      .then(([dataSerieA, serieAStandingsData , serieAScorersData]) => {
        setCompetitionTitle(dataSerieA.competition.name);
        setCompetitionBadge(dataSerieA.competition.emblem);
        setSerieAData(dataSerieA.matches)
        setSerieAStandingsData(serieAStandingsData.standings[0].table)
        setSerieAScorersData(serieAScorersData.scorers)
      })
      .catch((err) => console.log(err))
  }, [])
  
  console.log("serie A data in Component", serieAData) //test

  const serieAWeekData = getPrimedFixtureData(serieAData);
  console.log("grouped new prem data",serieAWeekData);

  return (
    <section>
    {serieAWeekData ?
    <>
      <header className='header-img'>
        <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
      </header>

      <Carousel heading={competitionTitle} data={serieAWeekData} searchData={serieAData}/>


      
    </>
    :
    <p>Loading...</p>
    }

    <div className="table-container"> 
      <StandingsTable tableData={serieAStandingsData} />

      <PlayerTable tableData={serieAScorersData} />
    </div>
  </section>
  )
}

export default SerieAPage