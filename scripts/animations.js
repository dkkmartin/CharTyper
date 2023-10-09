import anime from 'animejs'
import { removeNonUsedDiv } from './bgText'

const textWrapper = document.querySelector('.ml11 .letters')
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
let pElements, gridCol, gridRow

document.addEventListener('DOMContentLoaded', () => {
  removeNonUsedDiv()
  pElements = document.querySelectorAll('.background_animation p')
  // Usage example:
  const totalCells = pElements.length // Replace with the actual total number of cells
  const cellWidth = 100 // Replace with the width of each cell in pixels

  const { numRows, numColumns } = calculateGridDimensions(totalCells, cellWidth)
  gridRow = numRows + 1
  gridCol = numColumns - 3
  console.log(`Number of Rows: ${numRows}`)
  console.log(`Number of Columns: ${numColumns}`)
  console.log(pElements.length)
})

function calculateGridDimensions (totalCells, cellWidth) {
  // Calculate the number of columns
  const numColumns = Math.floor(window.innerWidth / cellWidth)

  // Calculate the number of rows
  const numRows = Math.ceil(totalCells / numColumns)

  return { numRows, numColumns }
}

export function animations () {
  anime.timeline()
    .add({
      targets: '.ml11 .line',
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: 'easeOutExpo',
      duration: 700
    })
    .add({
      targets: '.ml11 .line',
      translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
      easing: 'easeOutExpo',
      duration: 700,
      delay: 100
    }).add({
      targets: '.ml11 .letter',
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 600,
      offset: '-=775',
      delay: (el, i) => 34 * (i + 1)
    }).add({
      targets: '.line1',
      opacity: 0,
      duration: 1000,
      easing: 'easeOutExpo'
    }).add({
      targets: pElements,
      opacity: [0, 1],
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 }
      ],
      delay: anime.stagger(100, { grid: [gridCol, gridRow], from: 'center' })
    }).add({
      targets: pElements,
      translateX: anime.stagger(10, { grid: [gridCol, gridRow], from: 'center', axis: 'x' }),
      translateY: anime.stagger(10, { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      rotateZ: anime.stagger([0, 90], { grid: [gridCol, gridRow], from: 'center', axis: 'x' }),
      delay: anime.stagger(200, { grid: [gridCol, gridRow], from: 'center' }),
      easing: 'easeInOutQuad'
    }).add({
      targets: pElements,
      translateX: anime.stagger(10, { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      translateY: anime.stagger(10, { grid: [gridCol, gridRow], from: 'first', axis: 'y' }),
      rotateZ: anime.stagger([0, 90], { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      delay: anime.stagger(200, { grid: [gridCol, gridRow], from: 'center' }),
      easing: 'easeInOutQuad'
    })
    .add({
      targets: pElements,
      rotateZ: anime.stagger(20, { grid: [gridCol, gridRow], from: 'center', axis: 'x' }),
      delay: anime.stagger(200, { grid: [gridCol, gridRow], from: 'center' }),
      easing: 'easeInOutQuad'
    })
    .add({
      targets: pElements,
      scaleX: anime.stagger([1, 0.5], { grid: [gridCol, gridRow], from: 'center' }),
      scaleY: anime.stagger([1, 0.5], { grid: [gridCol, gridRow], from: 'center' }),
      rotate: anime.stagger([0, 180], { grid: [gridCol, gridRow], from: 'center' }),
      delay: anime.stagger(100, { grid: [gridCol, gridRow], from: 'center' })
    })
    .add({
      targets: pElements,
      translateX: anime.stagger(20, { grid: [gridCol, gridRow], from: 'center', axis: 'x' }),
      translateY: anime.stagger(20, { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      rotateZ: anime.stagger([-90, 90], { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      delay: anime.stagger(100, { grid: [gridCol, gridRow], from: 'center' })
    }).add({
      targets: pElements,
      translateX: anime.stagger(10, { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      translateY: anime.stagger(10, { grid: [gridCol, gridRow], from: 'first', axis: 'y' }),
      rotateZ: anime.stagger([0, 90], { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      delay: anime.stagger(200, { grid: [gridCol, gridRow], from: 'center' }),
      easing: 'easeInOutQuad'
    })
    .add({
      targets: pElements,
      rotateZ: anime.stagger(20, { grid: [gridCol, gridRow], from: 'center', axis: 'x' }),
      delay: anime.stagger(200, { grid: [gridCol, gridRow], from: 'center' }),
      easing: 'easeInOutQuad'
    })
    .add({
      targets: pElements,
      scaleX: anime.stagger([1, 0.5], { grid: [gridCol, gridRow], from: 'center' }),
      scaleY: anime.stagger([1, 0.5], { grid: [gridCol, gridRow], from: 'center' }),
      rotate: anime.stagger([0, 180], { grid: [gridCol, gridRow], from: 'center' }),
      delay: anime.stagger(100, { grid: [gridCol, gridRow], from: 'center' })
    })
    .add({
      targets: pElements,
      translateX: anime.stagger(20, { grid: [gridCol, gridRow], from: 'center', axis: 'x' }),
      translateY: anime.stagger(20, { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      rotateZ: anime.stagger([-90, 90], { grid: [gridCol, gridRow], from: 'center', axis: 'y' }),
      delay: anime.stagger(100, { grid: [gridCol, gridRow], from: 'center' })
    })

  anime({
    targets: '.buttons',
    opacity: [0, 1],
    delay: 2000,
    duration: 2000
  })
}

export function animationsAfterAwait () {
  const userHighscoreDivs = document.querySelectorAll('.user')
  anime({
    targets: '.highscore',
    opacity: [0, 1],
    delay: 1000
  })

  anime.timeline()
    .add({
      targets: userHighscoreDivs,
      scale: [0.5, 1],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 1600 }),
      easing: 'easeOutCubic'
    }).add({
      targets: '.user__1',
      keyframes: [
        { scale: 1.02 },
        { scale: 1 }
      ]
    })
}
