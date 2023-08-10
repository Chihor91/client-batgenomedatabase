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

function Genus() {
    return(
        <Table category={"genus"} columns={columns} />
    )
}

export default Genus