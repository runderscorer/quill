import { useState, useEffect } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import './Lobby.css'
import API from '../../helpers/API'

function Lobby() {
  const navigate = useNavigate()
  const params = useParams()

  const context = useOutletContext()

  const { 
    addPlayer,
    removePlayer,
    player,
    handleSetIsHost,
    handleSetGameInfo,
    gameInfo,
    isHost
  } = context

  const [
    playerName,
    setPlayerName
  ] = useState('')

  const findGame = () => {
    API.findGame(params.roomCode)
      .then(response => {
        handleSetGameInfo(response.data.data.attributes)
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (!gameInfo) {
      findGame()
    }
  }, [])

  useEffect(() => {
    handleSetIsHost()
  }, [gameInfo, player])

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
        handleSetGameInfo(response.data.data.attributes)
        navigate(`/games/${gameInfo.room_code}/play`)
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }

  const renderPlayerNameForm = () => (
    <form onSubmit={handleSubmit}>
      <p>Enter your name to join</p>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Enter Your Name"
        value={playerName}
      />
      <button type="submit">
        Enter Name
      </button>
    </form>
  ) 

  const renderStartGame = () => {
    const { started_at: startedAt } = gameInfo

    return isHost && !startedAt && (
      <div>
        <button type="button" onClick={handleStartGameClick}>
          Start Game
        </button>
      </div>
    )
  }

  const renderPlayerWaiting = () => (
    <div>
      <p>Waiting for {gameInfo.host.name} to start the game...</p>
      <p>{player.name} is ready</p>

      {renderStartGame()}
    
      <button type="button" onClick={handleLeaveGame}>
        Leave Game
      </button>
    </div>
  ) 

  const renderPlayerCount= () => (
    gameInfo.player_names ? gameInfo.player_names.length : 0
  )

  return gameInfo && (
    <div className='game'>
      <div>
        <p>Room Code: {gameInfo.room_code}</p>
      </div>

      <div>
        <p>Players Waiting ({renderPlayerCount()})</p>
        <ul>
          {gameInfo.player_names && gameInfo.player_names.map((player_name, index) => (
            <li key={index}>{player_name}</li>
          ))}
        </ul>
      </div>

      {!player && renderPlayerNameForm()}
      {player && renderPlayerWaiting()}
    </div>
  )
}

export default Lobby
