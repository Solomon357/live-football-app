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

    const ligueOneRequest = fetch(`/api/v4/competitions/FL1/matches?dateFrom=${leagueStartDate}&dateTo=${leagueEndDate}`, accessParams).then(res => res.json());
    const ligueOneStandingsRequest = fetch(`/api/v4/competitions/FL1/standings`, accessParams).then(res => res.json());
    const ligueOneScorersRequest = fetch(`/api/v4/competitions/FL1/scorers?limit=20`, accessParams).then(res => res.json());

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

          <div className="all-tables-container"> 
            <StandingsTable tableData={ligueOneStandingsData} />

            <PlayerTable tableData={ligueOneScorersData} />
          </div>

          <p onClick={() => window.scroll({ top: 0, behavior: 'smooth' })} className='navigate'>Back to top</p>
        </>
        :
        <h1>Loading...</h1>
      }
    </section>
  )
}

export default LigueOnePage;