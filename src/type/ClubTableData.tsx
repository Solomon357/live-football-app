 export type Team = {
  crest: string,
  shortName: string,
  tla: string,
  id: number
}

export type ClubTableData = {
  position: number,
  playedGames: number,
  win: number,
  draw: number,
  lost: number,
  goalDifference: number,
  goalsAgainst: number,
  goalsFor: number,
  points: number,
  team: Team,
}

