import { useEffect, useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Timer.css'

function Timer() {
  const context = useOutletContext()
  const { gameInfo } = context
  const { round_ends_at: roundEndsAt } = gameInfo

  const interval = useRef

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

    if (elapsedTime >= 100 && interval.current) {
      clearInterval(interval.current)
    }

    return () => {
      clearInterval(interval.current)
    }
  }, [elapsedTime, roundEndsAt])

  return (
    <div className='timer-container'>
      <div 
        className='timer' 
        style={{width: `${elapsedTime}%`}}
      />
    </div>
  )
}

export default Timer
