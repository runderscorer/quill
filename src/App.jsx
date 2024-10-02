import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import './index.css'

const router = createHashRouter(routes)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App