// Library Imports
import { useEffect, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Domain from './pages/Taxonomy/Domain/Domain'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import { AuthProvider } from './context/AuthContext'

// Asset Imports
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Style Imports
import './App.css'
import Phylum from './pages/Taxonomy/Phylum/Phylum'
import Class from './pages/Taxonomy/Class/Class'
import Order from './pages/Taxonomy/Order/Order'
import Family from './pages/Taxonomy/Family/Family'
import Genus from './pages/Taxonomy/Genus/Genus'
import Species from './pages/Taxonomy/Species/Species'

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
          <Route path="/taxonomy/domain" element={<Domain />} />
          <Route path="/taxonomy/phylum" element={<Phylum />} />
          <Route path="/taxonomy/class" element={<Class />} />
          <Route path="/taxonomy/order" element={<Order />} />
          <Route path="/taxonomy/family" element={<Family />} />
          <Route path="/taxonomy/genus" element={<Genus />} />
          <Route path="/taxonomy/species" element={<Species />} />
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
  const [sidebar, toggleSidebar] = useState(false)
  const [sidebarActive, setSidebarActive] = useState('main-sidebar-inactive')
  useEffect(() => {
    sidebar ?
    setSidebarActive('main-sidebar-active') :
    setSidebarActive('main-sidebar-inactive')
  }, [sidebar])

  return (
    <AuthProvider>
      <SideBar sidebar={sidebar} toggleSidebar={toggleSidebar} />
      <div class={sidebarActive}>
        <NavBar sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <div class="content">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  )
}


export default App
