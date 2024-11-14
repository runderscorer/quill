import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './index.css'
import './assets/fonts/PirataOne-Regular.ttf'
import './assets/fonts/GoudyBookletter1911-Regular.ttf'

const router = createHashRouter(routes)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App