import getQoute from './qouteAPI'
import Timer from './timer'
import anime from 'animejs/lib/anime.es.js'

// eslint-disable-next-line prefer-const
let iteratorWord = 0
// eslint-disable-next-line prefer-const
let iteratorChar = 0
// eslint-disable-next-line prefer-const
let wordsTyped = 0
// eslint-disable-next-line prefer-const
let errorsByUser = 0
// eslint-disable-next-line prefer-const
let currentWord
// eslint-disable-next-line prefer-const
let textArray
// eslint-disable-next-line prefer-const
let typedCharacterArray = []
// eslint-disable-next-line prefer-const
let allTypedCharacters = []
// eslint-disable-next-line prefer-const
let timerInterval, statisticInterval
// eslint-disable-next-line prefer-const
let timer
// eslint-disable-next-line prefer-const
let hasItRunOnce = false

// Fetch text, clean text
async function getTextFromApi () {
  // Get the quote from API
  const textData = await getQoute('50')
  // Clean the text for unwanted special characters
  const cleanedText = textCleaner(textData)
  // Make array out of cleaned text
  textArray = cleanedText.split(' ')
  // Add whitespace after every word in the index
  const spacedTextArray = addWhitespaceAtEnd(textArray)
  textArray = spacedTextArray
  currentWord = textArray[iteratorWord]
}

// Display the text on the screen
function displayText () {
  const textDiv = document.querySelector('#text')
  // Loop over every word in array and make new p elements then append to div
  textArray.forEach((word, index) => {
    const newPElement = document.createElement('div')
    newPElement.classList.add('word')
    newPElement.textContent = word
    textDiv.appendChild(newPElement)
  })
}

function addWhitespaceAtEnd (inputArray) {
  const resultArray = inputArray.map((item, index) => (index < inputArray.length - 1) ? item + ' ' : item)
  return resultArray
}

function keyPressHandler (e) {
  // Check if the input element is currently focused
  const inputElement = document.querySelector('#word__input')
  if (document.activeElement !== inputElement) {
    return
  }

  // Get the first character in the current word
  const firstCharInWord = currentWord[iteratorChar]

  if (e.key.length === 1) {
    // Push the typed character to an array to check later if it matches
    typedCharacterArray.push(e.key)
    // Push all typed characters to compare equality later
    allTypedCharacters.push(e.key)
    // If typed character is not equal to first character in word
    // We dont actually need this if we are to support wrong typed words
    if (e.key !== firstCharInWord) {
      errorsByUser++
      // Else it must be right character
      characterHighlighterWrong()
      iteratorChar++
    } else {
      // Trigger correct feedback to user
      characterHighlighterCorrect()
      iteratorChar++
    }
  } else if (e.key === 'Backspace') {
    if (!iteratorChar < 1) {
      iteratorChar--
    }
    undoCharacterHighlight()
    typedCharacterArray.pop()
  }

  // If this is true we have typed the length of the current word
  if (typedCharacterArray.length === currentWord.length) {
    // Join the characters we have typed to match it with the current word
    const arrayToString = typedCharacterArray.join('')
    // If it matches we have typed the word correct and can go to next word
    if (arrayToString === currentWord) {
      hasItRunOnce = false
      // iterator increases so we get the next word
      iteratorWord++
      // Reset iterator for char so it starts from the start
      iteratorChar = 0
      // current word is now picked from text array with the iterator we just increased
      currentWord = textArray[iteratorWord]
      const typedWord = allTypedCharacters.join('')
      allTypedCharacters = []
      allTypedCharacters.push(typedWord)
      // Reset typed character array
      typedCharacterArray = []
      // Words typed is increased as we typed the word
      wordsTyped++
      // Reset input
      wordInputHandler()
    }
  }
  if (wordsTyped === textArray.length) {
    // If words typed are equal to the length of text array we have finished the race
    // Run win function
    winHandler()
  }
  if (!hasItRunOnce) {
    wordHighlighter()
    characterElementMaker()
    hasItRunOnce = true
  }
}

