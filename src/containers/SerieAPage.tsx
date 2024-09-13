import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFootballData, handleFootballSearch } from '../helperFunctions/helperFunctions';

type SerieAPagePropTypes = {
  champData: FootballData[][],
  euroData: FootballData[][],
  searchChampData: FootballData[],
  searchEuroData: FootballData[]
  
}

const SerieAPage = ({ champData, searchChampData, euroData, searchEuroData }: SerieAPagePropTypes) => {
  const [serieAData, setSerieAData] = useState<FootballData[]>([]);

  const [userSerieAData, setUserSerieAData] = useState<FootballData[]>([]);
  const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
 
  const [leagueUserInput, setLeagueUserInput] = useState<string>("");
  const [champUserInput, setChampUserInput] = useState<string>("");
  const [euroUserInput, setEuroUserInput] = useState<string>("");

  const [leagueBtnPress, setLeagueBtnPress] = useState<boolean>(false);
  const [champBtnPress, setChampBtnPress] = useState<boolean>(false);
  const [euroBtnPress, setEuroBtnPress] = useState<boolean>(false);

  useEffect(() => {
    const serieARequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4332&s=2024-2025").then(response => response.json());

    Promise.resolve(serieARequest)
    .then(data => setSerieAData(data.events))
    .catch((err) => console.log(err))
  }, [])
  
  console.log("serie A data in Component", serieAData) //test

  const serieAWeekData = getPrimedFootballData(serieAData);
  const userSerieAWeekData = getPrimedFootballData(userSerieAData);
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
    setUserSerieAData(handleFootballSearch(serieAData, leagueUserInput))
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
    {serieAWeekData ?
    <>
      <header className='header-img'>
        <img className="league-logo" src={serieAData[0]?.strLeagueBadge} alt="LeagueBadge" />
      </header>
      <p>current user input: {leagueUserInput}</p>
      <input type="text" placeholder='search Serie teams...' onChange={handleLeagueUserInput}/>
      <button onClick={handleLeagueSearch}>Search</button>

      <Carousel heading={serieAData[0]?.strLeague} data={leagueBtnPress ? userSerieAWeekData : serieAWeekData}/>


      <input type="text" placeholder='search UCL teams...' onChange={handleChampUserInput} />
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

export default SerieAPage