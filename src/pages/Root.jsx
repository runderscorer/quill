import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  const getPlayer = () => {
    return JSON.parse(localStorage.getItem('player')) || null
  }

  const getGame = () => {
    return JSON.parse(localStorage.getItem('game')) || null
  } 

  const getHost = () => {
    const game = getGame()

    if (!game) {
      return null
    }

    return game.host  
  }

  const [player, setPlayer] = useState(getPlayer)
  const [gameInfo, setGame] = useState(getGame)
  const [host, setHost] = useState(getHost)

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

  return (
    <Outlet context={{ 
      addPlayer,
      removePlayer,
      player,
      setGameInfo,
      gameInfo,
      setHost,
      host
    }}/>
  )
}

export default Root
