import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, error, helperText, type, ...props }, ref) => {
	return (
		<div>
			<input
				type={type}
				className={cn(
					`flex h-10 w-full rounded-md border ${error ? 'border-red-500' : 'border-foreground'} bg-secondary_background px-3 py-2 text-sm = file:border-0 file:bg-transparent file:text-sm file:text-primary file:font-medium placeholder:text-primary focus-visible:outline-none   focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
					className,
				)}
				ref={ref}
				{...props}
			/>
			{error && <span className='flex text-sm text-red-500'>{helperText}</span>}
		</div>
	)
})
Input.displayName = 'Input'

export { Input }
