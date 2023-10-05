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
  displayHighscore()
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
  Game.startTimer()
  texts = await Game.startGame()
  gameData()
  timer = new Timer()
  startTimer()
  keyboardHandler()
})

async function displayHighscore () {
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
  // Remove
  if (e.key === 'Escape') {
    skip()
  }
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
  spanElement.textContent = ''
  const string = textArray.join('').slice(iterator + 1)
  const newSpan = spanMaker(words)
  spanElement.innerHTML = `${newSpan}` + string
}

function getNewText () {
  spanElement.textContent = textArray.join('')
}

function winHandler () {
  timer.stop()
  clearInterval(timerInterval)
  const winInputDiv = document.querySelector('.user__input')
  const playAgainBtn = document.querySelector('.play__again')
  const timeInSeconds = Math.round(timer.getTime() / 1000)
  const WPM = Math.floor((textArray.join(' ').length / 5) / (timeInSeconds / 60))
  document.getElementById('time').innerText = `WPM: ${WPM}`
  if (WPM <= 60) {
    spanElement.innerText = 'Thats really bad...'
  }
  if (WPM >= 61 && WPM <= 89) {
    spanElement.innerText = 'You can do better...'
  }
  if (WPM >= 90 && WPM <= 110) {
    spanElement.innerText = 'Alright...'
  }
  if (WPM >= 111 && WPM <= 129) {
    spanElement.innerText = 'Thats really good!'
  }
  if (WPM >= 130) {
    spanElement.innerText = 'wow!!!'
  }
  const h2 = document.createElement('h2')
  h2.classList.add('current__highscore')
  if (Cookies.get('WPM')) {
    if (WPM > Cookies.get('WPM')) {
      Cookies.set('WPM', WPM)
      winInputDiv.style.display = 'flex'
      h2.innerHTML = `Your new highscore is: ${Cookies.get('WPM')} WPM`
      document.querySelector('.app').appendChild(h2)
      playAgainBtn.textContent = 'Submit'
      playAgainBtn.addEventListener('click', () => {
        makeNewHighscore(WPM)
      })
    } else {
      h2.innerHTML = `Your highscore is: ${Cookies.get('WPM')} WPM`
      document.querySelector('.app').appendChild(h2)
      winInputDiv.style.display = 'flex'
      document.querySelector('.user__input label').remove()
      playAgainBtn.addEventListener('click', () => {
        location.reload()
      })
    }
  } else {
    Cookies.set('WPM', WPM)
    h2.innerHTML = `Your highscore is: ${Cookies.get('WPM')} WPM`
    document.querySelector('.app').appendChild(h2)
    winInputDiv.style.display = 'flex'
    playAgainBtn.addEventListener('click', () => {
      makeNewHighscore(WPM)
    })
  }
}

// Remove
function skip () {
  const winInputDiv = document.querySelector('.user__input')
  const playAgainBtn = document.querySelector('.play__again')
  winInputDiv.style.display = 'flex'
  timer.stop()
  clearInterval(timerInterval)
  removeKeyboardListener()
  playAgainBtn.addEventListener('click', () => {
    makeNewHighscore()
  })
}
function makeNewHighscore (score) {
  const userInput = document.querySelector('.user__input input')
  const inputValue = userInput.value.trim().toLowerCase()
  if (!inputValue.trim()) {
    // If input is empty just refresh the page
    location.reload()
  } else {
    // If input not empty push name and score to DB then refresh the page
    const postData = {
      name: inputValue,
      score,
      id: Cookies.get('ID')
    }
    postDataToDB(postData)
      .then(() => {
        location.reload()
      })
  }
}

function startTimer () {
  timer.start()
  timerInterval = setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000)
    document.getElementById('time').innerText = timeInSeconds
  }, 100)
}
