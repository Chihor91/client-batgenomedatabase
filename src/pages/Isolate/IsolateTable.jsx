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
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function IsolateTable({ data, columns }) {
	let navigate = useNavigate()
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

	const handleViewClick = () => {}

	const handleEditClick = (e) => {
		e.stopPropagation()
		navigate('/')
		console.log('Edit button clicked')
	}

	const handleDeleteClick = (e) => {
		e.stopPropagation()
		navigate('/')
		console.log('Delete button clicked')
	}

	return (
		<div>
			<div className='border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className='bg-background' key={headerGroup.id}>
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
									className='py-2 my-2 bg-white/10 hover:text-background  flex flex-row items-center justify-between relative after:absolute after:h-full after:bg-gradient-to-r from-foreground to-muted z-20 shadow-md rounded-sm after:-z-20 after:w-full after:inset-0    after:duration-500 transition-all hover:transition-all after:hover:transition-all hover:scale-105 after:hover:duration-1000 cursor-pointer overflow-hidden after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all'
									onClick={() => {
										navigate('/isolate?id=' + data[row.id].id)
									}}
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className='text-left ' key={cell.id}>
											{cell.column.id === 'actions' ? (
												<>
													<div className='gap-4 flex flex-row'>
														<Button
															variant='custom'
															// EDIT LOGIC Only Visible Owner/Admin
															onClick={handleEditClick}>
															Edit
														</Button>
														<Button
															variant='custom'
															// DELETE LOGIC
															onClick={handleDeleteClick}>
															Delete
														</Button>
													</div>
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
