import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataTable from "../../components/DataTable/DataTable";
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
        { user.is_superuser === true && <TaxForm rank={rank} /> }
        <div className="container mx-auto py-10">
            <DataTable data={data} columns={columns[rank]} rank={rank} />
        </div>
        </>
    )
}

export default Taxonomy