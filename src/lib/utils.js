import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getColor(c) {
	return	c	> 20	?	'#006837' :
			c > 15 	? '#31a354' :
			c > 10 	? '#78c679' :
			c > 5	? '#c2e699' :
			'#ffffcc';
}