const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)') === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches === true

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

if (!isReduced) {
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
}
