// Library Imports
import { useContext, useEffect } from 'react'

// Component Imports
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/hoc'
import { styles } from '@/styles'
import Images from '@/common/images'
import { useTheme } from '@/components/ui/theme-provider'
import { motion } from 'framer-motion'
import { fadeIn } from '@/common/motion'
import { TextField } from '@mui/material'
import { useState } from 'react'

// Asset Imports
import { useForm } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack'

// Style Imports

function Login() {
	let { loginUser, loading, error } = useContext(AuthContext)
	let navigate = useNavigate()
	const theme = useTheme()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		localStorage.getItem('authTokens') && navigate('/')
	}, [])

	const icons = Array(3).fill(null)

	const handleLogin = (e) => {
		loginUser(e, { username, password })
	}

	const form = useForm({})

	const { watch, register, handleSubmit, formState } = form
	const { errors } = formState
	const watchForm = watch(form)

	return (
		<div
			className=' h-full w-full flex justify-center items-center
         '>
			<motion.div
				className={`flex w-full   `}
				style={{ height: '100%' }}
				variants={fadeIn('left', 'spring', 0.1, 0.25)}>
				<div
					className={`w-1/2  rounded-bl-xl rounded-tl-xl justify-center  items-center  hidden md:flex md:flex-col ${
						theme.theme === 'light' ? 'bg-card' : 'bg-[#218D99]/10'
					}`}>
					<div className=' w-[90%] h-[90%] flex flex-col justify-between'>
						<div className='justify self-end '>
							<img
								className='hover:animate-spin'
								width={60}
								src={theme.theme === 'light' ? Images.ic_isolate : Images.ic_DM_isolate}
								alt='isolate-logo'
							/>
						</div>
						<div className='flex flex-col  items-center gap-10'>
							<img
								width={200}
								src={theme.theme === 'light' ? Images.ic_gradient_caves : Images.ic_DM_cave}
								alt='caves-logo'
							/>
							<h1
								className={`cursor-default  ${styles.heroSubText}  ${
									theme.theme === 'light'
										? 'bg-clip-text text-transparent bg-gradient-to-r from-[#009112] to-[#007E10]'
										: 'text-foreground'
								}`}>
								CAVE MICROBIOME DATABASE
							</h1>
						</div>

						<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget justo placerat, porttitor ligula vitae, laoreet dui. 
						Nullam finibus turpis vel orci finibus sagittis. Nulla iaculis ipsum est, faucibus consectetur sapien imperdiet vel. 
						In non libero et mi placerat aliquam ut vel augue. Donec a nunc sed purus placerat venenatis ut in purus.
						</p>
					</div>
				</div>

				<div className='h-full w-full md:w-full lg:w-1/2'>
					<div className='h-full w-full  flex items-center justify-center'>
						<div
							className={`h-full w-full  ${
								theme.theme === 'light' ? 'bg-accent' : 'bg-[#032125]'
							}`}>
							<form
								onSubmit={handleLogin}
								className='flex flex-col hover:blur-0 h-full bg-center bg-cover items-center justify-center w-full gap-5 '>
								<h1
									className={`my-2 ${styles.heroSubText} ${
										theme.theme === 'light' ? 'text-background' : 'text-foreground'
									} `}>
									Get Started
								</h1>
								<ul className='inline-flex items-center text-xl gap-10'>
									{icons.map((_, index) => (
										<li key={index}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='p-3 border-white rounded-full border hover:scale-110 transition-all  hover:text-white'
												x='0px'
												y='0px'
												viewBox='0,0,256,256'></svg>
										</li>
									))}
								</ul>
								<p className='text-white text-right'> </p>

								<TextField
									id='username'
									type='text'
									name='username'
									label='Username'
									variant='outlined'
									onChange={(e) => setUsername(e.target.value)}
								/>
								<TextField
									id='password'
									type='password'
									name='password'
									label='Password'
									variant='outlined'
									onChange={(e) => setPassword(e.target.value)}
								/>

								{error && (
									<p className='text-red-900 text-sm font-semibold text-center mt-2'>{error}</p>
								)}

								<Button
									className='px-6 py-2  rounde  hover:bg-foreground hover:text-background  text-foreground bg-background font-semibold transition-all hover:scale-110'
									type='submit '
									disabled={loading || !username || !password}>
									{loading ? 'Loading...' : 'Submit'}
								</Button>
							</form>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default SectionWrapper(Login, 'login')
