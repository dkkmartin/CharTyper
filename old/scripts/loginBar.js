import Pocketbase from 'pocketbase'

const loginBtnP = document.querySelector('.login__p')
const login__button = document.querySelector('.login__button')
const loginAvatar = document.querySelector('.fa-user')
const loginUsername = document.querySelector('.login__username')
const pb = new Pocketbase('https://api.martinbruun.dk')

export function loggedInBar() {
  const loginP = loginBtnP
  if (!pb.authStore.isValid) {
    loginUsername.textContent = ''
    loginAvatar.style.fontSize = '16px'
    login__button.appendChild(loginP)
  } else {
    loginUsername.textContent = pb.authStore.model.username
    loginBtnP.remove()
    loginAvatar.style.fontSize = '25px'
  }
}
