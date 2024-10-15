import { useState } from 'react'
import API from '../../helpers/API'
import './Reactions.css'

function Reactions({ playerId, responseId }) {
  const [
    chosenReaction,
    setChosenReaction
  ] = useState(null)

  const handleClick = (e) => {
    API.submitReaction(
      responseId,
      e.currentTarget.value,
      playerId
    ).then(response => {
      console.log(response)
      setChosenReaction(response.data.reaction.data.attributes.kind)
    })
  }

  return (
    <div className='reactions'>
      <div>
        Add a reaction
      </div>
      <div className='buttons'>
        <button 
          className={chosenReaction === 'like' ? 'reaction chosen' : 'reaction'}
          disabled={!!chosenReaction}
          onClick={handleClick}
          value="like"
        >
          <span>❤️</span>
        </button>
        <button 
          className={chosenReaction === 'funny' ? 'reaction chosen' : 'reaction'}
          disabled={!!chosenReaction}
          onClick={handleClick}
          value="funny"
        >
          <span>🤣</span>
        </button>
        <button 
          className={chosenReaction === 'smart' ? 'reaction chosen' : 'reaction'}
          disabled={!!chosenReaction}
          onClick={handleClick}
          value="smart"
        >
          <span>🧠</span>
        </button>
      </div>
    </div>
  )
}

export default Reactions
