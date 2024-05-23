import './TicTacToe.css'
import { Fireworks } from 'fireworks-js'

export default function TicTacToe() {
  let board = ['', '', '', '', '', '', '', '', '']
  let currentPlayer = '❌'
  let gameActive = true

  const ticTacToeElement = document.createElement('div')
  ticTacToeElement.classList.add('tic-tac-toe')
  ticTacToeElement.innerHTML = `
  <h1 class="game-title">Tres en Raya</h1>
    <div class="board">
      <div class="row">
        <div class="cell" data-cell-index="0"></div>
        <div class="cell" data-cell-index="1"></div>
        <div class="cell" data-cell-index="2"></div>
      </div>
      <div class="row">
        <div class="cell" data-cell-index="3"></div>
        <div class="cell" data-cell-index="4"></div>
        <div class="cell" data-cell-index="5"></div>
      </div>
      <div class="row">
        <div class="cell" data-cell-index="6"></div>
        <div class="cell" data-cell-index="7"></div>
        <div class="cell" data-cell-index="8"></div>
      </div>
    </div>
    <button class="restart-btn">Reiniciar</button>
    <div class="message">Turno de: ${currentPlayer}</div>
  `

  const cells = ticTacToeElement.querySelectorAll('.cell')
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick)
  })

  const restartButton = ticTacToeElement.querySelector('.restart-btn')
  restartButton.addEventListener('click', restartGame)

  function handleCellClick(event) {
    const cell = event.target
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'))

    if (board[cellIndex] !== '' || !gameActive) return

    board[cellIndex] = currentPlayer
    cell.textContent = currentPlayer

    if (checkWin() || checkDraw()) {
      gameActive = false
      displayMessage(checkWin() ? `${currentPlayer} ha ganado!` : '¡Empate!')
      if (checkWin()) {
        launchFireworks()
      }
      return
    }

    currentPlayer = currentPlayer === '❌' ? '⭕' : '❌'
    displayMessage(`Turno de: ${currentPlayer}`)
  }

  function checkWin() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let condition of winConditions) {
      const [a, b, c] = condition
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true
      }
    }
    return false
  }

  function checkDraw() {
    return !board.includes('')
  }

  function displayMessage(message) {
    const messageElement = document.querySelector('.message')
    messageElement.textContent = message
  }

  function restartGame() {
    board = ['', '', '', '', '', '', '', '', '']
    gameActive = true
    currentPlayer = '❌'
    displayMessage(`Turno de: ${currentPlayer}`)
    cells.forEach((cell) => {
      cell.textContent = ''
    })
  }

  function launchFireworks() {
    const fireworksContainer = document.createElement('div')
    fireworksContainer.style.position = 'fixed'
    fireworksContainer.style.top = '0'
    fireworksContainer.style.left = '0'
    fireworksContainer.style.width = '100%'
    fireworksContainer.style.height = '100%'
    fireworksContainer.style.pointerEvents = 'none'
    document.body.appendChild(fireworksContainer)

    const fireworks = new Fireworks(fireworksContainer, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 150,
      trace: 3,
      explosion: 5,
      boundaries: {
        x: 50,
        y: 50,
        width: fireworksContainer.clientWidth,
        height: fireworksContainer.clientHeight
      },
      sound: {
        enable: true,
        files: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'],
        volume: { min: 4, max: 8 }
      },
      delay: { min: 30, max: 60 },
      brightness: { min: 50, max: 80 },
      decay: { min: 0.015, max: 0.03 },
      mouse: { click: false, move: false, max: 1 }
    })
    fireworks.start()

    setTimeout(() => {
      fireworks.stop()
      document.body.removeChild(fireworksContainer)
    }, 5000)
  }

  return ticTacToeElement
}
