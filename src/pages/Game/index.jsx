import { useParams, useOutletContext } from 'react-router-dom'
import ResponseForm from './forms/ResponseForm'

function Game() {
  const params = useParams()
  const context = useOutletContext()

  const { gameInfo } = context
  const { current_prompt: currentPrompt, round } = gameInfo

  return (
    <div>
      <div>
        <p>
          {`Round ${round}`}
        </p>
      </div>
      <div>
        <p>
          {currentPrompt.text}
        </p>
      </div>
      <div>
        <p>
          {`- ${currentPrompt.author}`}
        </p>
      </div>
      <ResponseForm />
    </div>
  )
}

export default Game
