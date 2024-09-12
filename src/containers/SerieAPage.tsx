import { useEffect, useState } from 'react';
import '../App.scss';
import Carousel from '../components/Carousel/Carousel';
import FootballData from '../type/FootballData';
import { cleanFootballData, filterFootballData, groupFootballData } from '../helperFunctions/helperFunctions';

type SerieAPagePropTypes = {
  champData: FootballData[][];
  euroData: FootballData[][];
}
const SerieAPage = ({ champData, euroData }: SerieAPagePropTypes) => {
  const [serieAData, setSerieAData] = useState<FootballData[]>([]);

  useEffect(() => {
    const serieARequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4332&s=2024-2025").then(response => response.json());

    Promise.resolve(serieARequest)
    .then(data => setSerieAData(data.events))
    .catch((err) => console.log(err))

  }, [])

  console.log("serie A data in Component", serieAData) //test

  const cleanedSerieAData = cleanFootballData(serieAData)
  const filteredSerieAData = filterFootballData(cleanedSerieAData)
  const serieAWeekData = groupFootballData(filteredSerieAData);

  return (
    <section>
    {serieAWeekData ?
    <>
      <header className='header-img'>
        <img className="league-logo" src={serieAData[0]?.strLeagueBadge} alt="LeagueBadge" />
      </header>
      
      <input type="text" placeholder='search Serie teams...' />
      <button>Search</button>

      <Carousel heading={serieAData[0]?.strLeague} data={serieAWeekData}/>


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

export default SerieAPage