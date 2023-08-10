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

function Phylum() {
    return(
        <Table category={"phylum"} columns={columns} />
    )
}

export default Phylum