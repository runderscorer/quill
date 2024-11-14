import API from "../../helpers/API"
import { motion } from 'motion/react'
import { delayedRotatedPopIn } from "../../animations"

function RoundResults({ 
  finalRound,
  player,
  roomCode,
  responses
}) {
  const displayVoterNames = (votes) => (
    votes.map(vote => vote.attributes.player_name).join(', ')
  )

  const displayPoints = (response) => {
    const numberOfVotes = response.attributes.votes.data.length

    if (response.attributes.correct) {
      return (
        <div className='points correct'>
          <motion.span {...delayedRotatedPopIn}>
            + 300
          </motion.span>
        </div>
      )
    } else {
      return (
        <div className='points'>
          <motion.span {...delayedRotatedPopIn}>
            {`+ 100 ${numberOfVotes > 1 ? `x ${numberOfVotes}` : ''}`} 
          </motion.span>
        </div>
      )
    }
  }

  const handleClick = () => {
    API.nextRound(roomCode, player.id)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }

  const renderNextRoundButton = () => (
    player && player.host && (
      <div className='next-round'>
        <button onClick={handleClick}>
          {finalRound ? 'Click and behold the final tally of triumphs and trials' : 'Click and wade into the tides of the next round'}
        </button>
      </div>
    )
  )

  return (
    <div className='round-results'>
      {renderNextRoundButton()}
      {
        responses.map(response => 
          <div key={response.id}>
            <div className={`response ${response.attributes.correct ? 'correct' : ''}`}>
              <p>
                {response.attributes.text}
              </p>
            </div>
            <div className='results'>
              <div className='details'>
                <div>
                  <span>
                    Author:&nbsp;
                  </span>
                  <span className='author'>
                    {response.attributes.player_name}
                  </span>
                </div>
                {
                  response.attributes.votes.data.length > 0 &&
                    <div>
                      <span>
                        Picked by:&nbsp;
                      </span>
                      <span>
                        {displayVoterNames(response.attributes.votes.data)}
                      </span>
                    </div>
                }
              </div>
              {response.attributes.votes.data.length > 0 && displayPoints(response)}
            </div>
          </div>
        )
      }
      {renderNextRoundButton()}
    </div>
  )
}

export default RoundResults
