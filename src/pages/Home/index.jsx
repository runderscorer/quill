import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CreateGame from './forms/CreateGame'
import './Home.css'
import API from '../../helpers/API'
import { motion } from 'motion/react'
import { slideDownFade } from '../../animations'
import ErrorMessage from '../../components/ErrorMessage'

function Home() {
  const context = useOutletContext()
  const { handleSetGameInfo, navigate } = context

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
  ] = useState(null)

  const handleChange = (e) => {
    setRoomCode(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    API.findGame(roomCode)
      .then(response => {
        handleSetGameInfo(response.data.data.attributes)
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
      <div className="actions">
        <button type="button" onClick={() => setAction('create')}>
          Create Game
        </button>
        <button type="button" onClick={() => setAction('find')}>
          Find Game
        </button>
      </div>
    )
  }

  const renderFindGame = () => {
    return (
      <motion.form 
        className="flex-col flex-center" 
        onSubmit={handleSubmit}
        {...slideDownFade}
      >
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
      </motion.form>
    )
  }

  return (
    <div className="start">
      <div>
        <h1 className="title">
          Prose&nbsp;
          <span>
            and
          </span> 
          &nbsp;Cons
        </h1>
        <div className="error">
          {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        </div>
        {action === '' && renderButtons()}
        {action === 'find' && renderFindGame()}
        {
          action === 'create' && 
            <CreateGame 
              handleGoBack={handleGoBack} 
              setErrorMessage={setErrorMessage}
            />
        }
      </div>
    </div>
  )
}

export default Home
