import { useOutletContext } from "react-router-dom"
import Loading from "../../components/Loading"
import API from "../../helpers/API"
import './GameOver.css'

function GameOver() {
  const context = useOutletContext()
  const { gameInfo, player } = context

  const renderGameOver = () => {
    const { winners, not_winners: notWinners } = gameInfo

    const handleClick = () => {
      API.restartGame(
        gameInfo.room_code, 
        player.id
      ).then(response => {
        console.log(response)
      })
    }

    return (
      <div className='game-over'>
        <div className='header'>
          <h1>
            Lo and behold,
          </h1>
          <span className='uppercase'>
            The final tally of triumphs and trials!
          </span>
        </div>
        <div className='winners'>
          {
            winners && winners.map(winner => (
              <div 
                className='player'
                key={winner.id}
              >
                <div className='name'>
                  <span>
                    {winner.name}
                  </span>
                </div>
                <div className='dots' />
                <div className='score'>
                  {`${winner.score}`}
                  <span>
                    points
                  </span>
                </div>
              </div>
            ))
          }
        </div>
        <div className='players'>
          {
            notWinners && notWinners.map(player => (
              <div 
                className='player'
                key={player.id}
              >
                <div className='name'>
                  <span>
                    {player.name}
                  </span>
                </div>
                <div className='dots' />
                <div className='score'>
                  {`${player.score}`}
                  <span>
                    points
                  </span>
                </div>
              </div>
            ))
          }
        </div>

        {
          player.host && 
          <div className='actions'>
            <button 
              className='primary-btn'
              type='button'
              onClick={handleClick}
            >
              Play Again? 
            </button>
          </div>
        }
      </div>
    )
  }

  return gameInfo ? renderGameOver() : <Loading />
}

export default GameOver