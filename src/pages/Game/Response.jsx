import API from "../../helpers/API"
import { useOutletContext } from "react-router-dom"

function Response({ response, disabled, votedResponseId }) {
  const context = useOutletContext()
  const { gameInfo, player } = context
  const { room_code: roomCode } = gameInfo

  const handleClick = (e) => {
    const { id: responseId } = response
    const { id: playerId } = player

    API.submitVote(
      responseId, 
      playerId, 
      roomCode
    ).then(response => {
      console.log(response)
    })
  }

  return (
    <div className='response-container'>
      <button 
        className={votedResponseId === response.id ? 'response voted' : 'response'}
        disabled={disabled}
        onClick={handleClick}
        value={response.id}
      >
        {response.text}
      </button>
    </div>
  )
}

export default Response
