import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import { columns } from "./columns"

function Taxonomy({ category }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/"+ category + "/")
        .then((res) => {
            setData(res.data)
        })
    }, [category])
    return(
        <>
        <h1>{category}</h1>
        <div className="container mx-auto py-10">
            <DataTable data={data} columns={columns[category]} />
        </div>
        </>
    )
}

export default Taxonomy