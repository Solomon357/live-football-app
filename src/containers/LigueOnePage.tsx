import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { cleanFootballData, filterFootballData, groupFootballData } from '../helperFunctions/helperFunctions';

type LigueOnePagePropTypes = {
    champData: FootballData[][],
    euroData: FootballData[][],
}

const LigueOnePage = ({champData, euroData }: LigueOnePagePropTypes) => {
    const [ligueOneData, setLigueOneData] = useState<FootballData[]>([]);

    useEffect(() => {
      const ligueOneRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4334&s=2024-2025").then(response => response.json());
  
      Promise.resolve(ligueOneRequest)
      .then(data => setLigueOneData(data.events))
      .catch((err) => console.log(err))
  
    }, [])

    console.log("ligue one data in Component", ligueOneData) //test

    const cleanedLigueOneData = cleanFootballData(ligueOneData)
    const filteredLigueOneData = filterFootballData(cleanedLigueOneData)
    const ligueOneWeekData = groupFootballData(filteredLigueOneData);

    return (
        <section>
          {ligueOneWeekData ? 
          <>
            <header className='header-img'>
              <img className="league-logo" src={ligueOneData[0]?.strLeagueBadge} alt="LeagueBadge" />
            </header>
            
            <input type="text" placeholder='search Ligue teams...' />
            <button>Search</button>
    
            <Carousel heading={ligueOneData[0]?.strLeague} data={ligueOneWeekData}/>
    
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

export default LigueOnePage