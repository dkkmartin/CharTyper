import Game from './scripts/startGame.js'
import getScoresFromDB from './scripts/getUserScores.js'
import Spinner from './scripts/spinner.js'
import Cookies from 'js-cookie'
import { animations, animationsAfterAwait } from './scripts/animations.js'
import { v4 as uuidv4 } from 'uuid'

const highscore = document.querySelector('.highscore')
const startGameBtn = document.querySelector('.play')
const lengthSelector = document.querySelector('#select__length')

window.onload = async () => {
  animations()
  const spinner = new Spinner()
  await displayHighscores()
  animationsAfterAwait()
  spinner.stop()
  console.log(Cookies.get())
  // If user doesn't have a ID, make one
  if (!Cookies.get('ID')) {
    const uniqueId = uuidv4()
    Cookies.set('ID', uniqueId)
  }
}

startGameBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  Game.removeMenu()
  Game.startGame(lengthSelector.value)
})

async function displayHighscores () {
  const data = Array.from(await getScoresFromDB())
  data.sort((a, b) => b.score - a.score)
  data.forEach((element, index) => {
    const newDiv = document.createElement('div')
    newDiv.classList.add('user')
    newDiv.classList.add(`user__${index + 1}`)
    newDiv.innerHTML = `
    <p>${element.name}</p>
    <p>${element.score}</p>
   `
    highscore.appendChild(newDiv)
  })
}
