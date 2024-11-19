import PlayerTableData from "../../type/PlayerData"
import './PlayerTable.scss'

 type PlayerTablePropTypes = {
  tableData: PlayerTableData[]
}

const PlayerTable = ({ tableData }: PlayerTablePropTypes) => {

  return (
    <table className="player-table">
      <caption className='table-header'> Top Scorers</caption>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Player</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>MP</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((players, i) => (
          <tr key={players.player.id}>
            <td>{i+1}</td>
            <td>
              <div className='table-column'>
                <img src={players.team.crest} alt="playerTeam" width={"20px"} height={"20px"} /> 
                <span>{players.player.name}</span>
              </div>
            </td>
            <td>{players.goals}</td>
            <td>{players.assists ? players.assists : 0}</td>
            <td>{players.playedMatches}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PlayerTable