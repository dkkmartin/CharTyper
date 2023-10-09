import Game from './scripts/startGame.js'
import getScoresFromDB from './scripts/getUserScores.js'
import Spinner from './scripts/spinner.js'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import anime from 'animejs'

const highscore = document.querySelector('.highscore')
const startGameBtn = document.querySelector('.play')
const lengthSelector = document.querySelector('#select__length')

const textWrapper = document.querySelector('.ml11 .letters')
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")

anime.timeline({ loop: false })
  .add({
    targets: '.ml11 .line',
    scaleY: [0, 1],
    opacity: [0.5, 1],
    easing: 'easeOutExpo',
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: 'easeOutExpo',
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i + 1)
  }).add({
    targets: '.line1',
    opacity: 0,
    duration: 1000,
    easing: 'easeOutExpo'
  })

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
