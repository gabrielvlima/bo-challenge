import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import PublicTemplate from '../templates/Public'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

export const publicRoute = createBrowserRouter([
  {
    path: '/',
    element: <PublicTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <SignIn />,
      },
      {
        path: '/register',
        element: <SignUp />,
      },
    ],
  },
])
