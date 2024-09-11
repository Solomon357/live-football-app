import { useState, useEffect } from 'react'
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import FootballData from './type/FootballData';

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
//     .then(data => setData(data.events))
//     .catch(err => console.log(err))
//   }, [url])

//   return data;

// }

function App() {
  const [premData, setPremData] = useState<FootballData[]>([]);
  const [champData, setChampData] = useState<FootballData[]>([]);
  //const champData = useFetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4480&s=2024-2025");
  //const premData = useFetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025");

  const currentDate: string = new Date().toISOString().slice(0, 10) // gets current date in format YYYY-MM-DD
  console.log(currentDate)

  useEffect(()=> {
    //apparently using 2 different fetches sequentially is an issue, so this is the solution I found
    const champRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4480&s=2024-2025").then(response => response.json());
    const premRequest = fetch("https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025").then(response => response.json());
    Promise.all([champRequest, premRequest])
      .then(([dataChamp, dataPrem]) => {
        setChampData(dataChamp.events)
        setPremData(dataPrem.events)
      })
      .catch((err) => console.log(err))
  }, [])

  //console.log("Prem data in state", premData) //test
  //console.log("Champ data in state", champData) //test

  const cleanFootballData = (anyData: FootballData[]): FootballData[] => {
    return anyData.map((data) => ({
      idEvent: data.idEvent,
      dateEvent: data.dateEvent,
      idLeague: data.idLeague,
      intAwayScore: data.intAwayScore,
      intHomeScore: data.intHomeScore,
      intRound: data.intRound,
      strEvent: data.strEvent,
      strLeague: data.strLeague,
      strLeagueBadge: data.strLeagueBadge,
      strTime: data.strTime,
      strHomeTeam: data.strHomeTeam,
      strHomeTeamBadge: data.strHomeTeamBadge,
      strAwayTeam: data.strAwayTeam,
      strAwayTeamBadge: data.strAwayTeamBadge,
      strStatus: data.strStatus
    }))
  }

  const filterFootballData = (anyData: FootballData[]):FootballData[] => {
    return anyData.filter((item)=> {
      //getting slices of months and days so we can filter to today and onwards.
      const currentYearSlice = currentDate.slice(0,4);
      const itemYearSlice = item.dateEvent.slice(0,4);
      const currentMonthSlice = currentDate.slice(5,7);
      const itemMonthSlice = item.dateEvent.slice(5,7);
      const currentDaySlice = currentDate.slice(8);
      const itemDaySlice = item.dateEvent.slice(8);
      // in order to get dates from today onwards
      if((currentMonthSlice <= itemMonthSlice && currentDaySlice <= itemDaySlice) || (currentYearSlice < itemYearSlice)){
        return item;
      }
    })
  }

  const groupFootballData = (anyData: FootballData[]): FootballData[][] => {
    //okay this is probably a really sloppy way of doing things. But I want and array of array of objects so i can group the matchdays into match weeks
    //so to do this I am going to 
    //1. create an empty array called groupedData
    //2. create a for loop that creates a filtered array based on the gameweek and pushes that array into groupedData

    //console.log("im here with data", anyData) //test
    const groupedData = [];
    //console.log(+anyData[0]?.intRound) //test
    //console.log(+anyData[anyData.length -1]?.intRound) //test
    const startIndex:number = +anyData[0]?.intRound;
    const endIndex:number = +anyData[anyData.length -1]?.intRound; 

    for(let i = startIndex; i <= endIndex; i++){ // we loop thru current matchday till the last matchday available
      //getting an array where all the matches are related by given gameweek
      const gameWeekData = anyData.filter((matchday) => { 
        if(i === +matchday.intRound){
          return matchday;
        }
      })
      groupedData.push(gameWeekData)
    }
    // console.log(typeof groupedData) // test
    return groupedData;
  }

  const cleanedPremData = cleanFootballData(premData)
  const cleanedChampData = cleanFootballData(champData)

  // console.log("cleaned Prem Data", cleanedPremData);
  // console.log("cleaned Champ Data", cleanedChampData);

  const filteredPremData = filterFootballData(cleanedPremData)
  const filteredChampData = filterFootballData(cleanedChampData)

  // console.log("filtered Prem Data", filteredPremData)
  // console.log("filtered Champ Data", filteredChampData)

  const premWeekData = groupFootballData(filteredPremData); 
  const champWeekData = groupFootballData(filteredChampData); 

  //testing without return
  // groupFootballData(filteredPremData)
  // groupFootballData(filteredChampData)

  // console.log("grouped prem Data by week", premWeekData)
  // console.log("grouped champ Data by week", champWeekData)

  return (
    <>
     {champData && premData ?
      <>
        <h1>Live Football Matches</h1>
        <input type="text" placeholder='search CL teams...' />
        <button>Search</button>

        <Carousel heading="Champions League" data={champWeekData}/>

        <input type="text" placeholder='search PL teams...' />
        <button>Search</button>
          
        <Carousel heading="Premier League" data={premWeekData}/>
      </>
      : 
    <p>loading ...</p>
  }
    </>
  )
}

export default App;






