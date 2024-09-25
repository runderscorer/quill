import { useOutletContext } from "react-router-dom"
import ResponseForm from "./ResponseForm"
import Responses from "./Responses"
import { render } from "react-dom"

function GameScreen() {
  const context = useOutletContext()
  const { gameInfo } = context
  const { current_prompt: currentPrompt, round, status } = gameInfo
  const { responses } = currentPrompt

  const renderResponseForm = () => (
    status === 'gathering_responses' && <ResponseForm />
  )

  const renderResponses = () => (
    status === 'gathering_votes' && <Responses responses={responses.data} />
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
    </div>
  )
}

export default GameScreen