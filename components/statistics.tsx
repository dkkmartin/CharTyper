'use client'

import useKeyboard from '@/hooks/useKeyboard'
import useWords from '@/hooks/useWords'
import useWPM from '@/hooks/useWpm'
import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'

export default function Statistics() {
  const time = new Date()
  time.setSeconds(time.getSeconds() + 30)
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({ expiryTimestamp: time, autoStart: false })

  const { keysPressed } = useKeyboard()
  const words = useWords(50)
  console.log(words)
  //const { wpm , accuracy} = useWPM( )

  useEffect(() => {
    if (keysPressed.length > 0) {
      start()
    }
  }, [keysPressed, start])

  useEffect(() => {
    if (!isRunning && seconds <= 0) {
      // handle game over here
      console.log('Game is over')
    }
  }, [isRunning, seconds])

  return (
    <div className="flex flex-col py-4">
      <div className="text-4xl">
        <span>{seconds}</span>
      </div>
      <div className="text-2xl"></div>
    </div>
  )
}
