import Game from './startGame.js'
import getScoresFromDB from './getUserScores.js'
import Spinner from './spinner.js'
import Cookies from 'js-cookie'
import { animations, animationsAfterAwait } from './animations.js'
import { v4 as uuidv4 } from 'uuid'

const highscore = document.querySelector('.highscore')
const startGameBtn = document.querySelector('.play')
const lengthSelector = document.querySelector('#select__length')
const isReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)') === true ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true

window.onload = async () => {
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

async function displayHighscores() {
  const data = await getScoresFromDB()
  console.log(data)
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
