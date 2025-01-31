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
        <div className="w-full h-full">
            {(isolateCount >= 0 && sourceCount >= 0) &&
				<div className="flex text-left">
					<div className="w-full">
						<div className="w-full inline-block">
							<span>Total Sources:</span>
						</div>
						<div className="h-full my-auto mt-[calc(-1vw+10px)]">
							<span className="text-[calc(8vw+10px)] md:text-[calc(4vw+10px)]  font-semibold">{sourceCount}</span>
						</div>
					</div>
					<div className="w-full">
						<div className="w-full inline-block">
							<span>Total Isolates:</span>
						</div>
						<div className="h-full mt-[calc(-1vw+10px)]">
							<span className="text-[calc(8vw+10px)] md:text-[calc(4vw+10px)] font-semibold">{isolateCount}</span>
						</div>
					</div>
				</div>
            // <Grid container spacing={1}>
            //     <Grid item xs={12} sm={6}>
            //         <div className="border p-3 rounded-md">
            //             <label className="text-center text-xl font-bold">Sources</label>
            //             <div className="text-3xl font-bold">{sourceCount}</div>
            //         </div>
            //     </Grid>
            //     <Grid item xs={12} sm={6}>
            //         <div className="border p-3 rounded-md">
            //             <label className="text-center text-xl font-bold">Isolates</label>
            //             <div className="text-3xl font-bold">{isolateCount}</div>
            //         </div>
            //     </Grid>
            // </Grid>
			}
        </div>
    )
}

export default Statistics