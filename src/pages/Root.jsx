import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ActionCable from 'actioncable'

const Root = () => {
  const getPlayer = () => {
    return JSON.parse(localStorage.getItem('player')) || null
  }

  const getGame = () => {
    return JSON.parse(localStorage.getItem('game')) || null
  } 

  const [player, setPlayer] = useState(getPlayer)
  const [gameInfo, setGame] = useState(getGame)
  const [gameSubscription, setGameSubscription] = useState(null)

  const addPlayer = (player) => {
    console.log('Add player', player)
    setPlayer(player)
    localStorage.setItem('player', JSON.stringify(player))
  }

  const removePlayer = () => {
    console.log('Remove player')
    setPlayer(null)
    localStorage.removeItem('player')
  }

  const setGameInfo = (game) => {
    console.log('Set game', game)
    setGame(game)
    localStorage.setItem('game', JSON.stringify(game))
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
      }
    })

    setGameSubscription(gameChannel)

    return () => {
      cable.subscriptions.remove(gameChannel)
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
      gameInfo
    }}/>
  )
}

export default Root
