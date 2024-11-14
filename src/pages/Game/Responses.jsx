import { useEffect, useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import Response from './Response'
import CopyGenerator from '../../helpers/CopyGenerator'
import PlayerResponse from './PlayerResponse'
import { motion } from 'motion/react'
import { slideUpFade } from '../../animations'

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

  const chooseWisely = CopyGenerator.chooseWisely()
  const chooseWiselyRef = useRef(chooseWisely)

  const choseWisely = CopyGenerator.choseWisely()
  const choseWiselyRef = useRef(choseWisely)

  const playerResponse = responses.find(response => response.attributes.player_id === playerId)

  const excludePlayerResponse = () => responses.filter(response => response.attributes.player_id !== playerId)
  
  const getVotedResponseId = () => {
    const votedId = votes.data.find(vote => vote.attributes.player_id === playerId)
    const responseId = votedId && votedId.attributes.response_id

    setVotedResponseId(responseId)
  } 

  const renderResponsesHeader = () => {
    if (votedResponseId) {
      return choseWiselyRef.current
    } else {
      return chooseWiselyRef.current
    }
  }

  useEffect(() => {
    getVotedResponseId()
  })

  return (
    <motion.div 
      className='responses-container'
      {...slideUpFade}
    >
      <div>
        {
          playerResponse && 
          <div>
            <p>
              You wrote:
            </p>
            <PlayerResponse response={playerResponse.attributes} />
          </div>
        }
      </div>
      <div>
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
    </motion.div>
  )
}

export default Responses
