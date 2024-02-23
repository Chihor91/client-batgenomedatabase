import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandInput, CommandItem } from "@/components/ui/command"
import { CommandEmpty, CommandGroup } from "cmdk"
import { useNavigate } from "react-router-dom"

function BasicInfo({form, navigate}) {
    const [sources, setSources] = useState([])
    
    
    async function fetchData() {
        const { data } = await axios.get(axios.defaults.baseURL + "/source/source/")

        setSources(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="space-y-2">
            <div className="font-extrabold text-3xl">Basic Info</div>
            <Controller
                control={form.control}
                name="project"
                render={({field}) => {
                    return (
                        <Popover onValueChange={field.onChange} {...field}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-primary"
                                    )}
                                >
                                    {field.value
                                        ? sources.find(
                                            (source) => source.id === field.value
                                        )?.human_readable_id
                                        :   "Select Source"
                                    } 
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search source..." />
                                        <CommandEmpty>
                                            <button className="w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent" onClick={() => navigate("/source/add")}>Add new source</button>
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {sources.map((source) => (
                                                <CommandItem
                                                    value={source.id}
                                                    key={source.id}
                                                    onSelect = {() => {
                                                        form.setValue("source", source.id)
                                                    }}>{source.human_readable_id}</CommandItem>
                                            ))

                                            }
                                            <CommandItem onSelect={() => navigate("/source/add")}>Add new source</CommandItem>
                                        </CommandGroup>
                                    </Command>
                            </PopoverContent>
                        </Popover>
                    )
                }}
            />
            <Controller
                control={form.control}
                name="type"
                render={({field}) => {
                    return (
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a strain type" />
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">Bacteria</SelectItem>
                                    <SelectItem value="2">Yeast</SelectItem>
                                    <SelectItem value="3">Mold</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }}
            />
        </section>
    )
}


export default function StrainForm() {
    let navigate = useNavigate()
    const form = useForm({})
    const [page, setPage] = useState(1)
    const [projectModal, setProjectModal] = useState(false)

    // const previous = () => {
    //     setPage(curPage => curPage - 1)
    // }
    // const next = () => {
    //     setPage(curPage => curPage + 1)
    // }

    const onSubmit = (data) => {
        axios.post("source/isolate/", data)
        .then((res) => {
            console.log(res)
        })
    }

    return (
        <div>
            <form className="container mx-auto py-10 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                { page === 1 && <BasicInfo form={form} navigate={navigate} /> }
                {/* { page === 2 && <HostInfo form={form} modalOpen={projectModal} setModalOpen={setProjectModal} /> }
                { page === 3 && <LocationInfo form={form} /> } */}
                
                <div>
                    {/* <Button 
                        disabled={page <= 1} 
                        type="button" 
                        onClick={previous} 
                        variant="outline"
                    >Previous</Button> */}
                    {/* { page === 3 && */}
                        <Button type="submit" variant="outline">Add Isolate</Button>
                    {/* }
                    { page != 3 &&
                        <Button 
                            disabled={page >= 3} 
                            type="button" 
                            onClick={next} 
                            variant="outline"
                        >Next</Button>
                    } */}
                </div>
            </form>
        </div>
    )
}