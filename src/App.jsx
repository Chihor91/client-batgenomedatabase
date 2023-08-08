// Library Imports
import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from './pages/Home'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/AuthContext'

// Asset Imports
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Style Imports
import './App.css'

// Server API address
axios.defaults.baseURL = "http://127.0.0.1:8000"
// axios.defaults.baseURL = "http://202.92.144.124:8000/";

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const Root = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Outlet />
    </AuthProvider>
  )
}


export default App
