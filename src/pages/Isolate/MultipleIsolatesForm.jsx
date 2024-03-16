import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function MultipleIsolateForm() {
    const form = useForm({})
    const [results, setResults] = useState([])
    
    const onSubmit = (data) => {
        let form_data = new FormData()
        console.log(data.isolates[0])
        form_data.append("isolates", data.isolates[0])
        axios.post(axios.defaults.baseURL + "/source/isolate/add/file/", form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResults(res.data.results)
            console.log(res.data)
        })
    }
    return (
       <div>
            <form className="container mx-auto py-10 space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <Input type="file" accept='.csv' {...form.register("isolates", { required: "This field is required" })} />
                <Button type="submit" variant="outline">Upload File</Button>
            </form>
                <ul>{results.length > 0 &&
                    results.map((result, key) => 
                        <li key={key} className="flex justify-center space-x-2">
                            <div>
                            {result.success ?
                                "Success":
                                "Fail"
                            }
                            </div>
                            <div>{result.message}</div>
                        </li>
                    )
                }</ul>
       </div>
    )
}