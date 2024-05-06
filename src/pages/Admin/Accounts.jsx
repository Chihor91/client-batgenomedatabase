import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'


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
import { Input } from '@/components/ui/input'

function AddAccount(open, setOpen) {
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
				setOpen(false)
			})
			.catch((error) => {
				enqueueSnackbar('Failed to create the account. Please try again.', {
					variant: 'error',
					autoHideDuration: 1000,
				})
				setOpen(false)
				console.log(error)
			})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setOpen(true)}>Add Account</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="text-xl font-semibold">
					Add New Account
				</DialogHeader>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='m-5 flex flex-col space-y-4 w-auto'>
					<Input
						{...register('username', { required: 'Please fill out this field' })}
						type='text'
						placeholder='Username'
						error={errors.username}
						helperText={errors.username?.message}
					/>
					<Input
						size='small'
						{...register('email', {
							required: 'Please fill out this field',
							pattern: {
								value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
								message: 'Invalid email format',
							},
						})}
						type='text'
						placeholder='Email Address'
						error={errors.email}
						helperText={errors.email?.message}
					/>
					<Input
						{...register('password', { required: 'Please fill out this field' })}
						type='password'
						placeholder='Password'
						error={errors.password}
						helperText={errors.password?.message}
					/>
					<Input
						{...register('re_password', {
							validate: (fieldValue) => {
								return fieldValue === watchForm.password || 'Passwords do not match'
							},
						})}
						type='password'
						placeholder='Repeat Password'
						error={errors.re_password}
						helperText={errors.re_password?.message}
					/>
					<DialogFooter>
						<Button type='submit' variant='outline'>
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
			
		</Dialog>
	)
}

export default function Accounts() {
	const [data, setData] = useState([])
	const [sorting, setSorting] = useState([])
	const [open, setOpen] = useState(false)
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

	const handleDeleteClick = (e, id) => {
		e.stopPropagation()
		axios.delete('/user/accounts/delete/' + id + '/')
		.then((res) => {
			location.reload()
		})
		console.log('Delete button clicked')
	}

	return (
		<div className='space-y-2'>
			<h1 className='text-center text-xl w-full font-semibold'>Accounts</h1>
			<div className='rounded-md border h-[50%] overflow-scroll'>
				<Table>
					<TableHeader className="sticky top-0 m-0 bg-background">
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
												<Button
													variant='custom'
													// DELETE LOGIC
													onClick={(e) => handleDeleteClick(e, data[row.id].id)}>
													Delete
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
			{AddAccount(open, setOpen)}
		</div>
	)
}
