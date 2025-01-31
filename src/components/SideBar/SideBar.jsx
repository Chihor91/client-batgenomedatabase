//Library Imports
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
// Component Imports
import AuthContext from '../../context/AuthContext'
import { ModeToggle } from '../ui/mode-toggle'
import DarkLightModeToggle from '../Custom/DarkLightModeToggle'
import { CustomButton } from '../Custom/CustomButton'
import Images from '@/common/images'
import { useTheme } from '@/components/ui/theme-provider'
import axios from 'axios'

function SideBar({ showSidebar, setShowSidebar }) {
	const { user, logoutUser } = useContext(AuthContext)
	const theme = useTheme()
	const navigate = useNavigate()

	const [activeButton, setActiveButton] = useState(null)

	useEffect(() => {
		user && axios.get('/user/isloggedin/')
		.catch((err) => logoutUser())
	}, [user, logoutUser])

	const handleMouseEnter = () => {
		setShowSidebar(true)
	}

	const handleMouseLeave = () => {
		setShowSidebar(false)
	}

	const handleButtonClick = (buttonName) => {
		setActiveButton(buttonName)
		buttonName === 'Dashboard' ? 
		navigate("/") :
		navigate(`/${buttonName.toLowerCase()}`)
	}

	const logoWidth = showSidebar ? '80px' : '60px'
	const logoHeight = showSidebar ? '80px' : '60px'
	const logoFontSize = showSidebar ? 'text-xl mt-[-5px]' : 'text-lg'

	return (
		<div
			className={`${
				theme.theme === 'light' ? 'bg-[#E9FDE0]' : 'bg-background' 
			} top-0 left-0 h-screen overflow-hidden  transition-all fixed z-40 ${
				showSidebar ? 'w-[200px]' : 'w-[100px]'
			} `}
			style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div className={`flex flex-col   h-[120px] p-[24px] justify-center items-center `}>

				<img
				height={logoHeight}
					width={logoWidth}
					src={theme.theme === 'light' ? Images.ic_gradient_caves : Images.ic_DM_cave}
					alt='caves-logo'
				/>
				<h1
					className={`font-[1000] ${logoFontSize} font-title 
					}`}>
					CAVES
				</h1>
			</div>
			{/* FOR AUTHENTICATED USERS */}
			<div className='h-[90%] flex flex-col justify-between'>
				{user ? (
					<ul className='flex flex-col justify-between py-12'>
						<div className='space-y-4 '>
							<CustomButton
								imgSrc={theme.theme === 'light' ? Images.ic_dashboard : Images.ic_DM_dashboard}
								className={`w-[80%] ${activeButton === 'Dashboard' ? 'bg-secondary_background border' : 'bg-transparent'}`}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('Dashboard')}>
								Dashboard
							</CustomButton>

							{user.is_superuser && (
								<CustomButton
									className={`w-[80%]   ${
										activeButton === 'Admin' ? 'bg-secondary_background border' : 'bg-transparent'
									} `}
									imgSrc={theme.theme === 'light' ? Images.ic_project : Images.ic_DM_project}
									variant='outline'
									width={30}
									showSidebar={showSidebar}
									onClick={() => handleButtonClick('Admin')}>
									Admin
								</CustomButton>
							)}

							<CustomButton
								imgSrc={theme.theme === 'light' ? Images.ic_source : Images.ic_DM_source}
								className={`w-[80%]   ${
									activeButton === 'Source' ? 'bg-secondary_background border' : 'bg-transparent'
								}`}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('Source')}>
								Sources
							</CustomButton>
							<CustomButton
								imgSrc={theme.theme === 'light' ? Images.ic_isolate : Images.ic_DM_isolate}
								className={`w-[80%]  ${
									activeButton === 'Isolate' ? 'bg-secondary_background border' : 'bg-transparent'
								} `}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('Isolate')}>
								Isolates
							</CustomButton>
							<CustomButton
								imgSrc={theme.theme === 'light' ? Images.ic_logout : Images.ic_DM_logout}
								className={`w-[80%]  bg-transparent`}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={logoutUser}>
								Logout
							</CustomButton>
						</div>
					</ul>
				) : (
					<section className='flex flex-col gap-6 pt-6 '>
						<CustomButton
							imgSrc={theme.theme === 'light' ? Images.ic_dashboard : Images.ic_DM_dashboard}
							className={`w-[80%] ${activeButton === 'Dashboard' ? 'bg-secondary_background border' : 'bg-transparent'}`}
							variant='outline'
							width={30}
							showSidebar={showSidebar}
							onClick={() => handleButtonClick('Dashboard')}>
							Dashboard
						</CustomButton>
						<CustomButton
							imgSrc={theme.theme === 'light' ? Images.ic_source : Images.ic_DM_source}
							className={`w-[80%]   ${
								activeButton === 'Source' ? 'bg-secondary_background border' : 'bg-transparent'
							}`}
							variant='outline'
							width={30}
							showSidebar={showSidebar}
							onClick={() => handleButtonClick('Source')}>
							Sources
						</CustomButton>
						<CustomButton
							imgSrc={theme.theme === 'light' ? Images.ic_isolate : Images.ic_DM_isolate}
							className={`w-[80%]  ${
								activeButton === 'Isolate' ? 'bg-secondary_background border' : 'bg-transparent'
							} `}
							variant='outline'
							width={30}
							showSidebar={showSidebar}
							onClick={() => handleButtonClick('Isolate')}>
							Isolates
						</CustomButton>
						<CustomButton
							imgSrc={theme.theme === 'light' ? Images.ic_login : Images.ic_DM_login}
							className={`w-[80%]  bg-transparent`}
							variant='outline'
							width={30}
							showSidebar={showSidebar}
							onClick={() => {
								navigate('login')
							}}>
							Login
						</CustomButton>
					</section>
				)}

				<div className='py-10'>{showSidebar ? <DarkLightModeToggle /> : null}</div>
			</div>
			{/* FOR NON-AUTHENTICATED USERS */}
		</div>
	)
}

export default SideBar
