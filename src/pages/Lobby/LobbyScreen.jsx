import { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import './Lobby.css'
import ErrorMessage from '../../components/ErrorMessage'
import JoinGame from '../../components/JoinGame'
import API from '../../helpers/API'
import Helper from '../../helpers/Helper'
import { motion } from 'motion/react'
import { popIn } from '../../animations'


function LobbyScreen() {
  const params = useParams()

  const context = useOutletContext()

  const { 
    removePlayer,
    player,
    handleSetGameInfo,
    gameInfo,
    navigate
  } = context
  const { players } = gameInfo

  const [
    errorMessage,
    setErrorMessage
  ] = useState(null)
    
  useEffect(() => {
    if (!gameInfo) {
      Helper.findGame(params.roomCode, handleSetGameInfo)
    }
  }, [])

  useEffect(() => {
    if (gameInfo) {
      const { 
        room_code: roomCode, 
        started_at: startedAt 
      } = gameInfo

      if (startedAt) {
        navigate(`/games/${roomCode}/play`)
      }
    }
  }, [gameInfo])

  const handleLeaveGame = () => {
    API.leaveGame(player.id)
      .then(response => {
        removePlayer()
        navigate('/')
      })
  }

  const handleStartGameClick = () => {
    API.startGame(gameInfo.room_code)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error_message)
      })
  }

  const renderStartGame = () => {
    const { started_at: startedAt } = gameInfo

    if (player && player.host && !startedAt) {
      return (
        <button type="button" onClick={handleStartGameClick}>
          Start Game
        </button>
      )
    } else {
      return (
        <span>
          Waiting for host to start game...
        </span>
      )
    }
  }

  const renderButtons = () => (
    <div>
      <div className='error'>
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </div>
      <div className='actions'>
        <div className='left'>
          {renderStartGame()}
        </div>
      
        <button 
          className='secondary-btn'
          type="button" 
          onClick={handleLeaveGame}
        >
          Leave Game
        </button>
      </div>
    </div>
  ) 

  return gameInfo && (
    <div className='lobby'>
      <div className='welcome'>
        <p className='top'>
          Gather, ye who speak in song,
        </p>
        <p className='bottom'>
          &nbsp;to the court of&nbsp;
          <span className='bold uppercase'>
            {gameInfo.room_code} 
          </span>
        </p>
      </div>

      <div className='players'>
        {
          players && players.data.map(player => (
            <motion.div 
              className='player'
              key={player.id}
              {...popIn}
            >
              <div className='quill'/>
              <div className='dots' />
              <div className='name'>
                {player.attributes.name}
                {
                  player.attributes.host && (
                    <span />
                  )
                }
              </div>
            </motion.div>
          ))
        }
      </div>

      {!player && <JoinGame />}
      {player && renderButtons()}
    </div>
  )
}

export default LobbyScreen;
