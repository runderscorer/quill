import { useState } from 'react'
import { useOutletContext } from "react-router-dom"
import Loading from "../../components/Loading"
import Superlatives from './Superlatives'
import API from "../../helpers/API"
import './GameOver.css'

function GameOver() {
  const context = useOutletContext()
  const { 
    gameInfo, 
    player,
    navigate 
  } = context

  const [
    errorMessage,
    setErrorMessage
  ] = useState(null)

  const renderGameOver = () => {
    const { 
      winners, 
      not_winners: notWinners,
      most_liked: mostLiked,
      funniest,
      smartest
    } = gameInfo

    const handleClick = () => {
      API.restartGame(
        gameInfo.room_code, 
        player.id
      ).then(response => {
        console.log(response)
      }).catch(error => {
        setErrorMessage(error.response.data.error_message)
      })
    }

    const handleLeaveGame = () => {
      API.leaveGame(player.id).then(response => {
        sessionStorage.removeItem('player')
        sessionStorage.removeItem('game')

        navigate('/')
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
        <div className='winners-and-players'>
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
        </div>

        {
          (mostLiked || funniest || smartest) && 
            <Superlatives
              mostLiked={mostLiked}
              funniest={funniest}
              smartest={smartest}
            />
        }

        <p className='error'>
          {errorMessage}
        </p>
        <div className='actions'>
          {player && player.host && (
            <button 
              className='primary-btn'
              type='button'
              onClick={handleClick}
            >
              Play Again? 
            </button>
          )}
          <button 
            className="secondary-btn"
            onClick={handleLeaveGame}
          >
            Leave Game
          </button>
        </div>
      </div>
    )
  }

  return gameInfo ? renderGameOver() : <Loading />
}

export default GameOver
