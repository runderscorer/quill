import { useEffect, useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import API from '../../helpers/API'
import CopyGenerator from '../../helpers/CopyGenerator'
import Timer from './Timer'
import Loading from '../../components/Loading'
import { motion } from 'motion/react'
import { popIn } from '../../animations'

function ResponseForm() {
  const context = useOutletContext()

  const { gameInfo, player } = context
  const { 
    current_prompt: currentPrompt,
    room_code: roomCode,
    round_ends_at: roundEndsAt
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

  const [
    endOfRound,
    setEndOfRound
  ] = useState(false)

  const [
    usedHelp,
    setUsedHelp
  ] = useState(false)

  const [
    isWriting,
    setIsWriting
  ] = useState(false)

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

  const handleEndOfRound = () => {
    const { id: playerId, host } = player

    // setEndOfRound(true)

    // API.timerEnd(roomCode, playerId)
  }

  const handleClick = () => {
    setIsWriting(true)

    API.generateResponse(roomCode).then(response => {
      let generatedText = response.data.text

      setResponseText(generatedText)
      setUsedHelp(true)
      setIsWriting(false)
    })
  } 

  const renderPlayerResponse = () => (
    <motion.div 
      className='player-response-container'
      {...popIn}
    >
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
    </motion.div>
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
            disabled={endOfRound}
          />
          <Timer handleEndOfRound={handleEndOfRound} />
          <div className='actions'>
            <button 
              type='submit' 
              disabled={endOfRound} 
              className={endOfRound ? 'round-over' : ''}
            >
              {endOfRound ? "Time's up" : 'Submit'}
            </button>
            <button 
              type='button' 
              className='secondary-btn'
              disabled={usedHelp}
              onClick={handleClick}
            >
              <Loading 
                text='Writing'
                ready={!isWriting}
              >
                Write for me
              </Loading>
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
