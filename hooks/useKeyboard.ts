import { useState, useEffect } from 'react'

function useKeyboard() {
  const [words, setWords] = useState<string[]>([])
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [lastPressed, setLastPressed] = useState<string>('')
  const [isKeysPressedEmpty, setIsKeysPressedEmpty] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        handleWordJoin()
        setLastPressed('Space')
      } else if (e.key === 'Backspace') {
        handleBackspace()
        setLastPressed('Backspace')
      } else {
        if (keyFilter(e.key)) {
          handleKeyPress(e.key)
        }
      }
    }

    const handleBackspace = () => {
      if (keysPressed.length > 0) {
        // Remove the last character from keysPressed
        setKeysPressed(keysPressed.slice(0, -1))
        setIsKeysPressedEmpty(false)
      } else if (words.length > 0) {
        // Remove the last character from the last word in words
        const lastWord = words[words.length - 1].slice(0, -1)
        if (lastWord === '') {
          // If the last word becomes an empty string, remove it from words
          setWords(words.slice(0, -1))
        } else {
          // Otherwise, update the last word in words
          setWords([...words.slice(0, -1), lastWord])
        }
        setIsKeysPressedEmpty(true)
      }
    }

    const handleKeyPress = (key: string) => {
      setKeysPressed([...keysPressed, key])
      setLastPressed(key)
      setIsKeysPressedEmpty(false)
    }

    const handleWordJoin = () => {
      setWords(
        words ? [...words, keysPressed.join('')] : [keysPressed.join('')]
      )
      setKeysPressed([])
      setIsKeysPressedEmpty(false)
    }

    const keyFilter = (key: string) => {
      const ignoredKeys = [
        'Enter',
        'Alt',
        'Control',
        'AltGraph',
        'Shift',
        'Meta',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ContextMenu',
        'CapsLock',
        'Tab',
        'Escape'
      ]
      return !ignoredKeys.includes(key)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keysPressed, words])

  return {
    keysPressed,
    setKeysPressed,
    words,
    setWords,
    lastPressed,
    setLastPressed,
    isKeysPressedEmpty
  }
}

export default useKeyboard
