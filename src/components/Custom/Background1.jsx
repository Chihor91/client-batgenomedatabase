import React from 'react'

const BackgroundElement1 = () => {
	return (
		<div
			className='absolute inset-x-0 -z-10  blur-2xl sm:-top-80 pointer-events-none'
			aria-hidden='true'>
			<div
				className={`relative right-[calc(70%-11rem)]  pointer-events-none aspect-[915/426] w-[30.125rem] -translate-x-1/4 rotate-[30deg] bg-gradient-to-tr from-foreground to-accent opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]`}
				style={{
					clipPath:
						'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
				}}></div>
		</div>
	)
}

export default BackgroundElement1
