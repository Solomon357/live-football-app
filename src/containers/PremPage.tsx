import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFixtureData, getPrimedFootballData, handleFootballSearch } from '../helperFunctions/helperFunctions';
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

  const [userPremData, setUserPremData] = useState<FootballData[]>([]);
  // const [userChampionshipData, setUserChampionshipData] = useState<FootballData[]>([]);
  // const [userLeagueOneData, setUserLeagueOneData] = useState<FootballData[]>([]);
  // const [userLeagueTwoData, setUserLeagueTwoData] = useState<FootballData[]>([]);
  const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
 
  const [topLeagueUserInput, setTopLeagueUserInput] = useState<string>("");
  // const [secondLeagueUserInput, setSecondLeagueUserInput] = useState<string>("");
  // const [thirdLeagueUserInput, setThirdLeagueUserInput] = useState<string>("");
  // const [fourthLeagueUserInput, setFourthLeagueUserInput] = useState<string>("");
  const [champUserInput, setChampUserInput] = useState<string>("");
  const [euroUserInput, setEuroUserInput] = useState<string>("");

  const [topLeagueBtnPress, setTopLeagueBtnPress] = useState<boolean>(false);
  // const [secondLeagueBtnPress, setSecondLeagueBtnPress] = useState<boolean>(false);
  // const [thirdLeagueBtnPress, setThirdLeagueBtnPress] = useState<boolean>(false);
  // const [fourthLeagueBtnPress, setFourthLeagueBtnPress] = useState<boolean>(false);
  const [champBtnPress, setChampBtnPress] = useState<boolean>(false);
  const [euroBtnPress, setEuroBtnPress] = useState<boolean>(false);
 

  useEffect(() => {

    const accessParams = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-Auth-Token': '02d8eeaffef746b59f28060310b24ccc'
      },
    }

    const newPremRequest = fetch("/api/v4/competitions/PL/matches?dateFrom=2024-10-20&dateTo=2025-01-20", accessParams).then(res => res.json())
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
  // const championshipWeekData = getPrimedFootballData(championshipData);
  // const leagueOneWeekData = getPrimedFootballData(leagueOneData);
  // const leagueTwoWeekData = getPrimedFootballData(leagueTwoData);
  const userPremWeekData = getPrimedFootballData(userPremData);
  const userChampWeekData = getPrimedFootballData(userChampData);
  const userEuroWeekData = getPrimedFootballData(userEuroData);

  const handleLeagueUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopLeagueBtnPress(false)
    setTopLeagueUserInput(e.target.value)
  }
  const handleChampUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChampBtnPress(false)
    setChampUserInput(e.target.value)
  }
  const handleEuroUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEuroBtnPress(false)
    setEuroUserInput(e.target.value)
  }

  const handleLeagueSearch = () => {
    setTopLeagueBtnPress(true)
    setUserPremData(handleFootballSearch(premData, topLeagueUserInput))
  }
  const handleChampSearch = () => {
    setChampBtnPress(true)
    setUserChampData(handleFootballSearch(searchChampData, champUserInput))
  }
  const handleEuroSearch = () => {
    setEuroBtnPress(true)
    setUserEuroData(handleFootballSearch(searchEuroData, euroUserInput))
  }

  return (
    <section>
      {premWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={premData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search PL teams...' onChange={handleLeagueUserInput} />
        <button onClick={handleLeagueSearch}>Search</button>

        <Carousel heading={premData[0]?.strLeague} url={url} data={topLeagueBtnPress ? userPremWeekData : premWeekData}/>

        <input type="text" placeholder='search UCL teams...' onChange={handleChampUserInput}/>
        <button onClick={handleChampSearch}>Search</button>

        <Carousel heading="UEFA Champions League" url={url} data={champBtnPress ? userChampWeekData : champData}/>

        <input type="text" placeholder='search UEL teams...' onChange={handleEuroUserInput}/>
        <button onClick={handleEuroSearch}>Search</button>

        <Carousel heading="UEFA Europa League" url={url} data={euroBtnPress ? userEuroWeekData : euroData}/>
      </>
      :
      <p>Loading...</p>
      }
    </section>
  )
}

export default PremPage;