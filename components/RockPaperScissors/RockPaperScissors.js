import './RockPaperScissors.css'

export default function RockPaperScissors() {
  let choices = ['💎', '🧻', '✂']
  let userChoice = ''
  let cpuChoice = ''
  let result = ''

  const rockPaperScissorsElement = document.createElement('div')
  rockPaperScissorsElement.id = 'rock-paper-scissors'
  rockPaperScissorsElement.innerHTML = `
  <h1 class="game-title">Piedra Papel Tijeras</h1>
    <p id="user-choice">Elección del usuario: ${userChoice}</p>
    <p id="cpu-choice">Elección de la CPU: ${cpuChoice}</p>
    <p id="result">Resultado: ${result}</p>
    <button id="rock">💎</button>
    <button id="paper">🧻</button>
    <button id="scissors">✂</button>
  `

  rockPaperScissorsElement
    .querySelector('#rock')
    .addEventListener('click', () => handleUserChoice('💎'))
  rockPaperScissorsElement
    .querySelector('#paper')
    .addEventListener('click', () => handleUserChoice('🧻'))
  rockPaperScissorsElement
    .querySelector('#scissors')
    .addEventListener('click', () => handleUserChoice('✂'))

  function handleUserChoice(choice) {
    userChoice = choice
    cpuChoice = choices[Math.floor(Math.random() * choices.length)]
    result = determineWinner(userChoice, cpuChoice)
    updateGame()
  }

  function determineWinner(user, cpu) {
    if (user === cpu) {
      return '¡Empate!'
    } else if (
      (user === '💎' && cpu === '✂') ||
      (user === '🧻' && cpu === '💎') ||
      (user === '✂' && cpu === '🧻')
    ) {
      return '¡Has ganado!'
    } else {
      return 'La CPU ha ganado'
    }
  }

  function updateGame() {
    document.getElementById('user-choice').textContent =
      'Elección del usuario: ' + userChoice
    document.getElementById('cpu-choice').textContent =
      'Elección de la CPU: ' + cpuChoice
    document.getElementById('result').textContent = 'Resultado: ' + result
  }

  return rockPaperScissorsElement
}
