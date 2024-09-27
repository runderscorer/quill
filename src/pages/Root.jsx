import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ActionCable from 'actioncable'
import API from '../helpers/API'

const Root = () => {
  const navigate = useNavigate()

  const getPlayer = () => {
    return JSON.parse(sessionStorage.getItem('player')) || null
  }

  const getGame = () => {
    return JSON.parse(sessionStorage.getItem('game')) || null
  } 

  const [player, setPlayer] = useState(getPlayer)
  const [gameInfo, setGameInfo] = useState(getGame)
  const [gameChannel, setGameChannel] = useState(null)
  const [isHost, setIsHost] = useState(false)

  const addPlayer = (newPlayer) => {
    setPlayer(newPlayer)
    sessionStorage.setItem('player', JSON.stringify(newPlayer))
  }

  const removePlayer = () => {
    console.log('Remove player')
    setPlayer(null)
    sessionStorage.removeItem('player')
  }

  const handleSetGameInfo = (game) => {
    setGameInfo(game)
    sessionStorage.setItem('game', JSON.stringify(game))
  }

  const createGameSubscription = () => {
    const cable = ActionCable.createConsumer(`${import.meta.env.VITE_BACKEND_WS_URL}/cable`)
    const gameSubscription = cable.subscriptions.create({ channel: 'GameChannel', room_code: gameInfo.room_code }, {
      connected: () => {
        console.log('connected')
        gameSubscription.setPlayerId(player.id)
      },
      received: (data) => {
        handleSetGameInfo(data.game.data.attributes)
        data.type === 'GAME_STARTED' && navigate(`/games/${gameInfo.room_code}/play`)
      },
      disconnected: () => {
        console.log('disconnected')
      },
      setPlayerId: (playerId) => {
        gameSubscription.perform('set_player_id', { player_id: playerId })
      }
    })

    setGameChannel(gameSubscription)

    return () => {
      gameSubscription.unsubscribe()
    }
  }

  const handleSetIsHost = () => {
    player && gameInfo && setIsHost(player.id === gameInfo.host.id)    
  }

  useEffect(() => {
    if (gameInfo && !gameChannel) {
      createGameSubscription()
    }
  })

  return (
    <Outlet context={{ 
      addPlayer,
      removePlayer,
      player,
      handleSetGameInfo,
      handleSetIsHost,
      gameInfo,
      gameChannel,
      isHost
    }}/>
  )
}

export default Root
