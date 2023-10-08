export default async function getQoute (length) {
  const response = await fetch(`https://api.quotable.io/quotes/random?minLength=${length - 20}&maxLength=${length + 20}`)
  const data = await response.json()
  if (response.ok) {
    return data[0].content
  }
}
