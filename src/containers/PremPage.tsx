import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFixtureData, getPrimedFootballData } from '../helperFunctions/helperFunctions';
import FixtureData from '../type/NewFootballData';

type PremPagePropType = {
  champData: FootballData[][],
  euroData: FootballData[][],
  searchChampData: FootballData[],
  searchEuroData: FootballData[],
  url?: string
}


  //Domestic Competitions
  //  4328: Prem ID
  //  4329: EFL Championship ID
  //  4397: English League 2
  //  4396: English League 3
const PremPage = ({ champData, searchChampData, euroData, searchEuroData, url }: PremPagePropType) => {
  
  const [premData, setPremData] = useState<FootballData[]>([]);
  const [newPremData, setNewPremData] = useState<FixtureData[]>([]);
  const [championshipData, setChampionshipData] = useState<FootballData[]>([]);
  const [leagueOneData, setLeagueOneData] = useState<FootballData[]>([]);
  const [leagueTwoData, setLeagueTwoData] = useState<FootballData[]>([]);

  // const [userPremData, setUserPremData] = useState<FootballData[]>([]);
  // const [userChampionshipData, setUserChampionshipData] = useState<FootballData[]>([]);
  // const [userLeagueOneData, setUserLeagueOneData] = useState<FootballData[]>([]);
  // const [userLeagueTwoData, setUserLeagueTwoData] = useState<FootballData[]>([]);
  // const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  // const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
 


  useEffect(() => {

    const key: string = import.meta.env.VITE_API_KEY;

    let startDate: Date | string =  new Date();
    startDate.setDate((startDate.getDate() - (startDate.getDay() + 4) % 7) -7);

    let endDate: Date | string = new Date();
    endDate.setMonth(startDate.getMonth() + 2);

    startDate = startDate.toISOString().slice(0,10);
    endDate = endDate.toISOString().slice(0,10);

    const accessParams = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-Auth-Token': key
      }
    }

    const newPremRequest = fetch(`/api/v4/competitions/PL/matches?dateFrom=${startDate}&dateTo=${endDate}`, accessParams).then(res => res.json())
    const premRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025").then(response => response.json());
    const championshipRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4329&s=2024-2025").then(response => response.json());
    const leagueOneRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4397&s=2024-2025").then(response => response.json());
    const leagueTwoRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4396&s=2024-2025").then(response => response.json());

    Promise.all([newPremRequest, premRequest, championshipRequest, leagueOneRequest, leagueTwoRequest])
    .then(([dataNewPrem, dataPrem , dataChampionship, dataLeagueOne, dataLeagueTwo]) => {
      setNewPremData(dataNewPrem.matches)
      setPremData(dataPrem.events)
      setChampionshipData(dataChampionship.events)
      setLeagueOneData(dataLeagueOne.events)
      setLeagueTwoData(dataLeagueTwo.events)
    })
    .catch((err) => console.log(err))

  }, [])

  console.log("Prem data in Component", premData) //test
  console.log("championship data in Component", championshipData) //test
  console.log("efl1 data in Component", leagueOneData) //test
  console.log("efl2 data in Component", leagueTwoData) //test
  console.log("New Prem Data with CORS issue resolved", newPremData);
  
  const premWeekData = getPrimedFootballData(premData);
  const newPremWeekData = getPrimedFixtureData(newPremData);
  console.log("grouped new prem data",newPremWeekData)

  return (
    <section>
      {premWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={premData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>

        <Carousel heading={premData[0]?.strLeague} data={premWeekData} searchData={premData} url={url}/>

        <Carousel heading="UEFA Champions League" data={champData} searchData={searchChampData} url={url} />

        <Carousel heading="UEFA Europa League" url={url} data={euroData} searchData={searchEuroData}/>
      </>
      :
      <p>Loading...</p>
      }
    </section>
  )
}

export default PremPage;