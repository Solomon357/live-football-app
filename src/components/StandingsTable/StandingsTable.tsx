import { ClubTableData } from "../../type/ClubTableData"
import './StandingsTable.scss'

type ClubTablePropTypes = {
  tableData: ClubTableData[]
}

const StandingsTable = ({ tableData }: ClubTablePropTypes) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Club</th>
          <th>Played</th>
          <th>Won</th>
          <th>Drawn</th>
          <th>Lost</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((clubs) => (
          <tr key={clubs.team.id}>
            <td>{clubs.position}</td>
            <td><img src={clubs.team.crest} alt="teamBadge" width={"15px"} height={"15px"} /> {clubs.team.shortName}</td>
            <td>{clubs.playedGames}</td>
            <td>{clubs.win}</td>
            <td>{clubs.draw}</td>
            <td>{clubs.lost}</td>
            <td>{clubs.goalsFor}</td>
            <td>{clubs.goalsAgainst}</td>
            <td>{clubs.goalDifference}</td>
            <td>{clubs.points}</td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

export default StandingsTable