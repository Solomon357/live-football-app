import FootballData from "../type/FootballData"

export const cleanFootballData = (anyData: FootballData[]): FootballData[] => {
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

export const filterFootballData = (anyData: FootballData[]):FootballData[] => {
  const currentDate: string = new Date().toISOString().slice(0, 10) // gets current date in format YYYY-MM-DD
  return anyData.filter((item)=> {
    //comparing dates using the Date constructor
    const present = new Date(currentDate)
    const currentMatchDate = new Date(item.dateEvent)

    if(currentMatchDate.getTime() > present.getTime()){
      return item;
    }
  })
}

export const groupFootballData = (anyData: FootballData[]): FootballData[][] => {
  //okay this is probably a really sloppy way of doing things. But I want and array of array of objects so i can group the matchdays into match weeks
  //so to do this I am going to 
  //1. create an empty array called groupedData
  //2. create a for loop that creates a filtered array based on the gameweek and pushes that array into groupedData

  console.log("im here with data", anyData) //test
  const groupedData = [];
  // console.log(+anyData[0]?.intRound) //test
  // console.log(+anyData[anyData.length -1]?.intRound) //test
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
