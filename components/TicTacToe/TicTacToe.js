import './TicTacToe.css'

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

  return ticTacToeElement
}
