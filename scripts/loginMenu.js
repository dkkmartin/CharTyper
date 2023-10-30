import { registerUser, loginUser } from './pocketbaseAuths'
import Spinner from './spinner'
import PocketBase from 'pocketbase'
const pb = new PocketBase('https://api.martinbruun.dk')
const spinner = new Spinner()
const loginDiv = document.querySelector('.login__button')
const loginModal = document.querySelector('.login')
const xmark = document.querySelector('.fa-xmark')
const loginBtn = document.querySelector('#button__login')
const registerBtn = document.querySelector('#button__register')
const form = document.querySelector('.login form')
const loginMsg = document.querySelector('#login__msg')

spinner.stop('ring-login')

loginDiv.addEventListener('click', () => {
  loginModal.style.display = 'block'
  if (pb.authStore.isValid) {
    loggedInMenu()
  }
})

xmark.addEventListener('click', () => {
  loginModal.style.display = 'none'
})

form.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
})

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  loginMsg.textContent = ''
  spinner.start('ring-login')
  const username = form.username.value
  const password = form.password.value
  const answer = await loginUser(username, password)
  if (answer) {
    spinner.stop('ring-login')
    loginModal.style.display = 'none'
  } else {
    spinner.stop('ring-login')
    loginMsg.textContent = 'error. try again'
  }
})

registerBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  loginMsg.textContent = ''
  spinner.start('ring-login')
  const validateInputs = inputValidator()
  if (!validateInputs) return
  const username = form.username.value.toLowerCase()
  const password = form.password.value
  const answer = await registerUser(username, password)
  if (answer) {
    spinner.stop('ring-login')
    loginModal.style.display = 'none'
  } else {
    spinner.stop('ring-login')
    loginMsg.textContent = 'error. try again'
  }
})

function loggedInMenu() {
  loginModal.innerHTML = ''
  const menu = document.createElement('div')
  menu.classList.add('login__user-menu')
  menu.innerHTML = `
    <p>hi, ${pb.authStore.model.username}</p>
    <button>Logout</button>
  `
  loginModal.appendChild(menu)
}

function inputValidator() {
  const username = form.username.value
  const password = form.password.value
  const regex = /^[a-zA-Z0-9]+$/

  if (username.length < 3) {
    loginMsg.textContent = 'username is too short (min 3)'
    return false
  }

  if (password.length < 8) {
    loginMsg.textContent = 'Password is too short (min 8)'
    return false
  }

  if (!username || !password) {
    loginMsg.textContent = 'username or password is empty'
    return false
  }

  if (!regex.test(username) || !regex.test(password)) {
    loginMsg.textContent = 'username or password contains invalid characters'
    return false
  }

  return true
}
