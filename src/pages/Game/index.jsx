import { useParams, useOutletContext } from 'react-router-dom'

function Game() {
  const params = useParams()
  const context = useOutletContext()

  return (
    <div>
      <h1>Game in progress</h1>
    </div>
  )
}

export default Game
