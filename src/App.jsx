// Library Imports
import { Suspense, useState } from 'react'
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

import Isolate from '@/pages/Isolate'
import IsolateForm from '@/pages/Isolate/IsolateForm'

import SideBar from '@/components/SideBar/SideBar'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/components/ui/theme-provider'
import MUIThemeProvider from '@/components/Custom/MuiThemeProvider'

// Asset Imports

// Style Imports
import './App.css'

import PrivateRoutes from '@/utils/PrivateRoutes'
import AdminRoutes from '@/utils/AdminRoutes'
import { SectionWrapper } from './hoc'
import AdminPage from '@/pages/Admin'
import { SnackbarProvider } from 'notistack'
import BackgroundElement1 from './components/Custom/Background1'
import BackgroundElement2 from './components/Custom/Background2'

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
					<Route path='/isolate/add' element={<IsolateForm />} />
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
							<BackgroundElement1 />

							<SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

							<div
								className={`fixed transition-all  ${
									showSidebar
										? 'left-[200px] w-[calc(100%-200px)]'
										: 'left-[100px] w-[calc(100%-100px)]'
								}`}>
								<body
									className={`w-[100%]   transition-all  h-[100vh] ${
										showSidebar ? 'w-[calc(100vw-200px)]' : 'w-[calc(100vw-100px)]'
									}`}
									onClick={() => setShowSidebar(false)}
									style={{ position: 'relative', zIndex: 0, overflow: 'hidden' }}>
									<Outlet />
								</body>
							</div>

							<BackgroundElement2 />
						</AuthProvider>
					</ThemeProvider>
				</MUIThemeProvider>
			</SnackbarProvider>
		</>
	)
}

export default App
