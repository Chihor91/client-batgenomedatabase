// Library Imports
import { useState } from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Project from '@/pages/Project'

import Source from '@/pages/Source'
import SourceForm from '@/pages/Source/SourceForm'

import Isolate from '@/pages/Strain'
import StrainForm from '@/pages/Strain/StrainForm'

import SideBar from '@/components/SideBar/SideBar'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/components/ui/theme-provider'

// Asset Imports

// Style Imports
import './App.css'
import PrivateRoutes from '@/utils/PrivateRoutes'
import AdminRoutes from '@/utils/AdminRoutes'
import { SectionWrapper } from './hoc'

// Server API address
axios.defaults.baseURL = 'http://127.0.0.1:8000'
// axios.defaults.baseURL = "http://202.92.144.124:8000/";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/project' element={<Project />} />
					<Route path='/source' element={<Source />} />
					<Route path='/source/add' element={<SourceForm />} />
					<Route path='/isolate' element={<Isolate />} />
					<Route path='/isolate/add' element={<StrainForm />} />
				</Route>
			</Route>,
		),
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
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<AuthProvider>
				<SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
				<div
					className={`fixed transition-all  ${
						showSidebar ? 'left-[200px] w-[calc(100%-200px)]' : 'left-0'
					}`}>
					<body
						className={`w-[100%] overflow-y-scroll  transition-all pt-[96px] h-[100vh] ${
							showSidebar ? 'w-[calc(100vw-200px)]' : 'w-[100vw]'
						}`}
						onClick={() => setShowSidebar(false)}>
						<Outlet />
					</body>
				</div>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
