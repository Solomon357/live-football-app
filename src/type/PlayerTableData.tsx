import { Team } from "./ClubTableData"

type Player = {
  name: string,
  section: string,
  id: number
}

type PlayerTableData = {
  assists: number | null,
  goals: number,
  penalties: number,
  playedMatches: number,
  player: Player,
  team: Team
}

export default PlayerTableData
