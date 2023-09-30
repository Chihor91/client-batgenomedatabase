// Library Imports
import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Project from '@/pages/Project'
import Source from '@/pages/Source'
import AddSource from '@/pages/Source/AddSource'
import NavBar from '@/components/NavBar/NavBar'
import SideBar from '@/components/SideBar/SideBar'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/components/ui/theme-provider'

// Asset Imports

// Style Imports
import './App.css'
import PrivateRoutes from '@/utils/PrivateRoutes'
import AdminRoutes from '@/utils/AdminRoutes'

// Server API address
axios.defaults.baseURL = "http://127.0.0.1:8000"
// axios.defaults.baseURL = "http://202.92.144.124:8000/";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/project" element={<Project />} />
            <Route path="/source" element={<Source />} />
            <Route path="/source/add" element={<AddSource />} />
          </Route>
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
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <AuthProvider>
      <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className={`fixed transition-all ${
        showSidebar ? 
        "left-[200px]" :
        "left-0"
      }`}>
        <NavBar showSideBar={showSidebar} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
    </ThemeProvider>
  )
}


export default App
