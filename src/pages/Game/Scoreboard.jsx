import { useOutletContext } from "react-router-dom"

function Scoreboard({ responses }) {
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

  return (
    <div className='scoreboard'>
      {
        responses.map(response => 
          <div>
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
    </div>
  )
}

export default Scoreboard
