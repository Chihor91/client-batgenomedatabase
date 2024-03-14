import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useForm } from "react-hook-form"

export default function MultipleIsolateForm() {
    const form = useForm({})
    
    const onSubmit = (data) => {
        let form_data = new FormData()
        console.log(data.isolates[0])
        form_data.append("isolates", data.isolates[0])
        axios.post(axios.defaults.baseURL + "/source/isolate/import_from_file/", form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }
    return (
       <div>
            <form className="container mx-auto py-10 space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <Input type="file" accept='.csv' {...form.register("isolates", { required: "This field is required" })} />
                <Button type="submit" variant="outline">Upload File</Button>
            </form>
            {JSON.stringify(form.watch(form))}
       </div>
    )
}