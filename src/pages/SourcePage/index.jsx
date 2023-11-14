import axios from "axios";
import { useEffect, useState } from "react"

export default function SourcePage({id}) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/source/" + id)
        .then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    }, [])

    return (
        <>
            {data &&
                <div>
                    {
                        JSON.stringify(data)
                    }
                </div>
                
            }
        </>
    )
}