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
const PremPage = ({ champData, searchChampData, euroData, searchEuroData, url }: PremPagePropType) => {
  const [premData, setPremData] = useState<FootballData[]>([]);

  const [userPremData, setUserPremData] = useState<FootballData[]>([]);
  const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
 
  const [leagueUserInput, setLeagueUserInput] = useState<string>("");
  const [champUserInput, setChampUserInput] = useState<string>("");
  const [euroUserInput, setEuroUserInput] = useState<string>("");

  const [leagueBtnPress, setLeagueBtnPress] = useState<boolean>(false);
  const [champBtnPress, setChampBtnPress] = useState<boolean>(false);
  const [euroBtnPress, setEuroBtnPress] = useState<boolean>(false);
 
  
  useEffect(() => {
    const premRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025").then(response => response.json());

    Promise.resolve(premRequest)
    .then(data => setPremData(data.events))
    .catch((err) => console.log(err))

  }, [])

  console.log("Prem data in Component", premData) //test

  const premWeekData = getPrimedFootballData(premData);
  const userPremWeekData = getPrimedFootballData(userPremData);
  const userChampWeekData = getPrimedFootballData(userChampData);
  const userEuroWeekData = getPrimedFootballData(userEuroData);

  const handleLeagueUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeagueBtnPress(false)
    setLeagueUserInput(e.target.value)
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
    //I want to only display the match cards that contains the userInput teams
    setLeagueBtnPress(true)
    setUserPremData(handleFootballSearch(premData, leagueUserInput))
  }
  const handleChampSearch = () => {
    //I want to only display the match cards that contains the userInput teams
    setChampBtnPress(true)
    setUserChampData(handleFootballSearch(searchChampData, champUserInput))
  }
  const handleEuroSearch = () => {
    //I want to only display the match cards that contains the userInput teams
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

        <Carousel heading={premData[0]?.strLeague} url={url} data={leagueBtnPress ? userPremWeekData : premWeekData}/>

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