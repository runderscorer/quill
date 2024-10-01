import { useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import './Game.css'
import Helper from '../../helpers/Helper'
import GameScreen from './GameScreen'
import Loading from '../../components/Loading'

function Game() {
  const context = useOutletContext()
  const params = useParams()
  const { gameInfo, handleSetGameInfo } = context

  useEffect(() => {
    if (!gameInfo) {
      Helper.findGame(params.roomCode, handleSetGameInfo)
    }
  }, [])

  return (
    <Loading ready={!!gameInfo}>
      <GameScreen />
    </Loading>
  )
}

export default Game
