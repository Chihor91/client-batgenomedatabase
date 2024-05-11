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
import { columns } from './logs_columns'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Accounts() {
	const [data, setData] = useState([])
	const [sorting, setSorting] = useState([])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: [{"id": "datetime", "desc":"true"}],
		},
	})

	useEffect(() => {
		axios.get('/user/logs/')
			.then((res) => {
				setData(res.data)
			})
	}, [])

	return (
		<div className='space-y-2 w-full'>
			<h1 className='text-center text-xl font-semibold'>Activity Log</h1>
			<div className='rounded-md border min-h-[50px] max-h-[75vh] w-[40vw] overflow-scroll'>
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
		</div>
	)
}