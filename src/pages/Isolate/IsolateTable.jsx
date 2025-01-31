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
import AuthContext from '@/context/AuthContext'
import axios from 'axios'
import { Input } from '@/components/ui/input'

export default function IsolateTable({ data, columns }) {
	let navigate = useNavigate()
	let {user} = useContext(AuthContext)
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		data,
		columns,
		initialState: { pagination: { pageSize: 10 } },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})
	const headers = table.getHeaderGroups()[0].headers

	const handleEditClick = (e) => {
		e.stopPropagation()
		navigate('/')
	}

	const handleDeleteClick = (e, id) => {
		e.stopPropagation()
		axios.delete('/source/isolate/delete/' + id + '/')
		.then((res) => {
			location.reload()
		})
	}

	const resetFilters = () => {
		headers[0].column.setFilterValue("")
		headers[1].column.setFilterValue("")
	}

	const rowClassName =
	'bg-white/10 hover:text-secondary_background hover:bg-gradient-to-r from-foreground to-background shadow-md rounded-sm after:-z-20 cursor-pointer'
	
	return (
		<div className='flex w-full space-x-5'>
			<div className='border bg-secondary_background rounded-lg w-[30%] h-full p-3 flex flex-col space-y-5'>
				<span className='font-bold text-[20px]'>Filters</span>
				<div>
					<span className='font-semibold'>ID</span>
					<Input className='font-light bg-secondary_background' value={headers[0].column.getFilterValue() || ""} onChange={(e) => headers[0].column.setFilterValue(e.target.value)} />
				</div>
				<div>	
					<span className='font-semibold'>Accession Number</span>
					<Input className='font-light bg-secondary_background' value={headers[1].column.getFilterValue() || ""} onChange={(e) => headers[1].column.setFilterValue(e.target.value)} />
				</div>
				<Button variant="outline" onClick={() => resetFilters()}>Reset</Button>
			</div>
			
			<div className='border overflow-auto rounded-lg bg-secondary_background w-full'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="bg-secondary_background shadow-lg" key={headerGroup.id}>
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
								<TableRow
									className={rowClassName}
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									onClick={() => {
										navigate('/isolate?id=' + data[row.id].id)
									}}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className='text-left p-3' key={cell.id}>
											{cell.column.id === 'actions' ? (
												<>
													{(user?.is_superuser | data[row.id].author === user?.username) ?
														<div className='gap-4 flex flex-row'>
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

			<div className='flex items-center justify-center space-x-2 py-4'>
				<Button
					variant='outline'
					className="bg-secondary_background"
					size='sm'
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}>
					{'<<'}
				</Button>
				<Button
					variant='outline'
					className="bg-secondary_background"
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					{'<'}
				</Button>
				<div>{'Page ' + (table.options.state.pagination.pageIndex + 1)}</div>
				<Button
					variant='outline'
					className="bg-secondary_background"
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					{'>'}
				</Button>
				<Button
					variant='outline'
					className="bg-secondary_background"
					size='sm'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}>
					{'>>'}
				</Button>
			</div>
			</div>
		</div>
	)
}
