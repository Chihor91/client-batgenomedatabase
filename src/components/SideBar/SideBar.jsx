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

	const handleMouseEnter = () => {
		setShowSidebar(true)
	}

	const handleMouseLeave = () => {
		setShowSidebar(false)
	}

	const logoWidth = showSidebar ? '70px' : '60px'

	return (
		<div
			style={{
				backgroundColor: theme.theme === 'light' ? 'rgba(192, 229, 242)' : '#0F252F',
			}}
			className={`top-0 left-0 h-screen overflow-hidden  transition-all fixed z-40 ${
				showSidebar ? 'w-[200px]' : 'w-[100px]'
			} `}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<div
				className={`flex flex-col   h-[120px] p-[24px] justify-center    items-center ${
					theme.theme === 'light' ? 'bg-[#9DD9EE]' : 'bg-[#164555]'
				} `}>
				<img
					width={logoWidth}
					src={theme.theme === 'light' ? Images.ic_caves : Images.ic_light_caves}
					alt='caves-logo'
				/>
				<h1
					className={`font-black text-lg  ${
						theme.theme === 'light' ? 'text-[#0F5860]' : 'text-[#C6EDFB]'
					}`}>
					CAVES
				</h1>
			</div>

			<ul className='h-[90%]  flex flex-col justify-between py-12   overflow-x-hidden overflow-y-scroll'>
				{user ? (
					<>
						<div className='space-y-4 '>
							<CustomButton
								imgSrc={Images.ic_dashboard}
								className={`w-[80%] bg-transparent `}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => navigate('/')}>
								Dashboard
							</CustomButton>

							<CustomButton
								className={`w-[80%]  bg-transparent `}
								imgSrc={Images.ic_project}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => navigate('/project')}>
								Project
							</CustomButton>

							<CustomButton
								imgSrc={Images.ic_source}
								className={`w-[80%]  bg-transparent `}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => navigate('/source')}>
								Source
							</CustomButton>
							<CustomButton
								imgSrc={Images.ic_strains}
								className={`w-[80%]  bg-transparent `}
								variant='outline'
								width={30}
								showSidebar={showSidebar}
								onClick={() => navigate('/isolate')}>
								{showSidebar ? 'Strains' : null}
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
					</>
				) : null}
			</ul>
		</div>
	)
}

export default SideBar
