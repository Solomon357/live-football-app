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

const LigueOnePage = () => {
  const navigate = useNavigate();
  const [competitionTitle, setCompetitionTitle] = useState<string>("");
  const [competitionBadge, setCompetitionBadge] = useState<string>("");

  const [ligueOneData, setLigueOneData] = useState<FixtureData[]>([]);
  const [ligueOneStandingsData, setLigueOneStandingsData] = useState<ClubData[]>([]);
	const [ligueOneScorersData, setLigueOneScorersData] = useState<PlayerData[]>([]);


  useEffect(() => {

    let leagueStartDate: Date | string =  new Date();
    leagueStartDate.setDate((leagueStartDate.getDate() - (leagueStartDate.getDay() + 4) % 7) -7);

    let leagueEndDate: Date | string = new Date();
    leagueEndDate.setMonth(leagueStartDate.getMonth() + 2);

    leagueStartDate = leagueStartDate.toISOString().slice(0,10);
    leagueEndDate = leagueEndDate.toISOString().slice(0,10);

    const ligueOneRequest = fetch(`https://live-football-express.netlify.app/api/FL1/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`).then(res => res.json());
    const ligueOneStandingsRequest = fetch(`https://live-football-express.netlify.app/api/FL1/standings`).then(res => res.json());
    const ligueOneScorersRequest = fetch(`https://live-football-express.netlify.app/api/FL1/scorers`).then(res => res.json());

    Promise.all([ligueOneRequest, ligueOneStandingsRequest, ligueOneScorersRequest])
    .then(([dataLigueOne, ligueOneStandingsData, ligueOneScorersData]) => {
      setCompetitionTitle(dataLigueOne.competition.name);
      setCompetitionBadge(dataLigueOne.competition.emblem);
      setLigueOneData(dataLigueOne.matches)
      setLigueOneStandingsData(ligueOneStandingsData.standings[0].table);
      setLigueOneScorersData(ligueOneScorersData.scorers);
    })
    .catch((err) => {
      console.log(err);
      navigate("/timeout", {state:{prevURL: window.location.href}});
    })
  }, [navigate])
  
  const ligueOneWeekData = getPrimedFixtureData(ligueOneData);

  // console.log("Ligue One data in Component", ligueOneData) //test
  // console.log("grouped ligue one data", ligueOneWeekData) //test

  return (
    <section className='section-body'>
      {ligueOneWeekData.length ? 
        <>
          <header className='header-img'>
            <img className="league-logo" src={competitionBadge} alt="LeagueBadge" />
          </header>

          <Carousel heading={competitionTitle} data={ligueOneWeekData} searchData={ligueOneData}/>

          <section className='tables-container'>
            <div className="all-tables-container"> 
              <StandingsTable tableData={ligueOneStandingsData} />

              <PlayerTable tableData={ligueOneScorersData} />
            </div>

            <a href='#top' className='navigate'>Back to top</a>

          </section>
         
        </>
        :
        <h1>Loading...</h1>
      }
    </section>
  )
}

export default LigueOnePage;