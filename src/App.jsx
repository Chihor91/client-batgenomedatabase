// Library Imports
import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import Taxonomy from './pages/Taxonomy/Taxonomy'
import TaxEntry from './pages/Taxonomy/TaxEntry'
import Dashboard from './pages/Dashboard/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './components/ui/theme-provider'
import PrivateRoutes from './utils/PrivateRoutes'

import './App.css'


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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
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
        "left-[200px] w-[calc(100%-200px)]" :
        "left-0"
      }`}>
        <NavBar showSideBar={showSidebar} />
        <div className={`mt-[64px] h-full transition-all ${
          showSidebar ?
          "w-[calc(100vw-200px)]" :
          "w-[100vw]"
        }`} onClick={() => setShowSidebar(false)}>
          <Outlet />
        </div>
      </div>
    </AuthProvider>
    </ThemeProvider>
  )
}


export default App
