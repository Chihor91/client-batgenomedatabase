import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable from "@/components/DataTable/TaxTable";
import TaxForm from "./TaxForm";
import { columns } from "./columns"
import AuthContext from "@/context/AuthContext";

function Taxonomy({ rank }) {
    let { user } = useContext( AuthContext )
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/"+ rank + "/")
        .then((res) => {
            setData(res.data)
        })
    }, [rank])

    return(
        <>
            <div className="container mx-auto py-10 space-y-3">
                { user.is_superuser === true && <TaxForm rank={rank} /> }
                <DataTable data={data} columns={columns[rank]} rank={rank} />
            </div>
        </>
    )
}

export default Taxonomy