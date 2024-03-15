import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Game.css'
import API from '../../helpers/API'

function Game() {
  const location = useLocation()

  const [
    playerName, 
    setPlayerName
  ] = useState('')

  const [
    playerId,
    setPlayerId
  ] = useState(null)

  const { state } = location
  const { data: { attributes } } = state
  const {
    room_code: roomCode,
    player_count: playerCount
  } = attributes

  const handleChange = (e) => {
    setPlayerName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    API.createPlayer(playerName, roomCode)
      .then(response => {
        setPlayerId(response.data.data.attributes.id)
      })
      .catch(error => {
        console.error(error)
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
      <p>Waiting for game to start...</p>
      <p>{playerName} is ready</p>
    </div>
  ) 

  return (
    <div className='game'>
      <div>
        <p>Room Code: {roomCode}</p>
        <p>Number of Players Waiting: {playerCount}</p>
      </div>

      {!playerId && renderPlayerNameForm()}
      {playerId && renderPlayerWaiting()}
    </div>
  )
}

export default Game
