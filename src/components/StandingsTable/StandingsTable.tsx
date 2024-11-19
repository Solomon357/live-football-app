import { ClubData } from '../../type/ClubData'
import './StandingsTable.scss'

type ClubTablePropTypes = {
  tableData: ClubData[]
}

const StandingsTable = ({ tableData }: ClubTablePropTypes) => {

  return (
    <table className='table-container'>
      <caption className='table-header'>24/25 Season</caption>
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
            <td>
              <div className='table-column'>
                <img src={clubs.team.crest} alt="teamBadge" width={"20px"} height={"20px"} />
                <span>{clubs.team.shortName}</span>
              </div>
            </td>
            <td>{clubs.playedGames}</td>
            <td>{clubs.won}</td>
            <td>{clubs.draw}</td>
            <td>{clubs.lost}</td>
            <td>{clubs.goalsFor}</td>
            <td>{clubs.goalsAgainst}</td>
            <td>
              {clubs.goalDifference > 0 ?
                <span style={{color:"lightgreen"}}>+{clubs.goalDifference}</span>
              : clubs.goalDifference === 0 ?
                <span>{clubs.goalDifference}</span>
              :
                <span style={{color:"red"}}>{clubs.goalDifference}</span>
              }
              </td>
            <td className='points-data'>{clubs.points}</td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

export default StandingsTable;