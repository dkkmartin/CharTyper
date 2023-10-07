import Game from './scripts/startGame.js'
import getScoresFromDB from './scripts/getUserScores.js'
import Timer from './scripts/timer.js'
import Spinner from './scripts/spinner.js'
import postDataToDB from './scripts/makeNewUserScore.js'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

const highscore = document.querySelector('.highscore')
const spanElement = document.querySelector('span')
const startGameBtn = document.querySelector('.play')

window.onload = async () => {
  const spinner = new Spinner()
  displayHighscores()
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

  startTimer()
  keyboardHandler()
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
