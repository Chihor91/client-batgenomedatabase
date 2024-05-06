import { Button } from "@/components/ui/button";

export const columns = [
    {
        accessorKey: 'user',
        header: ({column}) => 
                <div className="font-bold p-3">Username</div>
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