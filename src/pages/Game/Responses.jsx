import { useOutletContext } from 'react-router-dom'
import Response from './Response'

function Responses({ responses }) {
  const context = useOutletContext()
  const { player: { id: playerId } } = context

  const excludePlayerResponse = () => {
    return responses.filter(response => response.attributes.player_id !== playerId)
  }

  return (
    <div className='responses-container'>
      <p>Each choice is a seed -- nurture it wisely and select a response below:</p>
      <div>
        {excludePlayerResponse().map(response =>
          <Response 
            key={`response-${response.id}`}
            response={response.attributes} 
          />
        )}
      </div>
    </div>
  )
}

export default Responses
