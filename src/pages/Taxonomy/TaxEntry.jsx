import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const TaxEntry = () => {
    const { rank, id } = useParams()
    console.log(axios.defaults.baseURL + "/tax/" + rank + "/" + id)
    const [entry, setEntry] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/" + rank + "/" + id)
        .then((res) => {
            setEntry(res.data)
            setLoading(false)
        })
    }, [])

    return(
        <>
        { loading ?
            <h1>Loading . . .</h1> :
            <div>
                <h1>
                    ID: {entry.id}
                </h1>
                <h1>
                    Name: {entry.name}
                </h1>
            </div>
        }
        </>
    )
}

export default TaxEntry;