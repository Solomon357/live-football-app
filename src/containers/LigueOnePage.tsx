import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { getPrimedFootballData, handleFootballSearch } from '../helperFunctions/helperFunctions';

type LigueOnePagePropTypes = {
  champData: FootballData[][],
  euroData: FootballData[][],
  searchChampData: FootballData[],
  searchEuroData: FootballData[],
  url?: string
}
//Domestic Competitions
  //  4334: Ligue 1 ID
  //  5203: France Première Ligue
  //  4401: French Ligue 2

const LigueOnePage = ({champData, searchChampData, euroData, searchEuroData, url }: LigueOnePagePropTypes) => {
  const [ligueOneData, setLigueOneData] = useState<FootballData[]>([]);

  const [userLigueOneData, setUserLigueOneData] = useState<FootballData[]>([]);
  const [userChampData, setUserChampData] = useState<FootballData[]>([]);
  const [userEuroData, setUserEuroData] = useState<FootballData[]>([]);
  
  const [leagueUserInput, setLeagueUserInput] = useState<string>("");
  const [champUserInput, setChampUserInput] = useState<string>("");
  const [euroUserInput, setEuroUserInput] = useState<string>("");

  const [leagueBtnPress, setLeagueBtnPress] = useState<boolean>(false);
  const [champBtnPress, setChampBtnPress] = useState<boolean>(false);
  const [euroBtnPress, setEuroBtnPress] = useState<boolean>(false);

  useEffect(() => {
    const ligueOneRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4334&s=2024-2025").then(response => response.json());

    Promise.resolve(ligueOneRequest)
    .then(data => setLigueOneData(data.events))
    .catch((err) => console.log(err))

  }, [])

  console.log("ligue one data in Component", ligueOneData) //test

  const ligueOneWeekData = getPrimedFootballData(ligueOneData);
  const userLigueOneWeekData = getPrimedFootballData(userLigueOneData);
  
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
    setUserLigueOneData(handleFootballSearch(ligueOneData, leagueUserInput))
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
      {ligueOneWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={ligueOneData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search Ligue teams...' onChange={handleLeagueUserInput} />
        <button onClick={handleLeagueSearch}>Search</button>

        <Carousel heading={ligueOneData[0]?.strLeague} url={url} data={leagueBtnPress ? userLigueOneWeekData : ligueOneWeekData}/>

        <input type="text" placeholder='search UCL teams...' onChange={handleChampUserInput}/>
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

export default LigueOnePage