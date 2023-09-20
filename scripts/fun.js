const appDiv = document.querySelector('.app__text');
const mask = document.querySelector('.mouse__mask')
let pElements;

function makeElementToGrid() {
  for (let i = 0; i < 399; i++) {
    const newP = document.createElement('p');
    newP.textContent = 0;
    appDiv.appendChild(newP);
  }
  pElements = document.querySelectorAll('.app__text p');
}

function getRandomChar() {
  const chars = "abcdefghijklmnopqrstuvwxyz"
  return chars[Math.floor(Math.random() * 26)]
}

function randomNumbersLoop() {
  pElements.forEach((element) => {
    element.textContent = getRandomChar()
  });
}

document.addEventListener('mousemove', (e) => {
  mask.style.top = e.pageY - 2500 + "px"
  mask.style.left = e.pageX - 2500  + "px"
  mask.style.animation = 'initial'
  
});

document.addEventListener('mouseout', () => {
  mask.style.top = "calc(50% - 2500px)"
  mask.style.left = "calc(50% - 2500px)"
  mask.style.animation = 'maskSpin 10s infinite linear forwards'
  mask.style.animationDelay = '5s'
})

makeElementToGrid();
randomNumbersLoop()

setInterval(() => {
  randomNumbersLoop()
}, 1000);