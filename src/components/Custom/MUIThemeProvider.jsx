import React from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'

const customTheme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& label': {
						color: 'rgba(148, 255, 151, 0.4)',
					},
					'& label.Mui-focused': {
						color: 'rgba(148, 255, 151, 0.4)',
					},
					'& .MuiOutlinedInput-root': {
						width: '320px',
						'& fieldset': {
							borderColor: '#94FF97',
						},
						'&:hover fieldset': {
							borderColor: '#20C335',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#FFF',
						},
						'& input': {
							color: '#D2FFD2',
						},
					},

					'&.MuiFilledInput-root': {
						width: '100%',
						'& fieldset': {
							borderColor: '#94FF97',
						},
						'&:hover fieldset': {
							borderColor: '#00FFFF',
						},
						'& input': {
							color: '#fff',
						},
						'&.Mui-focused label': {
							borderColor: 'rgba(148, 255, 151, 0.4)',
						},
					},
				},
			},
		},
	},
})

const MUIThemeProvider = ({ children }) => {
	return <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>
}

export default MUIThemeProvider
