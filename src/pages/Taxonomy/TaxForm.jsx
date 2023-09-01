import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
 } from "@/components/ui/select"


const TaxForm = ({rank}) => {

    const submit = (e) => {
        e.preventDefault()
        let fd = new FormData()
        let name = e.target.name.value
        fd.append("name", name.charAt(0).toUpperCase() + name.slice(1))
        rank !== "domain" && fd.append("parent", e.target.parent.value)

        axios.post("tax/" + rank + "/", fd)
        .then((res) => {
            window.location.reload(false)
        })
    }

    return(
        <form onSubmit={submit} className="flex w-full space-x-8">
            <Input type="text" name="name" placeholder="Name"/>
            { rank !== "domain" && <ParentList rank={rank} /> }
            <Button type="submit" variant="outline">Add</Button>
        </form>
    )
}

const ParentList = ({ rank }) => {
    const [options, setOptions] = useState([])

    const parents = {
        phylum: 'domain',
        class: 'phlyum',
        order: 'class',
        family: 'order',
        genus: 'family',
        species: 'genus'
    }

    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/tax/" + parents[rank] + "/")
        .then((res) => {
            setOptions(res.data)
        })
    }, [rank])

    return(
        // <select name="parent" className='text-black'>
        //     <option>--Select Parent--</option>
        //     {
        //         options.map((parent, id) => {
        //             return(
        //                 <option key={id} value={parent.id}>
        //                     {parent.name}
        //                 </option>
        //             )
        //         })
        //     }
        // </select>
        <Select name="parent">
            <SelectTrigger>
                <SelectValue placeholder="Select a parent" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        options.map((parent, id) => {
                            return(
                                <SelectItem key={id} value={parent.id.toString()}>
                                    {parent.name}
                                </SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default TaxForm