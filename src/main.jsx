import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sign from './auth/sign-in/index.jsx'
import Home from './Home/index.jsx'
import Dashboar from './Dashboard/index.jsx'
import Land from './landing/index.jsx'
import EditResume from './Dashboard/resume/[ResumeId]/edit/index.jsx'

import View from "./my-resume/[id]/View.jsx"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <App/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path: 'dashboard',
        element: <Dashboar/>
      },
      {
        path: 'dashboard/resume/:ResumeId/edit',
        element: <EditResume/>
      }
    ]
  },
  {
      path:'/landing',
      element: <Land/>
  },
  {
    path: '/auth/sign-in',
    element: <Sign/>
  },
  {
    path:'/my-resume/:id/view',
    element:<View/>
  }
])
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/landing">
  <RouterProvider router={router}/>
  </ClerkProvider>,
)
