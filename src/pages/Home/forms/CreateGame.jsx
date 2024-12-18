import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import API from '../../../helpers/API'
import './CreateGame.css'
import { motion } from 'motion/react'
import { slideDownFade } from '../../../animations'

function CreateGame({ handleGoBack, setErrorMessage }) {
  const context = useOutletContext()
  const { 
    handleSetGameInfo, 
    navigate,
    addPlayer 
  } = context

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
      setErrorMessage('Please enter a player name and room code.')
      return
    }

    API.createGame(playerName, roomCode)
      .then(response => {
        const game = response.data.data.attributes
        handleSetGameInfo(game)
        addPlayer(game.host)
        navigate(`/games/${roomCode}`)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error_message)
      })
  }

  return (
    <motion.form 
      className="flex-col flex-center" 
      onSubmit={handleSubmit}
      {...slideDownFade}
    >
      <input
        className="mb10"
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={handleRoomCodeChange}
      />
      <input
        type="text"
        placeholder="Enter Player Name"
        value={playerName}
        onChange={handleNameChange}
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
    </motion.form>
  )
}

export default CreateGame
