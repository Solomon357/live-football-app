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
    utcDate: data.utcDate,
    lastUpdated: data.lastUpdated,
    season: data.season,
    referees: data.referees,
    stage: data.stage
  }))
}

const groupFixtureData = (anyData: FixtureData[]): FixtureData[][] => {
  const groupedData = [];
  const startIndex: number = anyData[0]?.matchday;
  const endIndex: number = anyData[anyData.length -1]?.matchday; 

  for(let i = startIndex; i <= endIndex; i++){
    //getting an array where all the matches are related by given gameweek
    const dataByGameWeek = anyData.filter((fixture) => { 
      if(i === fixture.matchday){
        return fixture;
      }
    })
    groupedData.push(dataByGameWeek)
  }
  return groupedData;
}

//dealing with displaying playoff/knockout fixtures later
const groupTournamentFixtureData = (anyData: FixtureData[]): FixtureData[][] => {
  const groupedData = [];
  const startIndex: number = anyData[0]?.matchday;
  const endIndex: number = 8; 

  for(let i = startIndex; i <= endIndex; i++){
    const dataByGameWeek = anyData.filter((fixture) => { 
      if(i === fixture.matchday){
        return fixture;
      }
    })
    groupedData.push(dataByGameWeek)
  }
  return groupedData;
}

export const handleFixtureSearch = (anyData: FixtureData[], userInput: string): FixtureData[][] => {
  //console.log("data coming in", anyData) //test

  //edge case: filter out any fixtures that have not been decided yet
  const removedNulls = anyData.filter((data)=> {
    if(data.homeTeam.name && data.awayTeam.name){
      return data;
    }
  })

  const filteredSearchData = removedNulls.filter((userData) => {
    if (userInput.toLowerCase() === userData?.homeTeam.name.toLowerCase() || 
        userInput.toLowerCase() === userData?.awayTeam.name.toLowerCase() || 
        userData?.homeTeam.name.toLowerCase().includes(userInput.toLowerCase()) || 
        userData?.awayTeam.name.toLowerCase().includes(userInput.toLowerCase())  
      ){
      return userData;
    }

  })

  return getPrimedFixtureData(filteredSearchData);
}

export const getPrimedFixtureData = (anyData: FixtureData[]): FixtureData[][] => {
  const cleanFixtures = cleanFixtureData(anyData);

  if(anyData[0]?.competition.code === "CL") {
    return groupTournamentFixtureData(anyData);
  }
  return groupFixtureData(cleanFixtures);
}