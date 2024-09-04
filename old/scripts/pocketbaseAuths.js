//@ts-check

import PocketBase from 'pocketbase'
import { loggedInBar } from './loginBar'
const pb = new PocketBase('https://api.martinbruun.dk')

export async function registerUser(username, password) {
  try {
    await pb.collection('users').create({
      username,
      password,
      passwordConfirm: password
    })
    loginUser(username, password)
    return true
  } catch (error) {
    console.error(error)
  }
}

export async function loginUser(username, password) {
  try {
    await pb.collection('users').authWithPassword(username, password)
    loggedInBar()
    return true
  } catch (error) {
    console.error(error)
  }
}
