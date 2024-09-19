'use client'

import useKeyboard from '@/hooks/useKeyboard'
import useWords from '@/hooks/useWords'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function GameComponent() {
  const keyboard = useKeyboard()
  const words = useWords(50)
  const theme = useTheme()
  const [currentWord, setCurrentWord] = useState<string>('')
  const [wordIndex, setWordIndex] = useState<number>(0)

  // Function to get the class name based on the character and its index
  const getClassName = (char: string, i: number) => {
    if (i < keyboard.keysPressed.length) {
      return char === keyboard.keysPressed[i]
        ? 'bg-green-500/15'
        : 'bg-red-500/15'
    }
    return ''
  }

  // Initialize currentWord with the first word from words
  useEffect(() => {
    if (words.length > 0) {
      setCurrentWord(words[0])
    }
  }, [words])

  // Handle space and backspace key press using keyboard.lastPressed
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

    if (keyboard.lastPressed === 'Backspace' && keyboard.isKeysPressedEmpty) {
      keyboard.setLastPressed('') // Reset lastPressed to avoid repeated triggers

      setWordIndex((prevIndex) => {
        const newIndex = prevIndex - 1
        if (newIndex >= 0 && keyboard.words[newIndex] !== undefined) {
          setCurrentWord(words[newIndex])
          keyboard.setKeysPressed(keyboard.words[newIndex].split(''))
          // Remove the last word from keyboard.words without modifying it
          keyboard.setWords(keyboard.words.slice(0, -1))
        }
        return newIndex >= 0 ? newIndex : prevIndex
      })
    }
  }, [keyboard, words, wordIndex])

  // Log the current state for debugging purposes
  useEffect(() => {
    console.log('Keys pressed: ', keyboard.keysPressed)
    console.log('Words: ', keyboard.words)
    console.log('Last input: ', keyboard.lastPressed)
  }, [currentWord, keyboard, wordIndex])

  return (
    <section className="max-w-[1500px] text-4xl text-zinc-700 flex flex-wrap justify-center">
      {/* Current word user is on */}
      {words.map((word, index) =>
        wordIndex === index ? (
          <span
            key={index}
            className={`px-2 ${
              theme.resolvedTheme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {word.split('').map((char, i) => (
              <span className={getClassName(char, i)} key={i}>
                {keyboard.keysPressed.length > 0 &&
                i < keyboard.keysPressed.length ? (
                  keyboard.keysPressed[i] === char ? (
                    <span>{char}</span>
                  ) : (
                    <span>{keyboard.keysPressed[i]}</span>
                  )
                ) : (
                  char
                )}
              </span>
            ))}
            {/* Render extra characters typed by the user */}
            {keyboard.keysPressed.length > word.length &&
              keyboard.keysPressed.slice(word.length).map((extraChar, i) => (
                <span
                  className={`bg-red-500/15 ${
                    theme.resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                  key={`extra-${i}`}
                >
                  {extraChar}
                </span>
              ))}
          </span>
        ) : (
          // All other words
          <span
            key={index}
            className={
              keyboard.words[index] && words[index] !== keyboard.words[index]
                ? 'border-b-2 border-white border-spacing-4 px-2'
                : 'px-2'
            }
          >
            {word}
          </span>
        )
      )}
    </section>
  )
}

export default GameComponent
