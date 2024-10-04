import { useState, useEffect } from 'react'
import './Superlatives.css'

function Superlatives({ mostLiked, funniest, smartest }) {
  return (
    <div className='superlatives'>
      {
        mostLiked &&
          <div className='container'>
            <p className='title'>
              "{mostLiked.title}"
            </p> 
            <p className='name'>
              {mostLiked.name}
            </p>
            <span>with {mostLiked.count} ❤️ votes</span>
          </div>
      }
      {
        funniest &&
          <div className='container'>
            <p className='title'>
              "{funniest.title}"
            </p> 
            <p className='name'>
              {funniest.name}
            </p>
            <span>with {funniest.count} 🤣 votes</span>
          </div>
      }
      {
        smartest &&
          <div className='container'>
            <p className='title'>
              "{smartest.title}"
            </p> 
            <p className='name'>
              {smartest.name}
            </p>
            <span>with {smartest.count} 🧠 votes</span>
          </div>
      }
    </div>
  )
}

export default Superlatives