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

  useEffect(() => {
    console.log(keyboard)
  }, [keyboard])

  return (
    <div className="flex flex-col">
      <section className="w-screen px-4 text-pretty text-center text-3xl text-zinc-500">
        {sentence.join(' ')}
      </section>
      <section>{keyboard && keyboard.join(' ')}</section>
    </div>
  )
}
