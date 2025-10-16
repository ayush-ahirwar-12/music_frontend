import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'
import Home from '../pages/Home'
import Upload from '../pages/Upload'

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/Authentication",
            element:<AuthLayout/>
        },
        {
            path:"/Upload",
            element:<Upload/>
        }
    ])



  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter;