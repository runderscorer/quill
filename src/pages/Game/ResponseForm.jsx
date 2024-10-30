import { useEffect, useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import API from '../../helpers/API'
import CopyGenerator from '../../helpers/CopyGenerator'
import Timer from './Timer'

function ResponseForm() {
  const context = useOutletContext()

  const { gameInfo, player } = context
  const { 
    current_prompt: currentPrompt,
    room_code: roomCode
  } = gameInfo
  const { responses: { data: responseData } } = currentPrompt

  const responseHeader = CopyGenerator.playerResponseHeader()
  const responseHeaderRef = useRef(responseHeader)

  const getPlayerResponse = () => {
    const response = responseData.find(obj => obj.attributes.player_id == player.id)

    return response && response.attributes
  }

  const [
    responseText,
    setResponseText
  ] = useState('')

  const [
    playerResponse,
    setPlayerResponse
  ] = useState('')

  useEffect(() => {
    const playerResponse = player ? getPlayerResponse() : ''
    setPlayerResponse(playerResponse)
  }, [gameInfo])

  const handleChange = (e) => {
    setResponseText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { id: playerId } = player

    API.submitResponse(
      responseText,
      playerId,
      roomCode
    ).then(response => {
      setResponseText('') 
    })
  }

  const renderPlayerResponse = () => (
    <div className='player-response-container'>
      <p className='bold italic'>
        {responseHeaderRef.current}
      </p>
      <div className='player-response'>
        {playerResponse.text}
      </div>
      <div className='actions'>
        <button disabled>
          Waiting for others to finish writing...
        </button>
      </div>
    </div>
  )

  const renderResponseForm = () => {
    return (
      <div className='response-form'>
        <div>
          <p>
            Let your fingers dance with the rhythm of your thoughts -- complete the poem!  
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            name='response'
            value={responseText}
          />
          <Timer />
          <div className='actions'>
            <button type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      {playerResponse && renderPlayerResponse()}
      {!playerResponse && renderResponseForm()}
    </div>
  )
}

export default ResponseForm

