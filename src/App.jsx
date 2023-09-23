// Library Imports
import { useEffect, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Project from './pages/Project'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './components/ui/theme-provider'

// Asset Imports
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Style Imports
import './App.css'
import Taxonomy from './pages/Taxonomy/Taxonomy'
import TaxEntry from './pages/Taxonomy/TaxEntry'
import PrivateRoutes from './utils/PrivateRoutes'

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
            <Route path="/domain" element={<Taxonomy rank={"domain"} />} />
            <Route path="/kingdom" element={<Taxonomy rank={"kingdom"} />} />
            <Route path="/phylum" element={<Taxonomy rank={"phylum"} />} />
            <Route path="/class" element={<Taxonomy rank={"class"} />} />
            <Route path="/order" element={<Taxonomy rank={"order"} />} />
            <Route path="/family" element={<Taxonomy rank={"family"} />} />
            <Route path="/genus" element={<Taxonomy rank={"genus"} />} />
            <Route path="/species" element={<Taxonomy rank={"species"} />} />
            <Route path="/:rank/:id" element={<TaxEntry/>} />
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
