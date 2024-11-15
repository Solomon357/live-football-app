import { Team } from "./ClubData"

type Player = {
  name: string,
  section: string,
  id: number
}

type PlayerData = {
  assists: number | null,
  goals: number,
  penalties: number,
  playedMatches: number,
  player: Player,
  team: Team
}

export default PlayerData;
