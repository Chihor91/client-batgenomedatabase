import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Images from '@/common/images'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border-input  bg-background hover:bg-background text-foreground hover:bg-background hover:shadow-lg hover:shadow-cyan-600/90 font-thin hover:font-black',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',

				custom: '',
			},
			size: {
				default: 'h-14 px-1 py-1',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

const CustomButton = React.forwardRef(
	({ showSidebar, width, imgSrc, className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		const imageGridClass = showSidebar ? 'col-start-1' : 'col-start-2'

		return (
			<div>
				<Comp
					className={`flex flex-row ${cn(buttonVariants({ variant, size, className }))}`}
					ref={ref}
					{...props}>
					<div className={`items-center w-full h-full grid grid-flow-col grid-cols-3`}>
						<div className={`flex justify-center ${imageGridClass}`}>
							{imgSrc && <img src={imgSrc} width={width} alt='' />}
						</div>
						{showSidebar && <div className={`col-start-2`}>{props.children}</div>}
					</div>
				</Comp>
			</div>
		)
	},
)

CustomButton.displayName = 'Button'

export { CustomButton, buttonVariants }
