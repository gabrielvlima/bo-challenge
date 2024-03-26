import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import AuthTemplate from '../templates/Auth'

export const authRoute = createBrowserRouter([
  {
    path: '/',
    element: <AuthTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])
