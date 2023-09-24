import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable/ProjectTable";
import { columns } from "./columns";
import SourceForm from "@/components/Forms/SourceForm";

function Source() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/source/")
        .then((res) => {
            setData(res.data)
        })
    }, [])

    return(
        <>
            <div className="container mx-auto py-10 space-y-3">
                <SourceForm />
                <DataTable data={data} columns={columns} />
            </div>
        </>
    )
}

export default Source