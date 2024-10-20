import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFootballData, handleFootballSearch } from '../helperFunctions/helperFunctions';

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
    const premRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025").then(response => response.json());
    const championshipRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4329&s=2024-2025").then(response => response.json());
    const leagueOneRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4397&s=2024-2025").then(response => response.json());
    const leagueTwoRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4396&s=2024-2025").then(response => response.json());

    Promise.all([premRequest, championshipRequest, leagueOneRequest, leagueTwoRequest])
    .then(([dataPrem, dataChampionship, dataLeagueOne, dataLeagueTwo]) => {
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
  
  const premWeekData = getPrimedFootballData(premData);
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