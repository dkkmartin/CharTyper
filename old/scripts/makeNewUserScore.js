import PocketBase from 'pocketbase'

const pb = new PocketBase('https://api.martinbruun.dk')

export default async function postDataToDB(data) {
  const record = await pb.collection('highscores').create(data)
}
