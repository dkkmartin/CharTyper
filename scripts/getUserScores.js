import PocketBase from 'pocketbase'

export default async function getUsers() {
  const pb = new PocketBase('http://api.martinbruun.dk')
  const records = await pb.collection('highscores').getFullList({
    sort: '-netWPM',
    expand: 'user'
  })
  return records
}
