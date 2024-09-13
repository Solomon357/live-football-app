import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFootballData, handleFootballSearch } from '../helperFunctions/helperFunctions';

type BundesligaPagePropTypes = {
  champData: FootballData[][],
  euroData: FootballData[][],
  searchChampData: FootballData[],
  searchEuroData: FootballData[]
}

const BundesligaPage = ({ champData, searchChampData, euroData, searchEuroData }: BundesligaPagePropTypes) => {
  const [bundesligaData, setBundesligaData] = useState<FootballData[]>([]);

  const [userBundesligaData, setUserBundesligaData] = useState<FootballData[]>([]);
  const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
  
  const [leagueUserInput, setLeagueUserInput] = useState<string>("");
  const [champUserInput, setChampUserInput] = useState<string>("");
  const [euroUserInput, setEuroUserInput] = useState<string>("");

  const [leagueBtnPress, setLeagueBtnPress] = useState<boolean>(false);
  const [champBtnPress, setChampBtnPress] = useState<boolean>(false);
  const [euroBtnPress, setEuroBtnPress] = useState<boolean>(false);

    useEffect(() => {
      const bundesligaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4331&s=2024-2025").then(response => response.json());
  
      Promise.resolve(bundesligaRequest)
      .then(data => setBundesligaData(data.events))
      .catch((err) => console.log(err))
  
    }, [])

    console.log("la liga data in Component", bundesligaData) //test

  const bundesligaWeekData = getPrimedFootballData(bundesligaData);
  const userBundesligaWeekData = getPrimedFootballData(userBundesligaData);
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
    setUserBundesligaData(handleFootballSearch(bundesligaData, leagueUserInput))
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
      {bundesligaWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={bundesligaData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search BL teams...' onChange={handleLeagueUserInput} onKeyDown={(e) => e.key === "Enter" ? handleLeagueSearch : ""}/>
        <button onClick={handleLeagueSearch}>Search</button>

        <Carousel heading={bundesligaData[0]?.strLeague} data={leagueBtnPress ? userBundesligaWeekData : bundesligaWeekData}/>

        <input type="text" placeholder='search UCL teams...' onChange={handleChampUserInput}/>
        <button onClick={handleChampSearch}>Search</button>

        <Carousel heading="UEFA Champions League" data={champBtnPress ? userChampWeekData : champData}/>

        <input type="text" placeholder='search UEL teams...' onChange={handleEuroUserInput} />
        <button onClick={handleEuroSearch}>Search</button>

        <Carousel heading="UEFA Europa League" data={euroBtnPress ? userEuroWeekData : euroData}/>
      </>
      :
      <p>Loading...</p>
      }
    </section>
  )
}

export default BundesligaPage