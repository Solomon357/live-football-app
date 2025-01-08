type Season = {
    id: number,
    startDate: string,
    endDate: string,
    currentMatchday: number
}

type Area = {
    code: string,
    flag: string,
    id: number,
    name: string
}

type TeamInfo = {
    crest: string,
    id: number,
    name: string,
    shortName: string,
    tla: string
}

type Competition = {
    code: string,
    emblem: string,
    id: number,
    name: string,
}

type Score = {
    duration: string,
    fullTime: {home: number | null, away: number | null},
    halfTime: {home: number | null, away: number | null},
    winner: string | null
}

type Referee = {
    id: number,
    name: string,
    type: string,
    nationality: string,
}

type FixtureData = {
    area: Area,
    awayTeam: TeamInfo,
    homeTeam: TeamInfo,
    competition: Competition,
    id: number,
    matchday: number,
    score: Score,
    status: string,
    utcDate: string,
    lastUpdated: string,
    season: Season,
    referees: Referee[],
    stage: string
}

export default FixtureData;
