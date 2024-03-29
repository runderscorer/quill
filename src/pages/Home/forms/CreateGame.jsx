import { useState } from 'react'
import API from '../../../helpers/API'
import './CreateGame.css'

function CreateGame({ handleGoBack, setErrorMessage }) {
  const [
    roomCode,
    setRoomCode
  ] = useState('')

  const handleRoomCodeChange = (e) => {
    setErrorMessage(null)
    setRoomCode(e.target.value)
  }

  const [
    playerName,
    setPlayerName
  ] = useState('')

  const handleNameChange = (e) => {
    setPlayerName(e.target.value)
  } 

  const formIsValid = () => {
    return playerName.length > 0 && roomCode.length > 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formIsValid()) {
      setErrorMessage('Please enter a player name and room code')
      return
    }

    API.createGame(playerName, roomCode)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        setErrorMessage(error.response.data.errors[0])
      })
  }

  return (
    <form className="flex-col flex-center" onSubmit={handleSubmit}>
      <input
        className="mb10"
        type="text"
        placeholder="Enter Player Name"
        value={playerName}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={handleRoomCodeChange}
      />
      <div className="actions">
        <button type="submit">
          Create Game
        </button>
        <button 
          className="secondary-btn"
          onClick={handleGoBack}
          type="button" 
        >
          Back
        </button>
      </div>
    </form>
  )
}

export default CreateGame
