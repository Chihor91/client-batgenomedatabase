import axios from "axios";
import { useEffect, useState } from "react"
import { BasicInfo, HostInfo } from "./Sections";

export default function StrainPage({id}) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/strain/" + id)
        .then((res) => {
            setData(res.data)
        })
    }, [])

    return (
        <>
            {data &&
                <div className="h-[100vh] space-y-3">
                <div className="font-extrabold text-4xl">{data.human_readable_id}</div>
                <BasicInfo data={data} />
                <HostInfo data={data} />
                {/* <BasicInfo data={data} />
                <HostInfo data={data} />
                <SamplingInfo data={data} />
                <Isolates data={data} /> */}
                </div> 
                
            }
        </>
    )
}