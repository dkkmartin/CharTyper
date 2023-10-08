import runGame from './game'

export default class Game {
  static removeMenu () {
    const buttonsDiv = document.querySelector('.buttons__con')
    buttonsDiv.style.display = 'none'
  }

  static async startCountdown () {
    const main = document.querySelector('main')
    const newH1 = document.createElement('h1')
    newH1.textContent = 3
    newH1.classList.add('countdown')
    main.appendChild(newH1)
    for (let index = 3; index >= 1; index--) {
      newH1.textContent = index
      await delay(990)
      if (index === 1) {
        newH1.remove()
      }
    }
  }

  static async startGame (length) {
    const highscoreDiv = document.querySelector('.highscore')
    highscoreDiv.remove()
    this.startCountdown()
    await delay(3000)
    const background = document.querySelector('.app__text')
    background.remove()
    runGame(length)
  }
}

function delay (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
