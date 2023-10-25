import Pocketbase from 'pocketbase'

const loginBtn = document.querySelector('.login__button')
const pb = new PocketBase('https://api.martinbruun.dk')

export function userLoggedIn() {}
