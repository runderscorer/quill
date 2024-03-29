import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  const [player, setPlayer] = useState(null)

  const addPlayer = (player) => {
    console.log('Add player', player)
    setPlayer(player)
    localStorage.setItem('player', JSON.stringify(player))
  }

  return (
    <Outlet context={{ addPlayer }}/>
  )
}

export default Root
