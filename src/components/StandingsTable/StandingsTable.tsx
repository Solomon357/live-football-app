import { ClubData } from '../../type/ClubData'
import './StandingsTable.scss'

type ClubTablePropTypes = {
  tableData: ClubData[]
}

const StandingsTable = ({ tableData }: ClubTablePropTypes) => {

  return (
    <table className='table-container'>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Club</th>
          <th>PL</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((clubs) => (
          <tr key={clubs.team.id} className='table-row'>
            <td>{clubs.position}</td>
            <td><img src={clubs.team.crest} alt="teamBadge" width={"15px"} height={"15px"} /> {clubs.team.shortName}</td>
            <td>{clubs.playedGames}</td>
            <td>{clubs.won}</td>
            <td>{clubs.draw}</td>
            <td>{clubs.lost}</td>
            <td>{clubs.goalsFor}</td>
            <td>{clubs.goalsAgainst}</td>
            <td>{clubs.goalDifference}</td>
            <td className='points-data'>{clubs.points}</td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

export default StandingsTable;