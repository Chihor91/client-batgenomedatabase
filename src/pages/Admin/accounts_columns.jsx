import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns = [
    {
        accessorKey: 'username',
        header: ({ column }) => {
            return(
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="my-1"
                >
                <div className="font-bold">Username</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    // {
    //     accessorKey: 'actions',
    //     header: ''
    // }
]