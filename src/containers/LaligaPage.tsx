import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFootballData, handleFootballSearch } from '../helperFunctions/helperFunctions';


type LaligaPagePropTypes = {
  champData: FootballData[][],
  euroData: FootballData[][],
  searchChampData: FootballData[],
  searchEuroData: FootballData[],
  url?: string
}

const LaligaPage = ({ champData,searchChampData, euroData, searchEuroData, url }: LaligaPagePropTypes) => {

  const [laLigaData, setLaLigaData] = useState<FootballData[]>([]);

  const [userLaLigaData, setUserLaLigaData] = useState<FootballData[]>([]);
  const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
 
  const [leagueUserInput, setLeagueUserInput] = useState<string>("");
  const [champUserInput, setChampUserInput] = useState<string>("");
  const [euroUserInput, setEuroUserInput] = useState<string>("");

  const [leagueBtnPress, setLeagueBtnPress] = useState<boolean>(false);
  const [champBtnPress, setChampBtnPress] = useState<boolean>(false);
  const [euroBtnPress, setEuroBtnPress] = useState<boolean>(false);

    useEffect(() => {
      const laLigaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4335&s=2024-2025").then(response => response.json());

      Promise.resolve(laLigaRequest)
      .then(data => setLaLigaData(data.events))
      .catch((err) => console.log(err))
  
    }, [])

    console.log("la liga data in Component", laLigaData) //test
    const laLigaWeekData = getPrimedFootballData(laLigaData);
    const userLaLigaWeekData = getPrimedFootballData(userLaLigaData);
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
      setLeagueBtnPress(true)
      setUserLaLigaData(handleFootballSearch(laLigaData, leagueUserInput))
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
      {laLigaWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo"src={laLigaData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search Liga teams...' onChange={handleLeagueUserInput}/>
        <button onClick={handleLeagueSearch}>Search</button>

        <Carousel heading={laLigaData[0]?.strLeague} url={url} data={leagueBtnPress ? userLaLigaWeekData : laLigaWeekData}/>

        <input type="text" placeholder='search UCL teams...' onChange={handleChampUserInput} />
        <button onClick={handleChampSearch}>Search</button>

        <Carousel heading="UEFA Champions League" url={url} data={champBtnPress ? userChampWeekData : champData}/>

        <input type="text" placeholder='search UEL teams...' onChange={handleEuroUserInput} />
        <button onClick={handleEuroSearch}>Search</button>

        <Carousel heading="UEFA Europa League" url={url} data={euroBtnPress ? userEuroWeekData : euroData}/>
      </>
      :
      <p>Loading...</p>
      }
    </section>
  )
}

export default LaligaPage