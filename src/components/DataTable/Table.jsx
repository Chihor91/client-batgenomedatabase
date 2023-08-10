import axios from "axios";
import { useState, useEffect } from "react"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel  } from "@tanstack/react-table";

const columnHelper = createColumnHelper()

function Table({ data, columns }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return(
        <div>
            <table>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => 
                            <th key={header.id}>
                                {
                                    flexRender(header.column.columnDef.header, header.getContext)
                                }
                            </th>
                            )
                        }
                    </tr>
                ))}
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td id={cell.id}>{
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{"<"}</button>
                {table.getState().pagination.pageIndex + 1}
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{">"}</button>
                </tfoot>
            </table>
        </div>
    )
}

export default Table