// Library Imports
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
	const [authTokens, setAuthTokens] = useState(
		localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
	)
	const [user, setUser] = useState(
		localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).access : null,
	)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		try {
			setLoading(true)

			const authTokens = localStorage.getItem('authTokens')
			const userFromLocalStorage = localStorage.getItem('user')

			if (authTokens) {
				setAuthTokens(JSON.parse(authTokens))
			}

			if (userFromLocalStorage) {
				setUser(JSON.parse(userFromLocalStorage))
			}
		} catch (error) {
			console.error('Error during initialization:', error)
		} finally {
			setLoading(false)
		}
	}, [])

	if (localStorage.getItem('authTokens')) {
		axios.defaults.headers.common['Authorization'] =
			'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access
	}

	const navigate = useNavigate()

	let updateToken = async () => {
		if (authTokens) {
			try {
				setLoading(true)

				let api = axios.create({
					baseURL: axios.defaults.baseURL + '/user/login/refresh/',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				let res = await api.post('/', {
					refresh: authTokens.refresh,
				})

				if (res.status === 200) {
					let tokens = {
						access: res.data.access,
						refresh: res.data.refresh,
					}

					setAuthTokens(tokens)
					localStorage.setItem('authTokens', JSON.stringify(tokens))
					axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokens.access
				} else {
					logoutUser()
				}
			} catch (err) {
				console.error(err)
				setAuthTokens(null)
				setUser(null)
				localStorage.removeItem('authTokens')
				localStorage.removeItem('user')
			} finally {
				setLoading(false)
			}
		}
	}

	let loginUser = async (e, { username, password }) => {
		e.preventDefault()

		try {
			setLoading(true)

			let api = axios.create({ baseURL: axios.defaults.baseURL + '/user/login/' })
			let fd = new FormData()
			fd.append('username', username)
			fd.append('password', password)

			let res = await api.post('/', fd)

			if (res.status === 200) {
				let tokens = {
					access: res.data.access,
					refresh: res.data.refresh,
				}

				setAuthTokens(tokens)
				setUser(res.data.user)
				localStorage.setItem('authTokens', JSON.stringify(tokens))
				localStorage.setItem('user', JSON.stringify(res.data.user))
				navigate('/')

				enqueueSnackbar('Welcome to CAVES!', {
					variant: 'success',
					autoHideDuration: 2000,
				})
			}
		} catch (error) {
			console.error('Error during login:', error)

			if (error.response) {
				console.error('Response data:', error.response.data)
				console.error('Response status:', error.response.status)
				console.error('Response headers:', error.response.headers)

				if (error.response.status === 400 || error.response.status === 401) {
					setError('Invalid credentials. Please try again.')
				} else {
					setError('An unexpected error occurred. Please try again later.')
				}
			} else if (error.request) {
				// No response was received
				console.error('No response received. Request details:', error.request)
				setError('Unable to communicate with the server. Please try again later.')
			} else {
				// Request error
				console.error('Error details:', error.message)
				setError('An unexpected error occurred. Please try again later.')
			}
		} finally {
			setLoading(false)

			setTimeout(() => {
				setError(null)
			}, 3000)
		}
	}

	let logoutUser = () => {
		setAuthTokens(null)
		setUser(null)
		localStorage.removeItem('authTokens')
		localStorage.removeItem('user')
		navigate('/login')
		location.reload()
	}

	let contextData = {
		user: user,
		loginUser: loginUser,
		logoutUser: logoutUser,
		loading: loading,
		error: error,
	}

	useEffect(() => {
		if (loading) updateToken()

		let threeMinutes = 1000 * 60 * 3
		let interval = setInterval(() => {
			if (authTokens) {
				updateToken()
			}
		}, threeMinutes)

		return () => clearInterval(interval)
	}, [loading, authTokens])

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
