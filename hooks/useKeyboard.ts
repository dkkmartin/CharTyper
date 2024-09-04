import { useState, useEffect } from 'react'

function useKeyboard() {
  const [keysPressed, setKeysPressed] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        handleBackspace()
      } else {
        handleKeyPress(e.key)
      }
    }

    const handleBackspace = () => {
      if (keysPressed.length > 0) {
        setKeysPressed(keysPressed.slice(0, -1))
      }
    }

    const handleKeyPress = (key: string) => {
      setKeysPressed([...keysPressed, key])
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keysPressed])

  return keysPressed
}

export default useKeyboard
