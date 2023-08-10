import Table from "../../../components/DataTable/Table";

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

function Order() {
    return(
        <Table category={"order"} columns={columns} />
    )
}

export default Order