import getQoute from './qouteAPI'
import Timer from './timer'
import { animate } from 'motion'

// eslint-disable-next-line prefer-const
let iteratorWord = 0
let iteratorChar = 0
let wordsTyped = 0
let currentWord
let textArray
let typedCharacterArray = []
const allTypedCharacters = []
let timerInterval
let timer

// Fetch text, clean text
async function getTextFromApi () {
  const textData = 'bent bent bent'
  // Get the quote from API
  // const textData = await getQoute('50')
  // Clean the text for unwanted special characters
  const cleanedText = textCleaner(textData)
  // Make array out of cleaned text
  textArray = cleanedText.split(' ')
  // Makes a space between every word
  for (let i = 1; i < textArray.length; i += 2) {
    textArray.splice(i, 0, ' ')
  }
  currentWord = textArray[iteratorWord]
  console.log(textArray)
}

// Display the text on the screen
function displayText () {
  const textDiv = document.querySelector('#text')
  // Loop over every word in array and make new p elements then append to div
  textArray.forEach((word, index) => {
    const newPElement = document.createElement('p')
    // If the index is not even then it must be whitespace
    if (index % 2 === 0) {
      newPElement.classList.add('word')
    } else {
      // Add class space for whitespace
      newPElement.classList.add('space')
    }
    newPElement.textContent = word
    textDiv.appendChild(newPElement)
  })
}

function keyPressHandler (e) {
  // Get the first character in the current word
  const firstCharInWord = currentWord[iteratorChar]
  if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9 ]/)) {
    // Push the typed character to an array to check later if it matches
    typedCharacterArray.push(e.key)
    // If typed character is not equal to first character in word
    // We dont actually need this if we are to support wrong typed words
    if (e.key !== firstCharInWord) {
      // Trigger wrong feedback to user
      console.log('wrong')
      // Else it must be right character
    } else {
      // Trigger correct feedback to user
      iteratorChar++
      console.log('Correct')
    }
  } else if (e.key === 'Backspace') {
    typedCharacterArray.pop()
  }

  // If this is true we have typed the length of the current word
  if (typedCharacterArray.length === currentWord.length) {
    // Join the characters we have typed to match it with the current word
    const arrayToString = typedCharacterArray.join('')
    // If it matches we have typed the word correct and can go to next word
    if (arrayToString === currentWord) {
      // iterator increases so we get the next word
      iteratorWord++
      // Reset iterator for char so it starts from the start
      iteratorChar = 0
      // current word is now picked from text array with the iterator we just increased
      currentWord = textArray[iteratorWord]
      // Push typed word to an array for all words typed
      allTypedCharacters.push(typedCharacterArray.join(''))
      // Reset typed character array
      typedCharacterArray = []
      // Words typed is increased as we typed the word
      wordsTyped++
    }
  }
  if (wordsTyped === textArray.length) {
    // If words typed are equal to the length of text array we have finished the race
    console.log('No more words')
    // Run win function
    winHandler()
  }
  console.log(typedCharacterArray)
}

function wordsPerMinutesCalculator () {
  function calculateArrayEquality () {
    if (allTypedCharacters.length !== textArray.length) {
      throw new Error('Arrays must have the same length for comparison.')
    }

    const length = allTypedCharacters.length
    let equalCount = 0

    for (let i = 0; i < length; i++) {
      if (allTypedCharacters[i] === textArray[i]) {
        equalCount++
      }
    }

    const percentage = (equalCount / length) * 100
    return percentage
  }
  const timeInSeconds = Math.round(timer.getTime() / 1000)
  const grossWPM = Math.floor((textArray.join(' ').length / 5) / (timeInSeconds / 60))
  const netWPM = 0
  const accuracy = calculateArrayEquality()
  console.log(grossWPM)
  console.log(accuracy)
}

function winHandler () {
  removeKeyboardListener()
  timer.stop()
  clearInterval(timerInterval)
  wordsPerMinutesCalculator()
}

function keyboardHandler () {
  document.addEventListener('keydown', keyPressHandler)
}

function removeKeyboardListener () {
  document.removeEventListener('keydown', keyPressHandler)
}

function textCleaner (text) {
  const corrections = {
    '!': '',
    '?': '',
    '"': '',
    ':': '',
    ';': '',
    '.': '',
    ',': '',
    '\'': '',
    '-': ''
  }
  Object.keys(corrections).forEach(key => {
    text = text.replaceAll(key, corrections[key])
  })
  return text
}

function animationWrong () {
  animate(
    '#time',
    { x: [0, -25, 0, 25, 0, -25, 0, 25, 0], color: ['red', '#808080'] },
    { duration: 0.5 }
  )
}

function startTimer () {
  timer = new Timer()
  timer.start()
  timerInterval = setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000)
    document.getElementById('time').innerText = timeInSeconds
  }, 100)
}

export default function runGame () {
  getTextFromApi().then(() => {
    displayText()
    keyboardHandler()
    startTimer()
  })
}

runGame()
