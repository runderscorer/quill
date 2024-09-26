import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Response from './Response'
import CopyGenerator from '../../helpers/CopyGenerator'

function Responses({ responses }) {
  const context = useOutletContext()
  const { 
    player: { id: playerId },
    gameInfo
  } = context
  const { current_prompt: currentPrompt } = gameInfo
  const { votes } = currentPrompt

  const [
    votedResponseId,
    setVotedResponseId
  ] = useState(null)

  const excludePlayerResponse = () => {
    return responses.filter(response => response.attributes.player_id !== playerId)
  }

  const getVotedResponseId = () => {
    const votedId = votes.data.find(vote => vote.attributes.player_id === playerId)
    const responseId = votedId && votedId.attributes.response_id

    setVotedResponseId(responseId)
  } 

  const renderResponsesHeader = () => {
    if (votedResponseId) {
      return CopyGenerator.choseWisely()
    } else {
      return CopyGenerator.chooseWisely()
    }
  }

  useEffect(() => {
    getVotedResponseId()
  })

  return (
    <div className='responses-container'>
      <p>
        {renderResponsesHeader()}
      </p>
      <div>
        {excludePlayerResponse().map(response =>
          <Response 
            disabled={!!votedResponseId}
            key={`response-${response.id}`}
            response={response.attributes} 
            votedResponseId={votedResponseId}
          />
        )}
      </div>
    </div>
  )
}

export default Responses
