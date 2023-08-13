import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const TaxEntry = () => {
    const { rank, id } = useParams()
    const [entry, setEntry] = useState(null)

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/" + rank + "/" + id)
        .then((res) => {
            setEntry(res.data)
        })
    }, [])

    return(
        <div>
            <h1>
                ID: {entry.id}
            </h1>
            <h1>
                Name: {entry.category_name}
            </h1>
            <h1>
                Scientific Name: {entry.scientific_name}
            </h1>
        </div>
    )
}

export default TaxEntry;