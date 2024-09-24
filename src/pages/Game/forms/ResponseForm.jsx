import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import API from '../../../helpers/API'

function ResponseForm() {
  const [
    responseText,
    setResponseText
  ] = useState('')

  const context = useOutletContext()

  const { gameInfo, player } = context
  const { room_code: roomCode } = gameInfo

  const handleChange = (e) => {
    setResponseText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { id: playerId } = player

    API.submitResponse(
      responseText,
      playerId,
      roomCode
    )
  }

  return (
    <div>
      <div>
        <p>
          Complete the verse!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}
          name='response'
          value={responseText}
        />
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ResponseForm

