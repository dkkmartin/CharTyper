import Game from './startGame.js'
import getScoresFromDB from './getUserScores.js'
import Spinner from './spinner.js'
import Cookies from 'js-cookie'
import { animations, animationsAfterAwait } from './animations.js'
import { loggedInBar } from './loginBar.js'

const highscore = document.querySelector('.highscore')
const startGameBtn = document.querySelector('.play')
const lengthSelector = document.querySelector('#select__length')
const isReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)') === true ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true

window.onload = async () => {
  // Check if user is logged in, then do login bar stuff
  loggedInBar()
  // If not true run animations
  if (!isReduced) {
    animations()
  } else {
    // Else No animations, and set highscore div opacity to 1
    highscore.style.opacity = '1'
  }
  const spinner = new Spinner()
  spinner.start('ring-highscore')
  await displayHighscores()
  if (!isReduced) {
    animationsAfterAwait()
  }
  spinner.stop('ring-highscore')
}

startGameBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  Game.startGame(lengthSelector.value)
})

async function displayHighscores() {
  const data = await getScoresFromDB()
  try {
    let iterator = 1
    data.forEach((user) => {
      const newDiv = document.createElement('div')
      newDiv.classList.add('user')
      newDiv.classList.add(`user__${iterator}`)
      if (!user.expand) {
        return
      }
      iterator++
      newDiv.innerHTML = `
    <p>${user.expand.user.username}</p>
    <p>${user.netWPM}</p>
   `
      highscore.appendChild(newDiv)
    })
  } catch (error) {
    console.error(error)
  }
}
