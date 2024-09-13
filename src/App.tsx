import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getFilteredFootballData, getPrimedFootballData} from './helperFunctions/helperFunctions';
import './App.scss';
import FootballData from './type/FootballData';
import Navbar from './components/Navbar/Navbar';
import PremPage from './containers/PremPage';
import SerieAPage from './containers/SerieAPage';
import LigueOnePage from './containers/LigueOnePage';
import LaligaPage from './containers/LaligaPage';
import BundesligaPage from './containers/BundesligaPage';

//TODO:
//  2. work on styling so I can include more information 
//  3?. could include europa league and conference league aswell 
//  4?. create multiple pages for different leagues based off the framework of the first page 

 //Events on a given matchday: 
    //  - https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=38&s=2014-2015 
    //Europe Competitions:
    //  4480: Champions League ID
    //  4481: Europa League ID
    //  5071: Conference League ID

    //Domestic Competitions
    //  4328: Prem ID
    //  4335: LaLiga ID
    //  4331: BundesLiga ID
    //  4334: Ligue 1 ID
    //  4332: Serie A ID

    // s = season filter
    // r = mathday (round) filter  
    
    // All Events in a League by season (limited to 100 events): 
    //  - https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025

    //NOTE: These round numbers relate to special strings:
    // Round 125 = Quarter-Final
    // Round 150 = Semi-Final
    // Round 160 = Playoff
    // Round 170 = Playoff Semi-Final
    // Round 180 = Playoff Final
    // Round 200 = Final
    // Round 500 = Pre-Season

    // Head to Head of given teams example: https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=Arsenal_vs_Chelsea


//going to be a custom hook later

// const useFetch = (url: string): FootballData[] => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(url)
//     .then(res => res.json())
//     .then(data => setData(data))
//     .catch(err => console.log(err))
// //   }, [url])

//   return data;

// }

function App() {
  // const [premData, setPremData] = useState<FootballData[]>([]);
  // const [serieAData, setSerieAData] = useState<FootballData[]>([]);
  const [champData, setChampData] = useState<FootballData[]>([]);
  const [europaData, setEuropaData] = useState<FootballData[]>([]);
  //const champData = useFetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4480&s=2024-2025");
  //const premData = useFetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025");

  const currentDate: string = new Date().toISOString().slice(0, 10) // gets current date in format YYYY-MM-DD
  console.log(currentDate)

  useEffect(()=> {
    //apparently using 2 different fetches sequentially is an issue, so this is the solution I found
    const champRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4480&s=2024-2025").then(response => response.json());
    const europaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4481&s=2024-2025").then(response => response.json());
    // const premRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025").then(response => response.json());
    // const serieARequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4332&s=2024-2025").then(response => response.json());
   
    Promise.all([champRequest, europaRequest])
      .then(([dataChamp, dataEuropa]) => {
        setChampData(dataChamp.events)
        setEuropaData(dataEuropa.events)
        // setSerieAData(dataSerieA.events)
      })
      .catch((err) => console.log(err))
  }, [])

  // console.log("Prem data in state", premData) //test
  // console.log("serie A data in state", serieAData) //test
  console.log("Europa data in state", europaData) //test
  console.log("Champ data in state", champData) //test
 
  const filteredChampData = getFilteredFootballData(champData)
  const filteredEuropaData = getFilteredFootballData(europaData)
 
  const champWeekData = getPrimedFootballData(champData); 
  const europaWeekData = getPrimedFootballData(europaData);


  //testing without return
  // groupFootballData(filteredPremData)
  // groupFootballData(filteredChampData)

  // console.log("grouped prem Data by week", premWeekData)
  // console.log("grouped champ Data by week", champWeekData)

  //atm its just showing the top league of a country followed by international comps, later ill make it so each country shows top 3 leagues
  return (
    <>
     {champWeekData && europaWeekData ?
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<PremPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} />}
          />
          <Route 
            path='/italy-leagues' 
            element={<SerieAPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} />}
          />
          <Route 
            path='/france-leagues' 
            element={<LigueOnePage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} />}
          />
          <Route 
            path='/spain-leagues' 
            element={<LaligaPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} />}
          />
          <Route 
            path='/germany-leagues' 
            element={<BundesligaPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} />}
          />
        </Routes>
      {/* <input type="text" placeholder='search UCL teams...' />
      <button>Search</button>

      <Carousel heading="UEFA Champions League" data={champWeekData}/>

      <input type="text" placeholder='search UEL teams...' />
      <button>Search</button>

      <Carousel heading="UEFA Europa League" data={europaWeekData}/>

      <input type="text" placeholder='search PL teams...' />
      <button>Search</button>
        
      <Carousel heading="Premier League" data={premWeekData}/> */}
      </BrowserRouter>
      : 
      <p>loading ...</p>
      }
    </>
  )
}

export default App;






