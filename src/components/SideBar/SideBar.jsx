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

function SideBar({ showSidebar, setShowSidebar }) {
	const { user, logoutUser } = useContext(AuthContext)
	const theme = useTheme()
	const navigate = useNavigate()

	const [activeButton, setActiveButton] = useState(null)

	const handleMouseEnter = () => {
		setShowSidebar(true)
	}

	const handleMouseLeave = () => {
		setShowSidebar(false)
	}

	const handleButtonClick = (buttonName) => {
		setActiveButton(buttonName)
		navigate(`/${buttonName.toLowerCase()}`)
	}

	const logoWidth = showSidebar ? '70px' : '60px'

	return (
		<div
			style={{
				backgroundColor: 'rgba(33, 141, 153,.1)',
			}}
			className={`top-0 left-0 h-screen overflow-hidden  transition-all fixed z-40 ${
				showSidebar ? 'w-[200px]' : 'w-[100px]'
			} `}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div
				className={`flex flex-col   h-[120px] p-[24px] justify-center    items-center ${
					theme.theme === 'light' ? 'bg-primary' : 'bg-primary'
				} `}>
				<img
					width={logoWidth}
					src={theme.theme === 'light' ? Images.ic_light_caves : Images.ic_caves}
					alt='caves-logo'
				/>
				<h1
					className={`font-semibold text-lg  ${
						theme.theme === 'light' ? 'text-background' : 'text-background'
					}`}>
					CAVES
				</h1>
			</div>
			{/* FOR AUTHENTICATED USERS */}
			{user && (
				<>
					<ul className='h-[90%]  flex flex-col justify-between py-12   overflow-x-hidden overflow-y-scroll'>
						<div className='space-y-4 '>
							<CustomButton
								imgSrc={Images.ic_dashboard}
								className={`w-[80%]  ${activeButton === '' ? 'bg-background' : 'bg-transparent'}`}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('')}>
								Dashboard
							</CustomButton>

							<CustomButton
								className={`w-[80%]   ${
									activeButton === 'Project' ? 'bg-background' : 'bg-transparent'
								} `}
								imgSrc={Images.ic_project}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('Project')}>
								Project
							</CustomButton>

							<CustomButton
								imgSrc={Images.ic_source}
								className={`w-[80%]   ${
									activeButton === 'Source' ? 'bg-background' : 'bg-transparent'
								}`}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('Source')}>
								Sources
							</CustomButton>
							<CustomButton
								imgSrc={Images.ic_strains}
								className={`w-[80%]  ${
									activeButton === 'Isolate' ? 'bg-background' : 'bg-transparent'
								} `}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => handleButtonClick('Isolate')}>
								Isolates
							</CustomButton>
						</div>

						<div className='space-y-40'>
							<div>
								<CustomButton
									imgSrc={Images.ic_logout}
									className={`w-[80%]  bg-transparent`}
									variant='outline'
									width={30}
									showSidebar={showSidebar}
									onClick={logoutUser}>
									Logout
								</CustomButton>
							</div>
							<div className='py-20'>{showSidebar ? <DarkLightModeToggle /> : null}</div>
						</div>
					</ul>
				</>
			)}
			{/* FOR NON-AUTHENTICATED USERS */}
			<section className='flex flex-col gap-6 pt-6'>
				<div>
					<CustomButton
						imgSrc={Images.ic_dashboard}
						className={`w-[80%]  bg-transparent`}
						variant='outline'
						width={30}
						showSidebar={showSidebar}
						onClick={() => {
							navigate('/')
						}}>
						Dashboard
					</CustomButton>
				</div>
				<div>
					<CustomButton
						imgSrc={Images.ic_login}
						className={`w-[80%]  bg-transparent`}
						variant='outline'
						width={30}
						showSidebar={showSidebar}
						onClick={() => {
							navigate('login')
						}}>
						Login
					</CustomButton>
				</div>
			</section>
		</div>
	)
}

export default SideBar
