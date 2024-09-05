'use client'

import useKeyboard from '@/hooks/useKeyboard'
import useWords from '@/hooks/useWords'
import { useEffect, useState } from 'react'

function GameComponent() {
  const keyboard = useKeyboard()
  const words = useWords(50)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [wordIndex, setWordIndex] = useState<number>(0)

  // Initiate currentWord with first word from words
  useEffect(() => {
    if (words.length > 0) {
      setCurrentWord(words[0])
    }
  }, [words])

  // Handle space key press using keyboard.lastPressed
  useEffect(() => {
    if (keyboard.lastPressed === 'Space') {
      keyboard.setLastPressed('') // Reset lastPressed to avoid repeated triggers

      setWordIndex((prevIndex) => {
        const newIndex = prevIndex + 1
        if (newIndex < words.length) {
          setCurrentWord(words[newIndex])
        }
        return newIndex
      })
    }
  }, [keyboard, words])

  useEffect(() => {
    console.log('Current word: ', currentWord)
    console.log('Typing: ', keyboard.words)
    console.log('Last input: ', keyboard.lastPressed)
  }, [currentWord, keyboard])

  return (
    <section className="max-w-[1500px] text-4xl text-zinc-500 flex flex-wrap justify-center">
      {words.map((word, index) =>
        wordIndex === index ? (
          <span key={index}>
            {word.split('').map((char, i) => (
              <span
                className={
                  i < keyboard.keysPressed.length
                    ? char === keyboard.keysPressed[i]
                      ? 'text-green-500'
                      : 'text-red-500'
                    : 'text-white'
                }
                key={i}
              >
                {char}
              </span>
            ))}
            &nbsp;
          </span>
        ) : (
          <span key={index}>{word} &nbsp;</span>
        )
      )}
    </section>
  )
}

export default GameComponent
