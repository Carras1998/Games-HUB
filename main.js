import './style.css'
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import GamesSection from './components/GamesSection/GamesSection.js'

document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app')
  app.innerHTML = `
    ${Header()}
    ${GamesSection()}
    ${Footer()}
  `
})
