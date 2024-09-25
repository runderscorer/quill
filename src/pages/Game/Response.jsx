import API from "../../helpers/API"
import { useOutletContext } from "react-router-dom"

function Response({ response }) {
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
        className='response'
        onClick={handleClick}
        value={response.id}
      >
        {response.text}
      </button>
    </div>
  )
}

export default Response
