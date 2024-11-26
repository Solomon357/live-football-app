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
import TimeoutPage from './containers/TimeoutPage';

//TODO:
//  1. find a hosting service thats NOT github pages for this project
//  2. create error pages for when theres any other error with the fetch req
//  3. focus on building out my more info pages
  


function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route 
          path='/' 
          element={<HomePage />}
        />
        <Route 
          path='/europe-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/england-leagues' 
          element={<PremPage />}
        />
        <Route 
          path='/england-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/italy-leagues' 
          element={<SerieAPage />}
        />
        <Route 
          path='/italy-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/france-leagues' 
          element={<LigueOnePage />}
        />
        <Route 
          path='/france-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/spain-leagues' 
          element={<LaligaPage />}
        />
        <Route 
          path='/spain-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/germany-leagues' 
          element={<BundesligaPage />}
        />
        <Route 
          path='/germany-leagues/:id' 
          element={<MatchDayCardInfo />}
        />
        <Route 
          path='/timeout' 
          element={<TimeoutPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;






