import { useState, useEffect } from 'react'

function useKeyboard() {
  const [keysPressed, setKeysPressed] = useState<string[] | null>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setKeysPressed([...keysPressed])
      }
      setKeysPressed(keysPressed ? [...keysPressed, e.key] : [e.key])
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [keysPressed])

  return keysPressed
}

export default useKeyboard
