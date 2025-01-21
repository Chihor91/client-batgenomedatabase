// Library Imports
import { Suspense, useState } from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	Outlet,
	RouterProvider,
} from 'react-router-dom'
import axios from 'axios'

// Component Imports
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'

import Source from '@/pages/Source'
import SourceForm from '@/pages/Source/SourceForm'

import Isolate from '@/pages/Isolate'
import IsolateForm from '@/pages/Isolate/IsolateForm'
import MultipleIsolateForm from '@/pages/Isolate/MultipleIsolatesForm'

import SideBar from '@/components/SideBar/SideBar'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/components/ui/theme-provider'
import MUIThemeProvider from '@/components/Custom/MUIThemeProvider'

// Asset Imports

// Style Imports
import './App.css'

import PrivateRoutes from '@/utils/PrivateRoutes'
import AdminRoutes from '@/utils/AdminRoutes'
import AdminPage from '@/pages/Admin'
import { SnackbarProvider } from 'notistack'
import BackgroundElement1 from './components/Custom/Background1'
import BackgroundElement2 from './components/Custom/Background2'

// Server API address
// axios.defaults.baseURL = 'http://159.89.192.168:8000/'
// axios.defaults.baseURL = 'http://172.16.7.5:8000'
axios.defaults.baseURL = 'https://mapi.nicercaves.site/'
// axios.defaults.baseURL = "http://202.92.144.124:8000/";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/source' element={<Source />} />
				<Route path='/isolate' element={<Isolate />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/source/add' element={<SourceForm />} />
					<Route path='/isolate/add' element={<IsolateForm />} />
					<Route path='/isolate/add/multiple' element={<MultipleIsolateForm />} />
				</Route>
				<Route element={<AdminRoutes />}>
					<Route path='/admin' element={<AdminPage />} />
				</Route>
			</Route>,
		),
	)

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>
		</>
	)
}

const Root = () => {
	const [showSidebar, setShowSidebar] = useState(false)

	return (
		<>
			<SnackbarProvider maxSnack={3}>
				<MUIThemeProvider>
					<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
						<AuthProvider>
							<SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

							<div
								className={`fixed transition-all  ${
									showSidebar
										? 'left-[200px] w-[calc(100%-200px)]'
										: 'left-[100px] w-[calc(100%-100px)]'
								}`}>
								<div
									className={`w-[100%] overflow-scroll transition-all  bg-background/20  h-[100vh] ${
										showSidebar ? 'w-[calc(100vw-200px)]' : 'w-[calc(100vw-100px)]'
									}`}
									onClick={() => setShowSidebar(false)}
									style={{ position: 'relative', zIndex: 0 }}>
									<Outlet />
								</div>
							</div>

							<BackgroundElement1 />
							<BackgroundElement2 />
						</AuthProvider>
					</ThemeProvider>
				</MUIThemeProvider>
			</SnackbarProvider>
		</>
	)
}

export default App
