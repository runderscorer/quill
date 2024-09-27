import { useOutletContext } from "react-router-dom"
import ResponseForm from "./ResponseForm"
import Responses from "./Responses"
import RoundResults from "./RoundResults"
import Scoreboard from "./Scoreboard"

function GameScreen() {
  const context = useOutletContext()
  const { gameInfo, player } = context
  const { 
    current_prompt: currentPrompt, 
    players, 
    room_code: roomCode,
    round, 
    status,
    max_rounds: maxRounds 
  } = gameInfo
  const { responses } = currentPrompt

  const renderResponseForm = () => (
    status === 'gathering_responses' && <ResponseForm />
  )

  const renderResponses = () => (
    status === 'gathering_votes' && <Responses responses={responses.data} />
  )

  const renderRoundResults = () => (
    status === 'viewing_scores' && 
      <RoundResults 
        finalRound={round === maxRounds}
        player={player}
        responses={responses.data} 
        roomCode={roomCode}
      />
  )

  const renderFinalScores = () => (
    status === 'game_over' &&
      <Scoreboard />
  )

  return (
    <div>
      <div className='game'>
        <div className='underline'>
          <p className='bold'>
            {`Round ${round}`}
          </p>
          <p>
            {`by ${currentPrompt.author}`}
          </p>
        </div>
        <div>
          <p className='italic'>
            {currentPrompt.text}
          </p>
          <p>
            ...
          </p>
        </div>
      </div>
      {renderResponses()}
      {renderResponseForm()}
      {renderRoundResults()}
      {renderFinalScores()}
    </div>
  )
}

export default GameScreen