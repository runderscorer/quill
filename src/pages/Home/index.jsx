import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import API from '../../helpers/API'

function Home() {
  let navigate = useNavigate()

  const [
    roomCode,
    setRoomCode
  ] = useState('')

  const [
    action,
    setAction
  ] = useState('')

  const [
    errorMessage,
    setErrorMessage
  ] = useState('')

  const handleChange = (e) => {
    setRoomCode(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    API.findGame(roomCode)
      .then(response => {
        navigate(`/games/${roomCode}`, { state: response.data })
      })
      .catch(error => {
        setErrorMessage(error.response.data.errors)
      })
  }

  const handleGoBack = () => { 
    setAction('')
    setErrorMessage('')
    setRoomCode('')
  }

  const renderButtons = () => {
    return (
      <>
        <button className="mb10" type="button" onClick={() => setAction('find')}>
          Find Game
        </button>
        <button className="mb10" type="button" onClick={() => setAction('create')}>
          Create Game
        </button>
      </>
    )
  }

  const renderFindGame = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={handleChange}
        />
        <div className="actions">
          <button type="submit">
            Find Game
          </button>
          <button 
            className="secondary-btn"
            onClick={handleGoBack}
            type="button" 
          >
            Back
          </button>
        </div>
      </>
    )
  }

  const renderCreateGame = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={handleChange}
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
      </>
    )
  }

  return (
    <div className="start">
      <div>
        <h1 className="mb40">Prose & Cons</h1>
        <p className="error">
          {errorMessage}
        </p>
        <form onSubmit={handleSubmit}>
          {action === '' && renderButtons()}
          {action === 'find' && renderFindGame()}
          {action === 'create' && renderCreateGame()}
        </form>
      </div>
    </div>
  )
}

export default Home
