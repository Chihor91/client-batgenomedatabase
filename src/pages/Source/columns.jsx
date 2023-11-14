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
    },
    {
        accessorKey: 'host_species',
        header: 'Species'
    },
    {
        accessorKey: 'actions',
        header: ''
    }
]