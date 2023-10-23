import { registerUser, loginUser } from './pocketbaseAuths'
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://api.martinbruun.dk')

const loginDiv = document.querySelector('.login__button')
const loginModal = document.querySelector('.login')
const xmark = document.querySelector('.fa-xmark')
const loginBtn = document.querySelector('#button__login')
const registerBtn = document.querySelector('#button__register')
const form = document.querySelector('.login form')

loginDiv.addEventListener('click', () => {
  loginModal.style.display = 'block'
})

xmark.addEventListener('click', () => {
  loginModal.style.display = 'none'
})

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const username = form.username.value
  const password = form.password.value
  const answer = await loginUser(username, password)
  if (answer) {
    console.log('Logged in as: ' + pb.authStore.token)
  }
})

registerBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  const username = form.username.value
  const password = form.password.value
  const answer = await registerUser(username, password)
  if (answer) {
    form.remove()
    loginModal.innerHTML = `Success, welcome ${username}`
  } else {
    loginModal.innerHTML += `Error. Try again`
  }
})
