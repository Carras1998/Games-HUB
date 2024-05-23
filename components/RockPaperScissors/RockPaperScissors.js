import './RockPaperScissors.css'
import { Fireworks } from 'fireworks-js'

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
    if (result === '¡Has ganado!') {
      launchFireworks()
    }
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

  return rockPaperScissorsElement
}
