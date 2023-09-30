export default async function postDataToDB (data) {
  const response = await fetch('http://164.92.224.247:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
