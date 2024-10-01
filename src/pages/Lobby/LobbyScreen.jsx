import { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import './Lobby.css'
import API from '../../helpers/API'
import CopyGenerator from '../../helpers/CopyGenerator'
import Helper from '../../helpers/Helper'


function LobbyScreen() {
  const params = useParams()

  const context = useOutletContext()

  const { 
    addPlayer,
    removePlayer,
    player,
    handleSetGameInfo,
    gameInfo,
    navigate
  } = context
  const { players } = gameInfo

  const [
    playerName,
    setPlayerName
  ] = useState('')

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
  
  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    API.createPlayer(playerName, gameInfo.room_code)
      .then(response => {
        addPlayer(response.data.data.attributes)
      })
      .catch(error => {
        console.error(error)
      })
  }

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
        console.error('error: ', error)
      })
  }

  const renderPlayerNameForm = () => (
    <form onSubmit={handleSubmit}>
      <p className='bold'>
        Scribe your name to begin, o {CopyGenerator.playerNameLabel()}
      </p>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Enter your name"
        value={playerName}
      />
      <button type="submit">
        Join Game 
      </button>
    </form>
  ) 

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
            <div 
              className='player'
              key={player.id}
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
            </div>
          ))
        }
      </div>

      {!player && renderPlayerNameForm()}
      {player && renderButtons()}
    </div>
  )
}

export default LobbyScreen;
