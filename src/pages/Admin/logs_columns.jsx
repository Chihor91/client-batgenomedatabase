import { Button } from "@/components/ui/button";

export const columns = [
    {
        accessorKey: 'datetime',
        header: props => <div className="p-3">Date/Time</div>,
        cell: props => new Date(props.getValue()).toLocaleString() 
    },
    {
        accessorKey: 'user',
        header: 'Username'
    },
    {
        accessorKey: 'detail',
        header: 'Action'
    },
    
    // {
    //     accessorKey: 'actions',
    //     header: ''
    // }
]