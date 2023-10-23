import PocketBase from 'pocketbase'
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
  //loginUser(username, password)
}

export async function loginUser(username, password) {
  try {
    await pb.collection('users').authWithPassword(username, password)
    return true
  } catch (error) {
    console.error(error)
  }
}
