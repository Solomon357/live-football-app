import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { cleanFootballData, filterFootballData, groupFootballData } from '../helperFunctions/helperFunctions';

type PremPagePropType = {
  champData: FootballData[][],
  euroData: FootballData[][],
}
const PremPage = ({ champData, euroData }: PremPagePropType) => {
  const [premData, setPremData] = useState<FootballData[]>([]);

  useEffect(() => {
    const premRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025").then(response => response.json());

    Promise.resolve(premRequest)
    .then(data => setPremData(data.events))
    .catch((err) => console.log(err))

  }, [])

  console.log("Prem data in Component", premData) //test

  const cleanedPremData = cleanFootballData(premData)
  const filteredPremData = filterFootballData(cleanedPremData)
  const premWeekData = groupFootballData(filteredPremData);

  return (
    <section>
      {premWeekData ? 
      <>
        <header className='header-img'>
          <img className="league-logo" src={premData[0]?.strLeagueBadge} alt="LeagueBadge" />
        </header>
        
        <input type="text" placeholder='search PL teams...' />
        <button>Search</button>

        <Carousel heading={premData[0]?.strLeague} data={premWeekData}/>

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

export default PremPage;