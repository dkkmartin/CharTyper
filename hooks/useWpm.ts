import { useState, useEffect } from 'react'

interface WPMResult {
  wpm: number
  accuracy: number
}

const useWPM = (
  targetWords: string[],
  typedWords: string[],
  currentWord: string,
  startTime: number | null
): WPMResult => {
  const [result, setResult] = useState<WPMResult>({ wpm: 0, accuracy: 0 })

  useEffect(() => {
    if (!startTime) return

    const calculateWPM = () => {
      const targetText = targetWords.join(' ')
      const typedText = [...typedWords, currentWord].join(' ')
      const timeElapsed = (Date.now() - startTime) / 60000 // Convert to minutes
      const typedCharacters = typedText.length
      const correctCharacters = [...typedText].filter(
        (char, index) => char === targetText[index]
      ).length
      const errors = typedCharacters - correctCharacters

      // Calculate Gross WPM
      const grossWPM = Math.round(typedCharacters / 5 / timeElapsed)

      // Calculate Net WPM
      const netWPM = Math.max(0, Math.round(grossWPM - errors / timeElapsed))

      // Calculate Accuracy
      const accuracy =
        typedCharacters > 0
          ? Math.round((correctCharacters / typedCharacters) * 100)
          : 0

      setResult({ wpm: netWPM, accuracy })
    }

    const intervalId = setInterval(calculateWPM, 1000)

    return () => clearInterval(intervalId)
  }, [targetWords, typedWords, currentWord, startTime])

  return result
}

export default useWPM
