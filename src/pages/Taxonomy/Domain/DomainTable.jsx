import axios from "axios";
import { useState, useEffect } from "react"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel  } from "@tanstack/react-table";
import data from "./data.json"
const columnHelper = createColumnHelper()
const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'category_name',
        header: 'Name'
    },
    {
        accessorKey: 'scientific_name',
        header: 'Scientific Name'
    }
]

function DomainTable() {
    // const data = [
    //     {
    //         "id": 0,
    //         "category_name": "nerd",
    //         "scientific_name": "nerd?"
    //     },
    //     {
    //         'id': 2,
    //         "category_name": "nerd",
    //         "scientific_name": "nerd?"
    //     },
    // ]
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get(axios.defaults.baseURL + "/tax/domain/")
    //     .then((res) => {
    //         console.log(res.data)
    //         setData(res.data)
    //     })
    // }, [])
    console.log(data)
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

export default DomainTable