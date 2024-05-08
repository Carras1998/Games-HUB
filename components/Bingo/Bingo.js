import './Bingo.css'

export default function Bingo() {
  let numbers = Array.from({ length: 100 }, (_, i) => i + 1)
  let currentNumber = null
  let intervalId = null

  const bingoElement = document.createElement('div')
  bingoElement.id = 'bingo'
  bingoElement.innerHTML = `
    <p id="current-number">${currentNumber}</p>
    <button id="start">Iniciar</button>
    <button id="pause">Pausar</button>
  `

  bingoElement.querySelector('#start').addEventListener('click', startGame)
  bingoElement.querySelector('#pause').addEventListener('click', pauseGame)

  function startGame() {
    intervalId = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * numbers.length)
      currentNumber = numbers[randomIndex]
      numbers.splice(randomIndex, 1)
      updateGame()
    }, 2000)
  }

  function pauseGame() {
    clearInterval(intervalId)
  }

  function updateGame() {
    document.getElementById('current-number').textContent = currentNumber
  }

  return bingoElement.outerHTML
}
