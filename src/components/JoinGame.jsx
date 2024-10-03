import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../helpers/API"
import CopyGenerator from "../helpers/CopyGenerator"
import './JoinGame.css'

function JoinGame() {
  const context = useOutletContext()
  const {
    addPlayer,
    gameInfo,
  } = context

  const [
    playerNameLabel,
    setPlayerNameLabel
  ] = useState('')

  const [
    playerName,
    setPlayerName
  ] = useState('')

  const [
    errorMessage,
    setErrorMessage
  ] = useState(null)

  useEffect(() => {
    setPlayerNameLabel(CopyGenerator.playerNameLabel())
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
        setErrorMessage(error.response.data.error[0])
      })
  }

  return (
    <div className='signup'>
      <p className='error'>
        {errorMessage}
      </p>
      <form onSubmit={handleSubmit}>
        <p className='bold'>
          Scribe your name to begin, o {playerNameLabel}
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
    </div>
  )
}

export default JoinGame;