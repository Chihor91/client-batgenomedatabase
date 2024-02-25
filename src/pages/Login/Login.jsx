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

// Asset Imports

// Style Imports

function Login() {
	let { loginUser } = useContext(AuthContext)
	let navigate = useNavigate()
	const theme = useTheme()

	useEffect(() => {
		localStorage.getItem('authTokens') && navigate('/')
	}, [])

	const icons = Array(3).fill(null)

	return (
		<div
			className=' h-full w-full flex justify-center items-center
         '>
			<motion.div
				className={`flex w-full   `}
				style={{ height: '80%' }}
				variants={fadeIn('left', 'spring', 0.1, 0.25)}>
				<div
					className={`w-1/2  justify-center  items-center $ hidden md:flex md:flex-col ${
						theme.theme === 'light'
							? 'bg-gradient-to-r from-[#15666f]/40  to-[#218D99]/40'
							: 'bg-[#032125]'
					} `}>
					<img
						width={100}
						src={theme.theme === 'light' ? Images.ic_caves : Images.ic_light_caves}
						alt='caves-logo'
					/>
					<h1
						className={`hover:animate-pulse cursor-default font-extralight ${styles.heroHeadText} ${
							theme.theme === 'light' ? 'text-foreground' : 'text-background'
						} `}>
						CAVES
					</h1>
				</div>

				<div className='h-full w-full md:w-full lg:w-1/2'>
					<div className='h-full w-full flex items-center justify-center'>
						<div
							className={`h-full w-full ${theme.theme === 'light' ? 'bg-accent' : 'bg-[#032125]'}`}>
							<form
								onSubmit={loginUser}
								className='flex flex-col hover:blur-0 h-full bg-center bg-cover items-center justify-center w-full gap-5 '>
								<h1 className={`my-6 ${styles.heroSubText} text-background `}>Login</h1>
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
								<p className='text-white text-right'>Use your email account</p>

								<Input
									className='w-[60%]'
									type='text'
									name='username'
									placeholder='Enter username'
								/>
								<Input
									className='w-[60%]'
									type='password'
									name='password'
									placeholder='Enter password'
								/>
								<Button
									className='px-6 py-2  rounde  hover:bg-card hover:text-background  text-foreground bg-background font-semibold transition-all hover:scale-110'
									type='submit '>
									Submit
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
