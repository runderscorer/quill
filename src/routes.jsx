import Root from './pages/Root'
import Home from './pages/Home'
import Lobby from './pages/Lobby'
import Game from './pages/Game'

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
