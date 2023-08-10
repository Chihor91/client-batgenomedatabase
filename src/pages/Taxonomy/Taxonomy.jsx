import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/DataTable/Table";
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
        <Table data={data} columns={columns[category]} />
        </>
    )
}

export default Taxonomy