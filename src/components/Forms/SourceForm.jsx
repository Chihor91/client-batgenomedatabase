import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"


function SourceForm() {
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
        <Button className="flex w-full space-x-8" variant="outline">Add</Button>
    )
}

export default SourceForm