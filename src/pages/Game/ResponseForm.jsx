import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import API from '../../helpers/API'

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
    ).then(response => {
      console.log('responses form response: ', response)
      setResponseText('') 
    })
  }

  return (
    <div className='response-form'>
      <div>
        <p>
          Let your fingers dance with the rhythm of your thoughts -- complete the poem!  
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}
          name='response'
          value={responseText}
        />
        <div className='actions'>
          <button type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResponseForm

