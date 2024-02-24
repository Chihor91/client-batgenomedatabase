import React, { useState, useEffect } from 'react'
import Images from '@/common/images'
import { useTheme } from '@/components/ui/theme-provider'

const DarkLightModeToggle = () => {
	const { theme, setTheme } = useTheme()
	const [isChecked, setIsChecked] = useState(theme === 'dark')

	useEffect(() => {
		setTheme(isChecked ? 'dark' : 'light')
	}, [isChecked, setTheme])

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		setTheme(isChecked ? 'light' : 'dark')
	}

	return (
		<>
			<div>
				<label className='relative inline-flex items-center cursor-pointer'>
					<input
						className='sr-only peer'
						type='checkbox'
						checked={isChecked}
						onChange={handleCheckboxChange}
					/>
					<div
						className={` w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-[#d1e4e5] overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center  before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:rounded-full before:left-2 before:-translate-y-1/2 before:transition-all before:duration-700  peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-md shadow-gray-700 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#218d99] after:content-['☽'] after:absolute after:bg-[#0e2328] after:rounded-full after:top-[4px] after:right-2 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0`}></div>
				</label>
			</div>
		</>
	)
}

export default DarkLightModeToggle
