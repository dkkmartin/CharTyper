'use client'

import useKeyboard from '@/hooks/useKeyboard'
import useSentece from '@/hooks/useSentence'
import { useEffect, useState } from 'react'

export default function Play() {
  const keyboard = useKeyboard()
  const sentence = useSentece(50)
  const [currentWord, setCurrentWord] = useState<string | null>('')

  useEffect(() => {
    setCurrentWord(sentence[0])
  }, [sentence])

  return (
    <div className="flex flex-col">
      <section className="w-screen max-w-[1500px] text-pretty text-center text-3xl text-zinc-500">
        {sentence.map((word, index) => (
          <span
            className={`${
              currentWord === word ? 'text-white' : 'text-zinc-500'
            } px-2`}
            key={index}
          >
            {word}{' '}
          </span>
        ))}
      </section>
      <section>
        {keyboard.keysPressed.length > 0
          ? keyboard.keysPressed
          : keyboard.words.join(' ')}
      </section>
      -
    </div>
  )
}
