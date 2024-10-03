import API from "../../helpers/API"

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
          <span>
            + 300
          </span>
        </div>
      )
    } else {
      return (
        <div className='points'>
          <span>
            {`+ 100 ${numberOfVotes > 1 ? `x ${numberOfVotes}` : ''}`} 
          </span>
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
                <span>
                  {`Author: ${response.attributes.player_name}`}
                </span>
                {
                  response.attributes.votes.data.length > 0 &&
                    <span>
                      {`Picked by: ${displayVoterNames(response.attributes.votes.data)}`}
                    </span>
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