function statisticCalculator () {
  // Calculate accuracy with lavenshtein distance algorithm
  function calculateStringSimilarity (string1, string2) {
    function levenshteinDistance (str1, str2) {
      const m = str1.length
      const n = str2.length

      const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

      for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
          if (i === 0) {
            dp[i][j] = j
          } else if (j === 0) {
            dp[i][j] = i
          } else if (str1[i - 1] === str2[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1]
          } else {
            dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
          }
        }
      }

      return dp[m][n]
    }

    const distance = levenshteinDistance(string1, string2)
    const maxLength = Math.max(string1.length, string2.length)
    const similarityPercentage = ((maxLength - distance) / maxLength) * 100

    return similarityPercentage
  }

  const timeInSeconds = Math.round(timer.getTime() / 1000)
  const grossWPM = Math.floor((textArray.join(' ').length / 5) / (timeInSeconds / 60))
  const accuracy = calculateStringSimilarity(textArray.join(''), allTypedCharacters.join('')).toFixed(0)
  // Convert accuracy to a decimal fraction
  const accuracyFraction = accuracy / 100
  const netWPM = Math.round(grossWPM * accuracyFraction)

  return { grossWPM, netWPM, accuracy }
}

function animationHandler () {
  // Statistics div
  anime({
    targets: '#information',
    translateY: function () {
      return window.innerHeight / 6
    },
    width: '55%',
    delay: 500,
    duration: 1500,
    easing: 'easeInOutQuart'
  })
  // Words div
  anime({
    targets: '#text',
    opacity: 0,
    delay: 500,
    duration: 1000,
    easing: 'linear'
  })

  anime({
    targets: '.netWPMcon',
    opacity: 1,
    delay: 500,
    duration: 1000,
    easing: 'linear'
  })
}

function winHandler () {
  showNetWPMElement()
  animationHandler()
  removeKeyboardListener()
  timer.stop()
  clearInterval(timerInterval)
  const statistics = statisticCalculator()
  console.log('GrossWPM: ' + statistics.grossWPM)
  console.log('WPM: ' + statistics.netWPM)
  console.log('Accuracy: ' + statistics.accuracy)
}

function keyboardListeners () {
  document.addEventListener('keydown', keyPressHandler)
  document.querySelector('#word__input').addEventListener('keydown', disableControlA)
}

function disableControlA (e) {
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault() // Prevent the default Ctrl+A behavior
  }
}

function removeKeyboardListener () {
  document.removeEventListener('keydown', keyPressHandler)
  document.removeEventListener('keydown', disableControlA)
}

function wordHighlighter () {
  const allWordsOnScreen = document.querySelectorAll('#text > div')
  const previousCurrentWordElement = allWordsOnScreen[iteratorWord - 1]
  const currentWordElement = allWordsOnScreen[iteratorWord]
  if (currentWord) {
    currentWordElement.style.backgroundColor = 'rgb(100, 100, 100)'
    currentWordElement.classList.add('current')
  }
  if (previousCurrentWordElement) {
    previousCurrentWordElement.style.backgroundColor = 'rgb(20, 20, 20)'
    previousCurrentWordElement.classList.remove('current')
    // Reset content of last element
    previousCurrentWordElement.textContent = textArray[iteratorWord - 1]
  }
}

function characterElementMaker () {
  // If statement to make sure there are no more words to type
  if (wordsTyped !== textArray.length) {
    const allWordsOnScreen = document.querySelectorAll('#text > div')
    const currentWordElement = allWordsOnScreen[iteratorWord]
    const currentWordArray = currentWordElement.textContent.split('')
    currentWordElement.textContent = ''
    currentWordArray.forEach((word, index) => {
      currentWordElement.innerHTML += `
    <div class="char__${index + 1}">
      <p>${word}</p>
    </div>
  `
    })
  }
}

