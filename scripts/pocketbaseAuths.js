//@ts-check

import PocketBase from 'pocketbase'
import { userLoggedIn } from './loginBar'
const pb = new PocketBase('https://api.martinbruun.dk')

export async function registerUser(username, password) {
  try {
    await pb.collection('users').create({
      username,
      password,
      passwordConfirm: password
    })
    return true
  } catch (error) {
    console.error(error)
  }
  loginUser(username, password)
}

export async function loginUser(username, password) {
  try {
    await pb.collection('users').authWithPassword(username, password)
    console.log('Logged in as: ' + pb.authStore.token)
    userLoggedIn()
    return true
  } catch (error) {
    console.error(error)
  }
}
