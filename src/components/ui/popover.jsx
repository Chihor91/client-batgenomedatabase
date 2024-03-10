import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = React.forwardRef(({ className, error, helperText, children, ...props }, ref) => (
	<div className='border-red-600'>
		<PopoverPrimitive.Trigger 
			ref={ref}
			className={cn(
				`flex h-10 w-full items-center justify-between rounded-md border ${error ? 'border-red-500' : 'border-foreground'} bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
				className
			)}
			{...props}
		>
		{children}
		</PopoverPrimitive.Trigger>
		{error && <span className='flex text-sm text-red-500'>{helperText}</span>}
	</div>	
	
),)
const PopoverContent = React.forwardRef(
	({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={ref}
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	),
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
