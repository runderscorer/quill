import Root from './pages/Root'
import Home from './pages/home'
import Lobby from './pages/lobby'
import Game from './pages/game'

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
      }
    ]
  }
]
