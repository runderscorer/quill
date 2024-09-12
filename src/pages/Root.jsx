import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ActionCable from 'actioncable'
import API from '../helpers/API'

const Root = () => {
  const getPlayer = () => {
    console.log('in getPlayer')
    return JSON.parse(sessionStorage.getItem('player')) || null
  }

  const getGame = () => {
    console.log('in getGame')
    return JSON.parse(sessionStorage.getItem('game')) || null
  } 

  const [player, setPlayer] = useState(getPlayer)
  const [gameInfo, setGameInfo] = useState(getGame)
  const [gameSubscription, setGameSubscription] = useState(null)
  const [isHost, setIsHost] = useState(false)

  const checkIfHost = (player) => {
    return false
    // const {host} = gameInfo

    // return host && host.id == player.id
  }

  const addPlayer = (player) => {
    console.log('Add player', player)
    setPlayer(player)
    console.log('gameSubscription: ', gameSubscription)
    sessionStorage.setItem('player', JSON.stringify(player))
  }

  const removePlayer = () => {
    console.log('Remove player')
    setPlayer(null)
    sessionStorage.removeItem('player')
  }

  const handleSetGameInfo = (game) => {
    console.log('Set game for:', game)
    setGameInfo(game)
    console.log('game is set: ', gameInfo)
    sessionStorage.setItem('game', JSON.stringify(game))
  }

  const createGameSubscription = () => {
    const cable = ActionCable.createConsumer(`${import.meta.env.VITE_BACKEND_WS_URL}/cable`)
    const gameChannel = cable.subscriptions.create({ channel: 'GameChannel', room_code: gameInfo.room_code }, {
      connected: () => {
        console.log('connected')
      },
      received: (data) => {
        console.log('received: ', data)
        setGameInfo(data.game.data.attributes)
      },
      disconnected: () => {
        console.log('disconnected')
      },
      setPlayerId: (playerId) => {
        gameChannel.perform('set_player_id', { player_id: playerId })
      }
    })

    console.log('gameChannel: ', gameChannel)

    setGameSubscription(gameChannel)

    return () => {
      gameChannel.unsubscribe()
    }
  }

  const handleSetIsHost = () => {
    console.log('in handleSetIsHost...')
    console.log('in handleSetIsHost player', player)
    console.log('in handleSetIsHost gameInfo', gameInfo)
    player && gameInfo && setIsHost(player.id === gameInfo.host.id)    
  }

  useEffect(() => {
    if (gameInfo && !gameSubscription) {
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
      gameSubscription,
      isHost
    }}/>
  )
}

export default Root
