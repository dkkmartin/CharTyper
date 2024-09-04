export default class Spinner {
  start(which) {
    const spinnerDiv = document.querySelector(`.${which}`)
    spinnerDiv.style.display = 'block'
  }

  stop(which) {
    const spinnerDiv = document.querySelector(`.${which}`)
    spinnerDiv.style.display = 'none'
  }
}
