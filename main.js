import './style.css'
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import GamesSection from './components/GamesSection/GamesSection.js'
import TicTacToe from './components/TicTacToe/TicTacToe.js'
import Bingo from './components/Bingo/Bingo.js'
import RockPaperScissors from './components/RockPaperScissors/RockPaperScissors.js'

document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${Header()}
    ${GamesSection()}
    ${Footer()}
  `

  const ticTacToeElement = document.querySelector('#games-section')
  ticTacToeElement.append(TicTacToe())
  const rockPaperScissorsElement = document.querySelector('#games-section')
  rockPaperScissorsElement.append(RockPaperScissors())
  const bingoElement = document.querySelector('#games-section')
  bingoElement.append(Bingo())
})
