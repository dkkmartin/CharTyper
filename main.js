import Game from './scripts/startGame.js';

const pElement = document.querySelector('span');
const startGameBtn = document.querySelector('.play')
const keyChecker = (key, char) => key === char;
const winChecker = () => words.length === textArray.join('').length
const words = []
let currentChar,
  iterator = 0,
  timerInterval,
  textArray,
  texts,
  timer

startGameBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  Game.removeMenu()
  Game.startTimer()
  texts = await Game.startGame()
  gameData()
  timer = new Timer();
  startTimer() 
  keyboardHandler()
})

class Timer {
  constructor () {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }

  _getTimeElapsedSinceLastStart () {
    if (!this.startTime) {
      return 0;
    }
  
    return Date.now() - this.startTime;
  }

  start () {
    if (this.isRunning) {
      return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop () {
    if (!this.isRunning) {
      return console.error('Timer is already stopped');
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset () {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime () {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  }
}

function gameData() {
  textArray = Array.from(texts)
  currentChar = textArray[iterator];
  getNewText()
}

function keyboardHandler() {
  document.addEventListener('keydown', (e) => {
    if (keyChecker(e.key, currentChar)) {
      wordHandler()
      iterator++
      currentChar = textArray[iterator];
    }
    if(winChecker()) {
      winHandler()
    }
  });
}

function wordPerMinuteHandler() {
  const string = words.join('')
  console.log(string.length)
}

function spanMaker(words) {
    const string = words.join('')
    const newSpan = `<span class="currentChar">${string}</span>`
    return newSpan
}

function wordHandler() {
  words.push(currentChar)
  pElement.textContent = ''
  const string = textArray.join('').slice(iterator + 1)
  const newSpan = spanMaker(words)
  pElement.innerHTML = `${newSpan}` + string
}

function getNewText() {
  pElement.textContent = textArray.join('')
}

function winHandler() {
  timer.stop()
  clearInterval(timerInterval)
  const timeInSeconds = Math.round(timer.getTime() / 1000)
  const WPM = Math.floor((textArray.join(' ').length / 5) / (timeInSeconds / 60))
  document.getElementById('time').innerText = `WPM: ${WPM}`;
  if(WPM <= 60) {
    pElement.innerText = "Thats really bad..."
  }
  if(WPM >= 61 && WPM <= 89) {
    pElement.innerText = "You can do better..."
  }
  if(WPM >= 90 && WPM <= 110) {
    pElement.innerText = "Alright..."
  }
  if(WPM >= 111 && WPM <= 129) {
    pElement.innerText = "Thats really good!"
  }
  if(WPM >= 130) {
    pElement.innerText = "wow!!!"
  }
}

function startTimer() {
  timer.start()
  timerInterval = setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000);
    document.getElementById('time').innerText = timeInSeconds;
  }, 100) 
}