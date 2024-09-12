import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { cleanFootballData, filterFootballData, groupFootballData } from '../helperFunctions/helperFunctions';

type BundesligaPagePropTypes = {
  champData: FootballData[][],
  euroData: FootballData[][],
}

const BundesligaPage = ({ champData, euroData }: BundesligaPagePropTypes) => {
  const [bundesligaData, setBundesligaData] = useState<FootballData[]>([]);

    useEffect(() => {
      const bundesligaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4331&s=2024-2025").then(response => response.json());
  
      Promise.resolve(bundesligaRequest)
      .then(data => setBundesligaData(data.events))
      .catch((err) => console.log(err))
  
    }, [])

    console.log("la liga data in Component", bundesligaData) //test

    const cleanedBundesligaData = cleanFootballData(bundesligaData)
    const filteredBundesligaData = filterFootballData(cleanedBundesligaData)
    const bundesligaWeekData = groupFootballData(filteredBundesligaData);

  return (
    <section>
      {bundesligaWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={bundesligaData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search BL teams...' />
        <button>Search</button>

        <Carousel heading={bundesligaData[0]?.strLeague} data={bundesligaWeekData}/>

        <input type="text" placeholder='search UCL teams...' />
        <button>Search</button>

        <Carousel heading="UEFA Champions League" data={champData}/>

        <input type="text" placeholder='search UEL teams...' />
        <button>Search</button>

        <Carousel heading="UEFA Europa League" data={euroData}/>
      </>
      :
      <p>Loading...</p>
      }
    </section>
  )
}

export default BundesligaPage