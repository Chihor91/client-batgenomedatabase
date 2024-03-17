import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function Results(results, open, setOpen) {
    let navigate = useNavigate()

    return (
        <Dialog open={open} onOpenChange={() => navigate("/isolate")} onClo>
            <DialogContent>
                <DialogHeader className="text-xl font-semibold">
                    Results
                </DialogHeader>
                <div>
                {results.length > 0 &&
                    results.map((result, key) => 
                    <li key={key} className="flex justify-center space-x-2 text-base">

                        <div className="font-bold">
                        {"Row " + (key+1)}
                        {result.success ?
                            " Success:":
                            " Fail:"
                        }
                        </div>
                        <div>{result.message}</div>
                    </li>
                )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function MultipleIsolateForm() {
    const form = useForm({})
    const [open, setOpen] = useState(false)
    const [results, setResults] = useState([])
    
    const onSubmit = (data) => {
        let form_data = new FormData()
        form_data.append("isolates", data.isolates[0])
        axios.post(axios.defaults.baseURL + "/source/isolate/add/file/", form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResults(res.data.results)
            setOpen(true)
        })
    }
    return (
       <div>
            <form className="container mx-auto py-10 space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <Input type="file" accept='.csv' {...form.register("isolates", { required: "This field is required" })} />
                <Button type="submit" variant="outline">Upload File</Button>
            </form>
            {Results(results, open, setOpen)}
       </div>
    )
}