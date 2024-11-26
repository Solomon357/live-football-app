import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import { getPrimedFixtureData } from '../helperFunctions/helperFunctions';
import StandingsTable from '../components/StandingsTable/StandingsTable';
import PlayerTable from '../components/PlayerTable/PlayerTable';
import FixtureData from '../type/FixtureData';
import { ClubData } from '../type/ClubData';
import PlayerData from '../type/PlayerData';
import { useNavigate } from 'react-router-dom';
  
const LaligaPage = () => {
  const navigate = useNavigate();

  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [laLigaData, setLaLigaData] = useState<FixtureData[]>([]);
  const [laLigaStandingsData, setLaLigaStandingsData] = useState<ClubData[]>([]);
	const [laLigaScorersData, setLaLigaScorersData] = useState<PlayerData[]>([]);

  useEffect(() => {

    let leagueStartDate: Date | string =  new Date();
    leagueStartDate.setDate((leagueStartDate.getDate() - (leagueStartDate.getDay() + 4) % 7) -7);

    let leagueEndDate: Date | string = new Date();
    leagueEndDate.setMonth(leagueStartDate.getMonth() + 2);

    leagueStartDate = leagueStartDate.toISOString().slice(0,10);
    leagueEndDate = leagueEndDate.toISOString().slice(0,10);

    const laLigaRequest = fetch(`https://live-football-express.netlify.app/api/PD/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`).then(res => res.json());
    const laLigaStandingsRequest = fetch(`https://live-football-express.netlify.app/api/PD/standings`).then(res => res.json());
    const laLigaScorersRequest = fetch(`https://live-football-express.netlify.app/api/PD/scorers`).then(res => res.json());

    Promise.all([laLigaRequest, laLigaStandingsRequest, laLigaScorersRequest])
    .then(([dataLaLiga, laLigaStandingsData, laLigaScorersData]) => {
      setCompetitionTitle(dataLaLiga.competition.name);
      setCompetitionBadge(dataLaLiga.competition.emblem);
      setLaLigaData(dataLaLiga.matches)
      setLaLigaStandingsData(laLigaStandingsData.standings[0].table)
      setLaLigaScorersData(laLigaScorersData.scorers)
    })
    .catch((err) => {
      console.log(err);
      navigate("/timeout", {state:{prevURL: window.location.href}});
    })
  
  }, [navigate])

  const laLigaWeekData = getPrimedFixtureData(laLigaData);

  // console.log("grouped la liga data", laLigaWeekData) //test
  // console.log("la liga data in Component", laLigaData) //test

  return (
    <section className='section-body'>
      {laLigaWeekData.length ? 
        <>
          <header className='header-img'>
            <img className="league-logo"src={competitionBadge} alt="LeagueBadge" />
          </header>

          <Carousel heading={competitionTitle} data={laLigaWeekData} searchData={laLigaData}/>
          <section className='tables-section'>
            <div className="all-tables-container"> 
              <StandingsTable tableData={laLigaStandingsData} />

              <PlayerTable tableData={laLigaScorersData} />
            </div>

            <a href="#top" className='navigate'>Back to top</a>
          </section>
        </>
        :
        <h1>Loading...</h1>
      }
    </section>
  )
}

export default LaligaPage;