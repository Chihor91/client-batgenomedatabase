import { Grid } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

const Statistics = () => {
    const [isolateCount, setIsolateCount] = useState(null)
    const [sourceCount, setSourceCount] = useState(null)

    useEffect(() => {
        axios.get("/source/isolate/count/")
        .then((res) => {
            setIsolateCount(res.data)
        })
        axios.get("/source/count/")
        .then((res) => {
            setSourceCount(res.data)
        })
    }, [])
    return(
        <div>
            {(isolateCount && sourceCount) && 
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <div className="border p-3 rounded-md">
                        <label className="text-center text-xl font-bold">Sources</label>
                        <div className="text-3xl font-bold">{sourceCount}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className="border p-3 rounded-md">
                        <label className="text-center text-xl font-bold">Isolates</label>
                        <div className="text-3xl font-bold">{isolateCount}</div>
                    </div>
                </Grid>
            </Grid>}
        </div>
    )
}

export default Statistics