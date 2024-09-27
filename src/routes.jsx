import Root from './pages/Root'
import Home from './pages/home'
import Lobby from './pages/lobby'
import Game from './pages/game'
import GameOver from './pages/game_over'

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/games/:roomCode',
        element: <Lobby />
      },
      {
        path: '/games/:roomCode/play',
        element: <Game />
      },
      {
        path: '/games/:roomCode/game_over',
        element: <GameOver />
      }
    ]
  }
]
