import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import ActionCable from 'actioncable'
import './Game.css'
import API from '../../helpers/API'

function Game() {
  const location = useLocation()
  const { state } = location
  const { data: { attributes }, hostId } = state
  const {
    room_code: roomCode,
  } = attributes

  const hostName = 'testhost'
  const navigate = useNavigate()
  const context = useOutletContext()

  const [
    playerName,
    setPlayerName
  ] = useState('')

  const [
    gameInfo,
    setGameInfo
  ] = useState({})

  useEffect(() => {
    const cable = ActionCable.createConsumer(`${import.meta.env.VITE_BACKEND_WS_URL}/cable`)
    const gameChannel = cable.subscriptions.create({ channel: 'GameChannel', room_code: roomCode }, {
      connected: () => {
        console.log('connected')
      },
      received: (data) => {
        console.log('received: ', data)
        setGameInfo(data.game.data.attributes)
      },
      disconnected: () => {
        console.log('disconnected')
      }
    })

    return () => {
      cable.subscriptions.remove(gameChannel)
    }
  }, [])
  
  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    API.createPlayer(playerName, roomCode)
      .then(response => {
        context.addPlayer(response.data.data.attributes)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleLeaveGame = () => {
    API.leaveGame(playerId, roomCode)
      .then(response => {
        navigate('/')
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

  const renderPlayerWaiting = () => (
    <div>
      <p>Waiting for {hostName} to start the game...</p>
      <p>{playerName} is ready</p>
    
      {/* {
        hostId === playerId && (
          <button type="button" onClick={handleLeaveGame}>
            Start Game
          </button>
        )
      } */}

      <button type="button" onClick={handleLeaveGame}>
        Leave Game
      </button>
    </div>
  ) 

  const renderPlayerCount= () => (
    gameInfo.player_names ? gameInfo.player_names.length : 0
  )

  return (
    <div className='game'>
      <div>
        <p>Room Code: {roomCode}</p>
      </div>

      <div>
        <p>Players Waiting ({renderPlayerCount()})</p>
        <ul>
          {gameInfo.player_names && gameInfo.player_names.map((player_name, index) => (
            <li key={index}>{player_name}</li>
          ))}
        </ul>
      </div>

      {renderPlayerNameForm()}
      {/* {!playerId && renderPlayerNameForm()} */}
      {/* {playerId && renderPlayerWaiting()} */}
    </div>
  )
}

export default Game
