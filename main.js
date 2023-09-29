import Game from './scripts/startGame.js'
import getScoresFromDB from './scripts/getUserScores.js'
import Timer from './scripts/timer.js'
import Spinner from './scripts/spinner.js'
import { animate } from 'motion'

const highscore = document.querySelector('.highscore')
const pElement = document.querySelector('span')
const startGameBtn = document.querySelector('.play')
const keyChecker = (key, char) => key === char
const winChecker = () => words.length === textArray.join('').length
const words = []
let currentChar
let iterator = 0
let timerInterval
let textArray
let texts
let timer

window.onload = async () => {
  const spinner = new Spinner()
  makeHighscore()
  spinner.stop()
}

startGameBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  Game.removeMenu()
  Game.startTimer()
  texts = await Game.startGame()
  gameData()
  timer = new Timer()
  startTimer()
  keyboardHandler()
})

function animationWrong () {
  animate(
    '#time',
    { x: [0, -25, 0, 25, 0, -25, 0, 25, 0], color: ['red', '#808080'] },
    { duration: 0.5 }
  )
}

async function makeHighscore () {
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

function gameData () {
  textArray = Array.from(texts)
  currentChar = textArray[iterator]
  getNewText()
}

function handleKeyPress (e) {
  if (keyChecker(e.key, currentChar)) {
    wordHandler()
    iterator++
    currentChar = textArray[iterator]
  } else if (e.key !== 'Shift') {
    animationWrong()
  }
  if (winChecker()) {
    removeKeyboardListener()
    winHandler()
  }
}

function keyboardHandler () {
  document.addEventListener('keydown', handleKeyPress)
}

function removeKeyboardListener () {
  document.removeEventListener('keydown', handleKeyPress)
}

function spanMaker (words) {
  const string = words.join('')
  const newSpan = `<span class="currentChar">${string}</span>`
  return newSpan
}

function wordHandler () {
  words.push(currentChar)
  pElement.textContent = ''
  const string = textArray.join('').slice(iterator + 1)
  const newSpan = spanMaker(words)
  pElement.innerHTML = `${newSpan}` + string
}

function getNewText () {
  pElement.textContent = textArray.join('')
}

function winHandler () {
  timer.stop()
  clearInterval(timerInterval)
  const timeInSeconds = Math.round(timer.getTime() / 1000)
  const WPM = Math.floor((textArray.join(' ').length / 5) / (timeInSeconds / 60))
  document.getElementById('time').innerText = `WPM: ${WPM}`
  if (WPM <= 60) {
    pElement.innerText = 'Thats really bad...'
  }
  if (WPM >= 61 && WPM <= 89) {
    pElement.innerText = 'You can do better...'
  }
  if (WPM >= 90 && WPM <= 110) {
    pElement.innerText = 'Alright...'
  }
  if (WPM >= 111 && WPM <= 129) {
    pElement.innerText = 'Thats really good!'
  }
  if (WPM >= 130) {
    pElement.innerText = 'wow!!!'
  }
}

function startTimer () {
  timer.start()
  timerInterval = setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000)
    document.getElementById('time').innerText = timeInSeconds
  }, 100)
}
