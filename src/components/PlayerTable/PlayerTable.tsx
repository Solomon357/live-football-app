import PlayerTableData from "../../type/PlayerData"
import './PlayerTable.scss'

 type PlayerTablePropTypes = {
  tableData: PlayerTableData[]
}

const PlayerTable = ({ tableData }: PlayerTablePropTypes) => {

  return (
    <table className="player-table">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Name</th>
          <th>MP</th>
          <th>Gls</th>
          <th>Assts</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((players, i) => (
          <tr key={players.player.id}>
            <td>{i+1}</td>
            <td><img src={players.team.crest} alt="playerTeam" width={"15px"} height={"15px"} /> {players.player.name}</td>
            <td>{players.playedMatches}</td>
            <td>{players.goals}</td>
            <td>{players.assists ? players.assists : 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PlayerTable