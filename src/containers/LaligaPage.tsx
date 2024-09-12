import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { cleanFootballData, filterFootballData, groupFootballData } from '../helperFunctions/helperFunctions';


type LaligaPagePropTypes = {
  champData: FootballData[][],
  euroData: FootballData[][],
}

const LaligaPage = ({ champData, euroData }: LaligaPagePropTypes) => {

  const [laLigaData, setLaLigaData] = useState<FootballData[]>([]);

    useEffect(() => {
      const laLigaRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4335&s=2024-2025").then(response => response.json());
  
      Promise.resolve(laLigaRequest)
      .then(data => setLaLigaData(data.events))
      .catch((err) => console.log(err))
  
    }, [])

    console.log("la liga data in Component", laLigaData) //test

    const cleanedLaLigaData = cleanFootballData(laLigaData)
    const filteredLaLigaData = filterFootballData(cleanedLaLigaData)
    const laLigaWeekData = groupFootballData(filteredLaLigaData);

  return (
    <section>
      {laLigaWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo"src={laLigaData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search Liga teams...' />
        <button>Search</button>

        <Carousel heading={laLigaData[0]?.strLeague} data={laLigaWeekData}/>

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

export default LaligaPage