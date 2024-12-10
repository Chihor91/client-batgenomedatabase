import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { category_1 } from "@/constants/miso";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = [
    {
        accessorKey: 'human_readable_id',
        header: ({ column }) => {
            return(
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				className="font-bold"
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
				className="font-bold"
                >
                Host Species
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
		},
		cell: ({ row }) => <div className="text-left">{row.getValue("host_species")}</div>
    },
	{
		accessorKey: "miso_categories_string",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="font-bold"
				>
					MISO Categories
				</Button>
			)
		},
		meta: {
			name: "MISO Categories",
		},
		cell: ({ row }) => {
			const miso = row.original.miso_categories

			const displayMISO = (data) => {
				const color = category_1.find( item => {return item.name === data[0] })?.color_code

				return (
					<div className="grid grid-flow-col min-w-max gap-1 m-1">
						<Badge
						className={cn(
							data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
						)}
						>{data[0]}</Badge>
						<Badge
						className={cn(
							data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
						)}
						>{data[1]}</Badge>
						<Badge
						className={cn(
							data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
						)}
						>{data[2]}</Badge>
					</div>
				)
			}

			return (
				<div>
					{
						JSON.stringify(miso) !== '{}' && miso?.length != 0 ? (
							miso?.length == 1 ? 
								<>{displayMISO(miso[0])}</>
							: 
								<>{miso.map( item => displayMISO(item))}</>
						) : null
					}
				</div>
			)
		}
	},
    {
        accessorKey: 'actions',
        header: ''
    }
]