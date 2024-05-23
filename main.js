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
    <div id="main-content">
      ${GamesSection()}
    </div>
    ${Footer()}
  `

  document
    .getElementById('ticTacToeBtn')
    .addEventListener('click', () => loadGame('TicTacToe'))
  document
    .getElementById('rockPaperScissorsBtn')
    .addEventListener('click', () => loadGame('RockPaperScissors'))
  document
    .getElementById('bingoBtn')
    .addEventListener('click', () => loadGame('Bingo'))
})

function loadGame(game) {
  const mainContent = document.getElementById('main-content')
  mainContent.innerHTML = `
    <button id="backBtn">Regresar al inicio</button>
  `

  document.getElementById('backBtn').addEventListener('click', () => {
    mainContent.innerHTML = GamesSection()
    document
      .getElementById('ticTacToeBtn')
      .addEventListener('click', () => loadGame('TicTacToe'))
    document
      .getElementById('rockPaperScissorsBtn')
      .addEventListener('click', () => loadGame('RockPaperScissors'))
    document
      .getElementById('bingoBtn')
      .addEventListener('click', () => loadGame('Bingo'))
  })

  switch (game) {
    case 'TicTacToe':
      mainContent.append(TicTacToe())
      break
    case 'RockPaperScissors':
      mainContent.append(RockPaperScissors())
      break
    case 'Bingo':
      mainContent.append(Bingo())
      break
  }
}
