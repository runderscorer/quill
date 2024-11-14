import { useEffect, useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Timer.css'
import { useAnimate } from 'motion/react'
import { shakeX } from '../../animations'

function Timer({ handleEndOfRound }) {
  const context = useOutletContext()
  const { gameInfo } = context
  const { round_ends_at: roundEndsAt } = gameInfo

  const interval = useRef
  const [scope, animate] = useAnimate()

  const [
    elapsedTime,
    setElapsedTime
  ] = useState(null)

  useEffect(() => {
    const timeNow = Math.floor(Date.now() / 1000)
    const timeLeft = Number(roundEndsAt) - timeNow

    function startTimer() {
      interval.current = setInterval(() => {
        setElapsedTime(() => 100 - timeLeft)
      }, 1000)
    }

    if (timeLeft >= 0) {
      startTimer()
    } else {
      setElapsedTime(100)
    }

    if (timeLeft <= 10) {
      animate(scope.current, {
        scaleY: [1, 1.5, 1],
        duration: 1 
      })
    }

    if (elapsedTime >= 100 && interval.current) {
      clearInterval(interval.current)
    }

    if (elapsedTime >= 100) {
      handleEndOfRound()
    }

    return () => {
      clearInterval(interval.current)
    }
  }, [elapsedTime, roundEndsAt])

  return (
    <div 
      className='timer-container'
      ref={scope}
    >
      <div 
        className='timer' 
        style={{width: `${elapsedTime}%`}}
      />
    </div>
  )
}

export default Timer
