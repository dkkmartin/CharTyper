export default async function getScoresFromDB() {
  try {
    const response = await fetch('http://164.92.224.247:3000/api/data')
    if(!response.ok) {
      throw new Error('Response not ok')
    }
    const data = await response.json()
    return data
  }catch(error) {
    console.log('Error: ', error)
  }
}
