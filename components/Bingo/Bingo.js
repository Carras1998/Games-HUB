import './Bingo.css'

export default function Bingo() {
  let numbers = Array.from({ length: 99 }, (_, i) => i + 1)
  let currentNumber = null
  let intervalId = null

  const bingoElement = document.createElement('div')
  bingoElement.id = 'bingo'
  bingoElement.innerHTML = `
  <h1 class="game-title">Bingo</h1>
    <p id="current-number">${currentNumber}</p>
    <button id="start">Iniciar</button>
    <button id="pause">Pausar</button>
    <button id="reset">Reiniciar</button>
    <div id="number-list" class="number-list">
      ${numbers
        .map(
          (number) =>
            `<span class="number" id="number-${number}">${number}</span>`
        )
        .join('')}
    </div>
  `

  bingoElement.querySelector('#start').addEventListener('click', startGame)
  bingoElement.querySelector('#pause').addEventListener('click', pauseGame)
  bingoElement.querySelector('#reset').addEventListener('click', resetGame)

  function startGame() {
    if (intervalId) return // No iniciar si ya está corriendo
    intervalId = setInterval(() => {
      if (numbers.length === 0) {
        clearInterval(intervalId)
        intervalId = null
        return
      }
      let randomIndex = Math.floor(Math.random() * numbers.length)
      currentNumber = numbers[randomIndex]
      numbers.splice(randomIndex, 1)
      updateGame()
      speakNumber(currentNumber)
    }, 3000)
  }

  function pauseGame() {
    clearInterval(intervalId)
    intervalId = null
  }

  function resetGame() {
    clearInterval(intervalId)
    intervalId = null
    numbers = Array.from({ length: 99 }, (_, i) => i + 1)
    currentNumber = null
    document.getElementById('current-number').textContent = ''
    document.querySelectorAll('.number').forEach((numberElement) => {
      numberElement.classList.remove('marked')
    })
    updateNumberList()
  }

  function updateGame() {
    document.getElementById('current-number').textContent = currentNumber
    document.getElementById(`number-${currentNumber}`).classList.add('marked')
  }

  function speakNumber(number) {
    const utterance = new SpeechSynthesisUtterance(number.toString())
    speechSynthesis.speak(utterance)
  }

  function updateNumberList() {
    document.getElementById('number-list').innerHTML = numbers
      .map(
        (number) =>
          `<span class="number" id="number-${number}">${number}</span>`
      )
      .join('')
  }

  return bingoElement
}
