import TicTacToe from '../TicTacToe/TicTacToe'
import RockPaperScissors from '../RockPaperScissors/RockPaperScissors'
import Bingo from '../Bingo/Bingo'

export default function GamesSection() {
  return `
    <div id="games-section">
      ${TicTacToe()}
      ${RockPaperScissors()}
      ${Bingo()}
    </div>
  `
}
