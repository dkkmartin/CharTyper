export default class Spinner {
  start () {
    const spinnerDiv = document.querySelector('.lds-dual-ring')
    spinnerDiv.style.display = 'block'
  }

  stop () {
    const spinnerDiv = document.querySelector('.lds-dual-ring')
    spinnerDiv.style.display = 'none'
  }
}