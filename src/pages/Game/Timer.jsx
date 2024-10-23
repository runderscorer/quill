import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Timer.css'

function Timer() {
  const context = useOutletContext()
  const {elapsedTime} = context

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
