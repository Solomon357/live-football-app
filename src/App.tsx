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
import MatchDayCardInfo from './components/MatchDayCardInfo/MatchDayCardInfo';

//TODO:
//  1. make use of useParams
//  2. work on styling so I can include more information on matchday cards
//  3?. could include domestic competitions for each league, and make the homepage the european competitions

 //Events on a given matchday: 
    //  - https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=38&s=2014-2015 
    //Europe Competitions:
    //  4480: Champions League ID
    //  4481: Europa League ID
    //  5071: Conference League ID

    //Domestic Competitions
    //  4328: Prem ID
    //  4329: EFL Championship ID
    //  4397: English League 2
    //  4396: English League 3

    //  4335: LaLiga ID
    //  5106: Spanish Liga F
    //  4400: La Liga 2

    //  4331: BundesLiga ID
    //  4399: German 2. Bundesliga"

    //  4334: Ligue 1 ID
    //  5203: France Première Ligue
    //  4401: French Ligue 2

    //  4332: Serie A ID
    //  4394: Italian Serie B
    //  5340: Italian Serie C Girone A

    // s = season filter
    // r = mathday (round) filter  
    
    // All Events in a League by season (limited to 100 events): 
    //  - https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025

function App() {
  const [champData, setChampData] = useState<FootballData[]>([]);
  const [europaData, setEuropaData] = useState<FootballData[]>([]);

  useEffect(()=> {
    const champRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4480&s=2024-2025").then(response => response.json());
    const europaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4481&s=2024-2025").then(response => response.json());
   
    Promise.all([champRequest, europaRequest])
      .then(([dataChamp, dataEuropa]) => {
        setChampData(dataChamp.events)
        setEuropaData(dataEuropa.events)
      })
      .catch((err) => console.log(err))
  }, [])

  // console.log("Europa data in state", europaData) //test
  // console.log("Champ data in state", champData) //test
 
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
            element={<PremPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} url={"england-leagues"}  />}
          />
          <Route 
            path='/england-leagues/:id' 
            element={<MatchDayCardInfo />}
          />
          <Route 
            path='/italy-leagues' 
            element={<SerieAPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} url={'italy-leagues'} />}
          />
          <Route 
            path='/italy-leagues/:id' 
            element={<MatchDayCardInfo />}
          />
          <Route 
            path='/france-leagues' 
            element={<LigueOnePage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} url={'france-leagues'} />}
          />
          <Route 
            path='/france-leagues/:id' 
            element={<MatchDayCardInfo />}
          />
          <Route 
            path='/spain-leagues' 
            element={<LaligaPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} url={'spain-leagues'} />}
          />
          <Route 
            path='/spain-leagues/:id' 
            element={<MatchDayCardInfo />}
          />
          <Route 
            path='/germany-leagues' 
            element={<BundesligaPage champData={champWeekData} searchChampData={filteredChampData} euroData={europaWeekData} searchEuroData={filteredEuropaData} url={'germany-leagues'} />}
          />
          <Route 
            path='/germany-leagues/:id' 
            element={<MatchDayCardInfo />}
          />
        </Routes>
      </BrowserRouter>
      : 
      <p>loading ...</p>
      }
    </>
  )
}

export default App;






