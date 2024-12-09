import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns = [
    {
        accessorKey: 'human_readable_id',
        header: ({ column }) => {
            return(
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
		meta: {
			name: 'ID'
		},
		cell: ({ row }) => <div className="text-left">{row.getValue("human_readable_id")}</div>
    },
    {
        accessorKey: 'host_species',
        header: ({ column }) => {
            return(
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Host Species
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
		},
		cell: ({ row }) => <div className="text-left">{row.getValue("host_species")}</div>
    },
    {
        accessorKey: 'actions',
        header: ''
    }
]