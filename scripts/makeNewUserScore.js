import PocketBase from 'pocketbase'

const pb = new PocketBase('https://api.martinbruun.dk')

export default async function postDataToDB(data) {
  const record = await pb.collection('highscores').create(data)
}

const data = {
  user: 'Martin',
  time_created: '2022-01-01 10:00:00.123Z',
  netWPM: 123
}
