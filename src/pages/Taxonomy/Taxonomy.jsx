import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
import { columns } from "./columns"

function Taxonomy({ rank }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/"+ rank + "/")
        .then((res) => {
            setData(res.data)
        })
    }, [rank])
    return(
        <>
        <h1>{rank}</h1>
        <div className="container mx-auto py-10">
            <DataTable data={data} columns={columns[rank]} rank={rank} />
        </div>
        </>
    )
}

export default Taxonomy