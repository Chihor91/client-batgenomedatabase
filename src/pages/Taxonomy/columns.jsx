import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
export const columns = {

    domain: [
        {
            accessorKey: 'id',
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
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
    phylum: [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
    class: [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
    order: [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
    family: [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
    genus: [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
    species: [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'scientific_name',
            header: 'Scientific Name'
        }
    ],
}

export default {
    columns,
}