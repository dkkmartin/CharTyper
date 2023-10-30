import Pocketbase from 'pocketbase'

const loginBtnP = document.querySelector('.login__p')
const loginAvatar = document.querySelector('.fa-user')
const loginUsername = document.querySelector('.login__username')
const pb = new Pocketbase('https://api.martinbruun.dk')

export function userLoggedIn() {
  if (!pb.authStore.isValid) return
  loginUsername.textContent = pb.authStore.model.username
  loginBtnP.remove()
  loginAvatar.style.fontSize = '25px'
  console.log(pb.authStore.model)
}
