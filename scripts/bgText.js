// const randomWords = [
//   'apple',
//   'banana',
//   'chocolate',
//   'dolphin',
//   'elephant',
//   'flamingo',
//   'grape',
//   'hamburger',
//   'iguana',
//   'jazz',
//   'kangaroo',
//   'lemon',
//   'mango',
//   'ninja',
//   'octopus',
//   'penguin',
//   'quokka',
//   'raccoon',
//   'strawberry',
//   'tiger',
//   'umbrella',
//   'vampire',
//   'watermelon',
//   'xylophone',
//   'yak',
//   'zebra',
//   'accordion',
//   'butterfly',
//   'caterpillar',
//   'dog',
//   'elephant',
//   'flamingo',
//   'gorilla',
//   'hedgehog',
//   'iguana',
//   'jellyfish',
//   'kangaroo',
//   'lemur',
//   'monkey',
//   'narwhal',
//   'octopus',
//   'panda',
//   'quail',
//   'rhinoceros',
//   'sloth',
//   'toucan',
//   'unicorn',
//   'vulture',
//   'walrus',
//   'x-ray',
//   'yeti',
//   'zeppelin',
//   'butterfly',
//   'cactus',
//   'dolphin',
//   'elephant',
//   'falcon',
//   'gazelle',
//   'hedgehog',
//   'iguana',
//   'jaguar',
//   'kangaroo',
//   'lemur',
//   'mongoose',
//   'narwhal',
//   'octopus',
//   'panda',
//   'quokka',
//   'rhinoceros',
//   'sloth',
//   'toucan',
//   'unicorn',
//   'vulture',
//   'walrus',
//   'x-ray',
//   'yeti',
//   'zeppelin',
//   'acrobatics',
//   'bicycle',
//   'chimney',
//   'dandelion',
//   'elevator',
//   'fireplace',
//   'guitar',
//   'hurricane',
//   'iceberg',
//   'jigsaw',
//   'kite',
//   'lighthouse',
//   'microscope',
//   'nail',
//   'ocean',
//   'parachute',
//   'quilt',
//   'rocket',
//   'saxophone',
//   'tornado',
//   'umbrella',
//   'violin',
//   'waterfall',
//   'xylophone',
//   'yacht',
//   'zeppelin',
//   'time',
//   'year',
//   'people',
//   'way',
//   'day',
//   'man',
//   'thing',
//   'woman',
//   'life',
//   'child',
//   'world',
//   'school',
//   'state',
//   'family',
//   'student',
//   'group',
//   'country',
//   'problem',
//   'hand',
//   'part',
//   'place',
//   'case',
//   'week',
//   'company',
//   'system',
//   'program',
//   'question',
//   'work',
//   'government',
//   'number',
//   'night',
//   'point',
//   'home',
//   'water',
//   'room',
//   'mother',
//   'area',
//   'money',
//   'story',
//   'fact',
//   'month',
//   'lot',
//   'right',
//   'study',
//   'book',
//   'eye',
//   'job',
//   'word',
//   'business',
//   'issue',
//   'side',
//   'kind',
//   'head',
//   'house',
//   'service',
//   'friend',
//   'father',
//   'power',
//   'hour',
//   'game',
//   'line',
//   'end',
//   'member',
//   'law',
//   'car',
//   'city',
//   'community',
//   'name',
//   'president',
//   'team',
//   'minute',
//   'idea',
//   'kid',
//   'body',
//   'information',
//   'back',
//   'parent',
//   'face',
//   'others',
//   'level',
//   'office',
//   'door',
//   'health',
//   'person',
//   'art',
//   'war',
//   'history',
//   'party',
//   'result',
//   'change',
//   'morning',
//   'reason',
//   'research',
//   'girl',
//   'guy',
//   'moment',
//   'air',
//   'teacher',
//   'force',
//   'education'
// ]
// const textDiv = document.querySelector('.background_animation')
// const pickedWords = []

// function getRandomWord (number) {
//   for (let index = 0; index < number; index++) {
//     const randomNumber = Math.floor(Math.random() * randomWords.length)
//     pickedWords.push(randomWords[randomNumber])
//   }
// }

// function displayRandomWord () {
//   pickedWords.forEach(word => {
//     const newP = document.createElement('p')
//     newP.textContent = word
//     textDiv.appendChild(newP)
//   })
// }

// getRandomWord(220)
// displayRandomWord()

function makeDivs (number) {
  const backgroundDiv = document.querySelector('.background_animation')
  for (let index = 0; index < number; index++) {
    const element = document.createElement('p')
    backgroundDiv.appendChild(element)
  }
}

export function removeNonUsedDiv () {
  const pElements = document.querySelectorAll('.background_animation p')
  pElements.forEach(element => {
    if (element.clientHeight <= 0) {
      element.remove()
    }
  })
}

makeDivs(400)
document.addEventListener('DOMContentLoaded', () => {
  function animationLoop () {
    removeNonUsedDiv()
    requestAnimationFrame(animationLoop)
  }
  requestAnimationFrame(animationLoop)
})

window.addEventListener('resize', () => {
  makeDivs(300)
})
