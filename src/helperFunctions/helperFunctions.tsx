import FixtureData from "../type/FixtureData"

const cleanFixtureData = (anyData: FixtureData[]): FixtureData[] => {
  return anyData.map((data) => ({
    area: data.area,
    awayTeam: data.awayTeam,
    homeTeam: data.homeTeam,
    competition: data.competition,
    id: data.id,
    matchday: data.matchday,
    score: data.score,
    status: data.status,
    utcDate: data.utcDate
  }))
}

const groupFixtureData = (anyData: FixtureData[]): FixtureData[][] => {
  // console.log("im here with data", anyData) //test
  const groupedData = [];
  const startIndex:number = anyData[0]?.matchday;
  const endIndex:number = anyData[anyData.length -1]?.matchday; 

  for(let i = startIndex; i <= endIndex; i++){
    //getting an array where all the matches are related by given gameweek
    const gameWeekData = anyData.filter((fixture) => { 
      if(i === fixture.matchday){
        return fixture;
      }
    })
    groupedData.push(gameWeekData)
  }
  return groupedData;
}

export const handleFixtureSearch = (anyData: FixtureData[], userInput: string) => {
  return anyData.filter((userData) => {
    if (userInput.toLowerCase() === userData?.homeTeam.name.toLowerCase() || 
        userInput.toLowerCase() === userData?.awayTeam.name.toLowerCase() || 
        userData?.homeTeam.name.toLowerCase().includes(userInput.toLowerCase()) || 
        userData?.awayTeam.name.toLowerCase().includes(userInput.toLowerCase())  
      ){
      return userData;
    }
  })
}

export const getPrimedFixtureData = (anyData: FixtureData[]): FixtureData[][] => {
  const cleanFixtures = cleanFixtureData(anyData);
  return groupFixtureData(cleanFixtures)
}