import runGame from './game'
import getQoute from './qouteAPI'

export default class Game {
  static removeMenu() {
    const buttonsDiv = document.querySelector('.buttons__con')
    buttonsDiv.style.display = 'none'
  }

  static removeHighscore() {
    const highscoreDiv = document.querySelector('.highscore')
    highscoreDiv.remove()
  }

  static removeBackground() {
    const background = document.querySelector('.background_animation')
    background.remove()
  }

  static setGameMenu() {
    const main = document.querySelector('main')
    const mainHtml = main.innerHTML
    main.innerHTML = mainHtml
  }

  static async startCountdown() {
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

  static async startGame(length) {
    const textData = await getQoute(length)
    this.removeMenu()
    this.removeHighscore()
    this.startCountdown()
    await delay(3000)
    this.removeBackground()
    runGame(textData)
  }
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
