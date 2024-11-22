import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import { getPrimedFixtureData } from '../helperFunctions/helperFunctions';
import FixtureData from '../type/FixtureData';
import { ClubData } from '../type/ClubData';
import StandingsTable from '../components/StandingsTable/StandingsTable';
import PlayerTable from '../components/PlayerTable/PlayerTable';
import PlayerData from '../type/PlayerData';
import { useNavigate } from 'react-router-dom';

const BundesligaPage = () => {
  const navigate = useNavigate();

  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [bundesligaData, setBundesligaData] = useState<FixtureData[]>([]);
  const [bundesligaStandingsData, setBundesligaStandingsData] = useState<ClubData[]>([]);
	const [bundesligaScorersData, setBundesligaScorersData] = useState<PlayerData[]>([]);


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
    const bundesligaScorersRequest = fetch(`/api/v4/competitions/BL1/scorers?limit=20`, accessParams).then(res => res.json());

    Promise.all([bundesligaRequest, bundesligaStandingsRequest, bundesligaScorersRequest])
    .then(([dataBundesliga, bundesligaStandingsData, bundesligaScorersData]) => {
      setCompetitionTitle(dataBundesliga.competition.name);
      setCompetitionBadge(dataBundesliga.competition.emblem);
      setBundesligaData(dataBundesliga.matches)
      setBundesligaStandingsData(bundesligaStandingsData.standings[0].table)
      setBundesligaScorersData(bundesligaScorersData.scorers)
    })
    .catch((err) => {
      console.log(err)
      navigate("/timeout", {state:{prevURL: window.location.href}});
    })

  }, [navigate])

  const bundesligaWeekData = getPrimedFixtureData(bundesligaData);

  // console.log("bundesliga data in Component", bundesligaData) //test
  // console.log("grouped bundesliga data",bundesligaWeekData) // test

  return (
    <section>
      { bundesligaWeekData.length ? 
        <>
          <header className='header-img'>
            <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
          </header>

          <Carousel heading={competitionTitle} data={bundesligaWeekData} searchData={bundesligaData}/>

          <div className="all-tables-container"> 
            <StandingsTable tableData={bundesligaStandingsData} />

            <PlayerTable tableData={bundesligaScorersData} />
          </div>

          <p onClick={() => window.scroll({ top: 0, behavior: 'smooth' })} className='navigate'>Back to top</p>
        </>
        :
        <h1>Loading...</h1>
      }
    </section>
  )
}

export default BundesligaPage;