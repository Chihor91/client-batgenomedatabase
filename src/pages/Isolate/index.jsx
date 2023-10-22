import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable/ProjectTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import IsolateForm from "@/components/Forms/IsolateForm";
import { useNavigate } from "react-router-dom";

function Isolate() {
    const [data, setData] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/isolate/")
        .then((res) => {
            setData(res.data)
        })
    }, [])

    return(
        <>
            <div className="container mx-auto py-10 space-y-3">
                <Button variant="outline" onClick={() => navigate("/isolate/add")}>Add New Isolate</Button>
                <DataTable data={data} columns={columns} />
            </div>
        </>
    )
}

export default Isolate