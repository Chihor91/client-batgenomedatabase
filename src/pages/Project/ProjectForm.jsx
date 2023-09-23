import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"


function ProjectForm() {
    const submit = (e) => {
        e.preventDefault()
        let data = {
            name: e.target.name.value,
            abbr: e.target.abbr.value,
        }

        axios.post("source/project/", data)
        .then((res) => {
            window.location.reload(false)
        })
    }

    return(
        <form onSubmit={submit} className="flex w-full space-x-8">
            <Input type="text" name="name" placeholder="Project Name" />
            <Input type="text" name="abbr" placeholder="Project Abbr." />
            <Button type="submit" variant="outline">Add</Button>
        </form>
    )
}

export default ProjectForm