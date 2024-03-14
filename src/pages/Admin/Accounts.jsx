import {
	TextField,
	Paper,
	Dialog,
	DialogTitle,
	DialogActions,
} from '@mui/material'
import {
	flexRender,
	getSortedRowModel,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { columns } from './accounts_columns'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { enqueueSnackbar, useSnackbar } from 'notistack'

function AddAccount(open, handleClose) {
	const form = useForm({})

	const { watch, register, handleSubmit, formState } = form
	const { errors } = formState
	const watchForm = watch(form)

	const onSubmit = (data) => {
		axios
			.post('user/account/', data)
			.then((res) => {
				enqueueSnackbar('Account successfully created.', {
					variant: 'success',
					autoHideDuration: 1000,
				})
				handleClose()
			})
			.catch((error) => {
				enqueueSnackbar('Failed to create the account. Please try again.', {
					variant: 'error',
					autoHideDuration: 1000,
				})
				console.log(error)
			})
	}

	return (
		<Dialog
			fullWidth={true}
			PaperProps={{
				style: { backgroundColor: '#007E10 ', borderRadius: '20px', borderWidth: '2px' },
			}}
			maxWidth='md'
			open={open}
			onClose={handleClose}>
			<DialogTitle style={{ fontWeight: '800', fontSize: '1.5rem', color: 'white' }}>
				Add New Account
			</DialogTitle>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='m-5 flex flex-col space-y-4 w-auto text-primary '>
				<TextField
					size='small'
					{...register('username', { required: 'Please fill out this field' })}
					id='username'
					type='text'
					name='username'
					label='Username'
					variant='filled'
					error={errors.username}
					helperText={errors.username?.message}
				/>
				<TextField
					size='small'
					{...register('email', {
						required: 'Please fill out this field',
						pattern: {
							value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
							message: 'Invalid email format',
						},
					})}
					type='text'
					id='email'
					autoComplete='off'
					name='email'
					label='Email Address'
					variant='filled'
					error={errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					size='small'
					{...register('password', { required: 'Please fill out this field' })}
					type='password'
					id='password'
					name='password'
					variant='filled'
					label='Password'
					error={errors.password}
					helperText={errors.password?.message}
				/>
				<TextField
					size='small'
					{...register('re_password', {
						validate: (fieldValue) => {
							return fieldValue === watchForm.password || 'Passwords do not match'
						},
					})}
					type='password'
					variant='filled'
					label='Confirm Password'
					error={errors.re_password}
					helperText={errors.re_password?.message}
				/>
				<DialogActions>
					<Button type='button' variant='ghost' onClick={handleClose}>
						Cancel
					</Button>
					<Button type='submit' variant='ghost'>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

export default function Accounts() {
	const [data, setData] = useState([])
	const [open, setOpen] = useState(false)
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	useEffect(() => {
		axios.get('/user/accounts/')
			.then((res) => {
				setData(res.data)
			})
	}, [open])

	return (
		<div className='space-y-2'>
			<h1 className='text-center text-lg w-full font-semibold'>Accounts</h1>
			<div className='rounded-md border'>
				{AddAccount(open, () => {
					setOpen(false)
				})}
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className='text-left' key={cell.id}>
											{cell.column.id === 'actions' ? (
												<Button variant='outline'>
													View
												</Button>
											): (
												flexRender(cell.column.columnDef.cell, cell.getContext())
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<Button variant='outline' onClick={() => setOpen(true)}>
				Add Account
			</Button>
		</div>
	)
}
