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
	let {user} = useContext(AuthContext)
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
	'bg-white/10 hover:text-background hover:bg-gradient-to-r from-foreground to-background shadow-md rounded-sm after:-z-20 cursor-pointer'

	const handleEditClick = (e) => {
		e.stopPropagation()
		navigate('/')
	}

	const handleDeleteClick = (e, id) => {
		e.stopPropagation()
		axios.delete('/source/delete/' + id + '/')
		.then((res) => {
			location.reload()
		})
	}

	return (
		<div>
			<div className='border overflow-auto rounded-lg'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="bg-background" key={headerGroup.id}>
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
										<TableCell className='p-3' key={cell.id}>
											{((cell.column.id === 'actions' && 
												(user?.is_superuser | data[row.id].author === user?.username)) ? 
												<div className=''>
													<Button
														variant='custom'
														onClick={(e) => handleDeleteClick(e, data[row.id].id)}>
														Delete
													</Button>
												</div>
												:
												<div>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</div>
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
