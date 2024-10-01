import { useEffect } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import Helper from "../../helpers/Helper"
import Loading from "../../components/Loading"
import LobbyScreen from "./LobbyScreen"

function Lobby() {
  const params = useParams()
  const context = useOutletContext()
  const { gameInfo, handleSetGameInfo } = context

  useEffect(() => {
    if (!gameInfo) {
      Helper.findGame(params.roomCode, handleSetGameInfo)
    }
  }, [])

  return (
    <Loading ready={!!gameInfo}>
      <LobbyScreen />
    </Loading>
  )
}

export default Lobby
