import quoteAPI from './qouteAPI'

export default class Game {
  static removeMenu() {
    const buttonsDiv = document.querySelector('.buttons__con')
    buttonsDiv.style.display = 'none'
  }

  static async startTimer() {
    const main = document.querySelector('main')
    const newH1 = document.createElement('h1')
    newH1.textContent = 5
    newH1.classList.add('countdown')
    main.appendChild(newH1)
    for (let index = 5; index >= 1; index--) {
      newH1.textContent = index
      await delay(990)
      if(index === 1) {
        newH1.remove()
      }
    }
  }

  static async startGame() {
    await delay(5000)
    const select = document.querySelector('select')
    const qoute = await quoteAPI(select.value)  
    const gameDiv = document.querySelector('.app')
    const background = document.querySelector('.app__text')
    background.remove()
    gameDiv.style.display = 'flex'
    return qoute
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}