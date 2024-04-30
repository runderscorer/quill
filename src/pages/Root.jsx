import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ActionCable from 'actioncable'
import API from '../helpers/API'

const Root = () => {
  const getPlayer = () => {
    return JSON.parse(sessionStorage.getItem('player')) || null
  }

  const getGame = () => {
    return JSON.parse(sessionStorage.getItem('game')) || null
  } 

  const [player, setPlayer] = useState(getPlayer)
  const [gameInfo, setGame] = useState(getGame)
  const [gameSubscription, setGameSubscription] = useState(null)

  const addPlayer = (player) => {
    console.log('Add player', player)
    setPlayer(player)
    gameSubscription.setPlayerId(player.id)
    sessionStorage.setItem('player', JSON.stringify(player))
  }

  const removePlayer = () => {
    console.log('Remove player')
    setPlayer(null)
    sessionStorage.removeItem('player')
  }

  const setGameInfo = (game) => {
    console.log('Set game', game)
    setGame(game)
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

    setGameSubscription(gameChannel)

    return () => {
      gameChannel.unsubscribe()
    }
  }

  useEffect(() => {
    if (gameInfo && !gameSubscription) {
      createGameSubscription()
    }
  }, [gameInfo, gameSubscription])

  return (
    <Outlet context={{ 
      addPlayer,
      removePlayer,
      player,
      setGameInfo,
      gameInfo,
      gameSubscription
    }}/>
  )
}

export default Root
