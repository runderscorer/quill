import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import ResponseForm from "./ResponseForm"
import Responses from "./Responses"
import RoundResults from "./RoundResults"
import JoinGame from "../../components/JoinGame"
import useTypingEffect from '../../helpers/useTypingEffect'

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

  useEffect(() => {
    const { status } = gameInfo

    if (status === 'game_over') {
      context.navigate(`/games/${roomCode}/game_over`)
    }
  }, [gameInfo])

  const renderPlayerNameForm = () => (
    status !== 'waiting' && !player && <JoinGame />
  )

  const renderResponseForm = () => (
    status === 'gathering_responses' && player && <ResponseForm />
  )

  const renderResponses = () => (
    status === 'gathering_votes' && player && <Responses responses={responses.data} />
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

  const { text: animatedPrompt } = useTypingEffect(currentPrompt.text)

  return (
    <div>
      {
        player && (
          <div className='game'>
            <div className='underline'>
              <p className='round'>
                {`Round ${round}`}
              </p>
              <p className='bold'>
                {`"${currentPrompt.title}" by ${currentPrompt.author}`}
              </p>
            </div>
            <div className='prompt'>
              <p className='italic'>
                {animatedPrompt}
              </p>
              <p>
                ...
              </p>
            </div>
          </div>
        )
      }
      {renderPlayerNameForm()}
      {renderResponses()}
      {renderResponseForm()}
      {renderRoundResults()}
    </div>
  )
}

export default GameScreen