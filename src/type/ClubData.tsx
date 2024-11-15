 export type Team = {
  crest: string,
  shortName: string,
  tla: string,
  id: number
}

export type ClubData = {
  position: number,
  playedGames: number,
  won: number,
  draw: number,
  lost: number,
  goalDifference: number,
  goalsAgainst: number,
  goalsFor: number,
  points: number,
  team: Team,
}

