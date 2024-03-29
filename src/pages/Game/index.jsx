import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import ActionCable from 'actioncable'
import './Game.css'
import API from '../../helpers/API'

function Game() {
  const navigate = useNavigate()

  const context = useOutletContext()

  const { 
    addPlayer,
    removePlayer,
    player,
    setGameInfo,
    gameInfo
  } = context

  const [
    playerName,
    setPlayerName
  ] = useState('')

  useEffect(() => {
    const cable = ActionCable.createConsumer(`${import.meta.env.VITE_BACKEND_WS_URL}/cable`)
    const gameChannel = cable.subscriptions.create({ channel: 'GameChannel', room_code: gameInfo.room_code }, {
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
    API.createPlayer(playerName, gameInfo.room_code)
      .then(response => {
        addPlayer(response.data.data.attributes)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleLeaveGame = () => {
    API.leaveGame(player.id, gameInfo.room_code)
      .then(response => {
        removePlayer()
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
      <p>Waiting for {gameInfo.host.name} to start the game...</p>
      <p>{player.name} is ready</p>
    
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

export default Game
