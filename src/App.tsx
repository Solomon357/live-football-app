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
//  1. create error pages for when too many requests are called  and for when theres any other error with the fetch req
//  2. change format of the matchday cards and focus on building out my more info pages
//  3. start styling the tables and the carousels to look more professional


function App() {
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






