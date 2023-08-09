import axios from "axios";
import { useState, useEffect } from "react"

function DomainTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/domain/")
        .then((res) => {
            console.log(res.data)
            setData(res.data)
        })
    }, [])

    return(
        <div>
            {
                data.map((domain, domain_id) => {
                    return(
                        <h1>{domain.id}</h1>
                    )
                })
            }
        </div>
    )
}

export default DomainTable