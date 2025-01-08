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

const PremPage = () => {
  const navigate = useNavigate();
  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [premData, setPremData] = useState<FixtureData[]>([]);
  const [premStandingsData, setPremStandingsData] = useState<ClubData[]>([]);
	const [premScorersData, setPremScorersData] = useState<PlayerData[]>([]);


  useEffect(() => {

    let leagueStartDate: Date | string =  new Date();
    leagueStartDate.setDate((leagueStartDate.getDate() - (leagueStartDate.getDay() + 4) % 7) -7);

    let leagueEndDate: Date | string = new Date();
    leagueEndDate.setMonth(leagueStartDate.getMonth() + 2);

    leagueStartDate = leagueStartDate.toISOString().slice(0,10);
    leagueEndDate = leagueEndDate.toISOString().slice(0,10);

    const premRequest = fetch(`https://live-football-express.netlify.app/api/PL/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`).then(res => res.json());
    const premStandingsRequest = fetch(`https://live-football-express.netlify.app/api/PL/standings`).then(res => res.json());
    const premScorersRequest = fetch(`https://live-football-express.netlify.app/api/PL/scorers`).then(res => res.json());

    //console.log("prem data on site!") //test
    Promise.all([premRequest, premStandingsRequest, premScorersRequest])
    .then(([dataPrem, premStandingsData , premScorersData]) => {
      setCompetitionTitle(dataPrem.competition.name);
      setCompetitionBadge(dataPrem.competition.emblem);
      setPremData(dataPrem.matches)
      setPremStandingsData(premStandingsData.standings[0].table)
      setPremScorersData(premScorersData.scorers)
    })
    .catch((err) => {
      console.log(err);
      navigate("/timeout", {state:{prevURL: window.location.href}});
    })
  
  }, [navigate])

  const premWeekData = getPrimedFixtureData(premData);

  //console.log("Prem data in Component", premData) //test
  //console.log("grouped prem data", premWeekData) //test

  return (
    <section className='section-body'>
      {premWeekData.length ? 
        <>
          <header className='header-img'>
            <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
          </header>

          <Carousel heading={competitionTitle} data={premWeekData} searchData={premData}/>

          <section className='tables-container'>
            <div className="all-tables-container"> 
              <StandingsTable tableData={premStandingsData} />

              <PlayerTable tableData={premScorersData} />
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

export default PremPage;