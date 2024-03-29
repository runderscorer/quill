import Root from './pages/Root'
import Game from './pages/Game'
import Home from './pages/Home'

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
        element: <Game />
      }
    ]
  }
]
