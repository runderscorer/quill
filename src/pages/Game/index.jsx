import { useParams, useOutletContext } from 'react-router-dom'
import './Game.css'
import Responses from './Responses'
import ResponseForm from './ResponseForm'

function Game() {
  const context = useOutletContext()
  const { gameInfo } = context
  const { current_prompt: currentPrompt, round } = gameInfo

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
      <Responses />
      <ResponseForm />
    </div>
  )
}

export default Game
