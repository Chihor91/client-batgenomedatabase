import axios from "axios";
import { useState, useEffect } from "react";
import DataTable from "./IsolateTable";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import IsolateForm from "@/components/Forms/IsolateForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import IsolatePage from "../IsolatePage";

function Isolate() {
    const [searchInput] = useSearchParams();
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
            {
                searchInput.get("id")===null ?
                <div className="container mx-auto py-10 space-y-3">
                    <Button variant="outline" onClick={() => navigate("/isolate/add")}>Add New Isolate</Button>
                    <DataTable data={data} columns={columns} />
                </div>
                :
                <IsolatePage id={searchInput.get("id")} />
            }
        </>
    )
}

export default Isolate