function characterHighlighterCorrect () {
  if (iteratorChar < currentWord.length) {
    const currentCharElement = document.querySelector(`.char__${iteratorChar + 1}`)
    const string1 = textArray[iteratorWord]
    const string2 = typedCharacterArray.join('')

    // Check if the currently typed character matches the corresponding character in the text
    const isCorrect = string1[iteratorChar] === string2[iteratorChar]

    if (isCorrect) {
      currentCharElement.style.backgroundColor = 'rgba(99, 207, 95, 1)'
    } else {
      // If the typed character doesn't match the expected character, stop highlighting
      currentCharElement.style.backgroundColor = ''
    }
  }
}

function undoCharacterHighlight () {
  if (iteratorChar < currentWord.length) {
    const nextCharElement = document.querySelector(`.char__${iteratorChar + 1}`)
    nextCharElement.style.backgroundColor = ''
  }
}

function characterHighlighterWrong () {
  if (iteratorChar < currentWord.length) {
    const currentCharElement = document.querySelector(`.char__${iteratorChar + 1}`)

    if (currentCharElement) {
      const string1 = textArray[iteratorWord]
      const string2 = typedCharacterArray.join('')

      // Check if the currently typed character matches the corresponding character in the text
      const isCorrect = string1[iteratorChar] !== string2[iteratorChar]

      if (isCorrect) {
        currentCharElement.style.backgroundColor = 'rgba(207, 95, 125, 1)'
      } else {
        // If the typed character doesn't match the expected character, stop highlighting
        currentCharElement.style.backgroundColor = ''
      }
    }
  }
}

function textCleaner (text) {
  const corrections = {
    '!': '',
    '?': '',
    '"': '',
    ':': '',
    ';': '',
    '-': ''
  }
  Object.keys(corrections).forEach(key => {
    text = text.replaceAll(key, corrections[key])
  })
  return text
}

function wordInputHandler () {
  const input = document.querySelector('#word__input')
  // Stupid fix for deleting input value because of eventListeners listening on keydown
  // Creating a delay fixes this issue
  delay(1).then(() => {
    input.value = ''
  })
  input.focus()
  function delay (time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }
}

function startTimer () {
  timer = new Timer()
  timer.start()
  timerInterval = setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000)
    document.getElementById('time').innerText = timeInSeconds
  }, 100)
}

function updateStatisticsOnScreen () {
  const accuracyElement = document.querySelector('#accuracy')
  const wpmElement = document.querySelector('#WPM')

  statisticInterval = setInterval(() => {
    const statistics = statisticCalculator()
    if (statistics.grossWPM === Infinity) {
      wpmElement.textContent = '0'
    } else {
      wpmElement.textContent = statistics.grossWPM
    }
    accuracyElement.textContent = statistics.accuracy + '%'
  }, 100)
}

function gameElements () {
  const main = document.querySelector('main')
  main.innerHTML = `
  <div class="game">
        <div id="information">
          <div >
            <h5>Accuracy</h3>
            <h1 id="accuracy">0%</h1>
          </div>
          <div >
            <h5>Time</h5>
            <h1 id="time" >0</h1>
          </div>
          <div>
            <h5>Words Per Minute</h5>
            <h1 id="WPM">0</h1>
          </div>
        </div>
        <div id="text"></div>
        <input id="word__input" type="text" />
      </div>
  `
}

function showNetWPMElement () {
  const informationDiv = document.querySelector('#information')
  const newDiv = document.createElement('div')
  const statistics = statisticCalculator()
  newDiv.innerHTML = `
  <div class="netWPMcon" >
    <h5>net WPM</h3>
    <h1 id="netWPM">${statistics.netWPM}</h1>
  </div>
  `
  informationDiv.appendChild(newDiv)
}

export default function runGame () {
  getTextFromApi().then(() => {
    gameElements()
    displayText()
    keyboardListeners()
    startTimer()
    wordHighlighter()
    wordInputHandler()
    updateStatisticsOnScreen()
  })
}
