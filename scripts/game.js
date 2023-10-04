import getQoute from './qouteAPI'

// eslint-disable-next-line prefer-const
let iteratorWord = 0
let iteratorChar = 0
let wordsTyped = 0
let currentWord
let textArray
let typedCharacterArray = []

// Fetch text, clean text
async function getTextFromApi () {
  // Get the quote from API
  const textData = await getQoute('50')
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
    // If it matches we have typed the word and can go to next word
    if (arrayToString === currentWord) {
      console.log('Correct word')
      iteratorWord++
      iteratorChar = 0
      currentWord = textArray[iteratorWord]
      typedCharacterArray = []
      wordsTyped++
    }
  }
  if (wordsTyped === textArray.length) {
    // If words typed are equal to the length of text array we have finished the race
    console.log('No more words')
    // Run win function
  }
  console.log(typedCharacterArray)
}

function keyboardHandler () {
  document.addEventListener('keydown', keyPressHandler)
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

getTextFromApi().then(() => { displayText() })
keyboardHandler()
