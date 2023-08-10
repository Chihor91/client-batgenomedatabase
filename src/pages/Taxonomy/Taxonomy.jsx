import Table from "../../components/DataTable/Table";
import columns from "./columns";

function Taxonomy({ category }) {
    return(
        <Table category={category} columns={columns[category]} />
    )
}

export default Taxonomy