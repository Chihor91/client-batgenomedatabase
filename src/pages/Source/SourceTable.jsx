import {
	flexRender,
	getSortedRowModel,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '@/context/AuthContext'
import { Input } from '@/components/ui/input'

function SourceTable({ data, columns }) {
	let navigate = useNavigate()
	let {user, logoutUser} = useContext(AuthContext)
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		data,
		columns,
		initialState: { pagination: { pageSize: 5 } },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	const rowClassName =
	'py-2 my-2 bg-white/10 hover:text-background  flex flex-row items-center justify-between relative after:absolute after:bg-gradient-to-r from-foreground to-background shadow-md rounded-sm after:-z-20 after:inset-0 cursor-pointer overflow-hidden after:-translate-y-full after:hover:translate-y-0'
	const rowHeaderClassName =
		'justify-center self-center place-content-center items-center  grid grid-cols-3 relative'

	const handleEditClick = (e) => {
		e.stopPropagation()
		navigate('/')
		console.log('Edit button clicked')
	}

	const handleDeleteClick = (e, id) => {
		e.stopPropagation()
		axios.delete('/source/delete/' + id + '/')
		.then((res) => {
			location.reload()
		})
		console.log('Delete button clicked')
	}

	return (
		<div>
			<div className='border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className={rowHeaderClassName} key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
											{header.column.id !== 'actions' && header.column.getCanFilter() ? (
												<div>
													<Input className='font-light' value={header.column.getFilterValue() || ''} onChange={(e) => header.column.setFilterValue(e.target.value)} />
												</div>
												) : null
											}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className={rowClassName}
									key={row.id}
									onClick={() => {
										navigate('/source?id=' + data[row.id].id)
									}}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className='text-left' key={cell.id}>
											{cell.column.id === 'actions' ? (
												<>
													{(user?.is_superuser | data[row.id].author === user?.username) ?
														<div className='gap-4 flex flex-row  justify-end'>
															{/* <Button
																variant='custom'
																// EDIT LOGIC Only Visible Owner/Admin
																onClick={handleEditClick}>
																Edit
															</Button> */}
															<Button
																variant='custom'
																// DELETE LOGIC
																onClick={(e) => handleDeleteClick(e, data[row.id].id)}>
																Delete
															</Button>
														</div> :
														<></>
													}
												</>
											) : (
												<div className={`${cell.column.id === 'host_species' && "italic"}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
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

			<div className='flex items-center justify-center space-x-2 py-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}>
					{'<<'}
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					{'<'}
				</Button>
				<div>{'Page ' + (table.options.state.pagination.pageIndex + 1)}</div>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					{'>'}
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}>
					{'>>'}
				</Button>
			</div>
		</div>
	)
}

export default SourceTable
