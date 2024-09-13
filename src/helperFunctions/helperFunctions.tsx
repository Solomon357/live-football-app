import FootballData from "../type/FootballData"

const cleanFootballData = (anyData: FootballData[]): FootballData[] => {
  return anyData.map((data) => ({
    idEvent: data.idEvent,
    idVenue: data.idVenue,
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

export const getFilteredFootballData = (anyData: FootballData[]):FootballData[] => {

  const cleanData = cleanFootballData(anyData)
  const currentDate: string = new Date().toISOString().slice(0, 10)

  return cleanData.filter((item)=> {

    const present = new Date(currentDate)
    const currentMatchDate = new Date(item.dateEvent)

    if(currentMatchDate.getTime() > present.getTime()){
      return item;
    }
  })
}

const groupFootballData = (anyData: FootballData[]): FootballData[][] => {
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


export const handleFootballSearch = (anyData: FootballData[], userInput: string) => {
  return anyData.filter((userData) => {
    if (userInput.toLowerCase() === userData?.strHomeTeam.toLowerCase() || 
        userInput.toLowerCase() === userData?.strAwayTeam.toLowerCase() || 
        userData?.strHomeTeam.toLowerCase().includes(userInput.toLowerCase()) 
      ){
      return userData;
    }
  })
}

export const getPrimedFootballData = (anyData: FootballData[]): FootballData[][] => {
  const filterAnyData = getFilteredFootballData(anyData)
  const groupAnyData = groupFootballData(filterAnyData)

  return groupAnyData;
}