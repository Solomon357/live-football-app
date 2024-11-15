import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import PremPage from './containers/PremPage';
import SerieAPage from './containers/SerieAPage';
import LigueOnePage from './containers/LigueOnePage';
import LaligaPage from './containers/LaligaPage';
import BundesligaPage from './containers/BundesligaPage';
import MatchDayCardInfo from './components/MatchDayCardInfo/MatchDayCardInfo';
import HomePage from './containers/HomePage';

//TODO:
//  1. work on styling so I can include more information on matchday cards
//  2?. could include domestic competitions for each league, and make the homepage the european competitions

 //Events on a given matchday: 
    //  - https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=38&s=2014-2015 
    //Europe Competitions:
    //  4480: Champions League ID
    //  4481: Europa League ID
    //  5071: Conference League ID

    // s = season filter
    // r = mathday (round) filter  
    
    // All Events in a League by season (limited to 100 events): 
    //  - https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025

function App() {
  // const [champData, setChampData] = useState<FootballData[]>([]);
  // const [europaData, setEuropaData] = useState<FootballData[]>([]);

  // useEffect(()=> {
  //   const champRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4480&s=2024-2025").then(response => response.json());
  //   const europaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4481&s=2024-2025").then(response => response.json());
   
  //   Promise.all([champRequest, europaRequest])
  //     .then(([dataChamp, dataEuropa]) => {
  //       setChampData(dataChamp.events)
  //       setEuropaData(dataEuropa.events)
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  // console.log("Europa data in state", europaData) //test
  // console.log("Champ data in state", champData) //test
 
  // const filteredChampData = getFilteredFootballData(champData)
  // const filteredEuropaData = getFilteredFootballData(europaData)
 
  // const champWeekData = getPrimedFootballData(champData); 
  // const europaWeekData = getPrimedFootballData(europaData);

  //testing without return
  // groupFootballData(filteredPremData)
  // groupFootballData(filteredChampData)

  // console.log("grouped prem Data by week", premWeekData)
  // console.log("grouped champ Data by week", champWeekData)

  //atm its just showing the top league of a country followed by international comps, later ill make it so each country shows top 3 leagues
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path='/' 
          element={<HomePage />}
        />
        <Route 
          path='/live-football-app/england-leagues' 
          element={<PremPage />}
        />
        <Route 
          path='/live-football-app/england-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/live-football-app/italy-leagues' 
          element={<SerieAPage />}
        />
        <Route 
          path='/live-football-app/italy-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/live-football-app/france-leagues' 
          element={<LigueOnePage />}
        />
        <Route 
          path='/live-football-app/france-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/live-football-app/spain-leagues' 
          element={<LaligaPage />}
        />
        <Route 
          path='/live-football-app/spain-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/live-football-app/germany-leagues' 
          element={<BundesligaPage />}
        />
        <Route 
          path='/live-football-app/germany-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;






