import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandInput, CommandItem } from "@/components/ui/command"
import { CommandEmpty, CommandGroup } from "cmdk"


function BasicInfo({form}) {

    return (
        <section className="space-y-2">
            Basic Info
            <Input {...form.register("collection", { required: true, maxLength: 30 })} type="text" placeholder="Collection" />
            <Input {...form.register("institution")} type="text" placeholder="Institution" />
            <Controller
                control={form.control}
                name="type"
                render={({field}) => {
                    return (
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="0">Bacteria</SelectItem>
                                    <SelectItem value="1">Yeast</SelectItem>
                                    <SelectItem value="2">Mold</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }}
            />
        </section>
    )
}

function ProjectInfo({form}) {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        axios.get(axios.defaults.baseURL + "/source/project/")
        .then((res) => {
            setProjects(res.data)
        })
    })

    return (
        <section className="space-y-2">
            <label>Project</label>
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
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? projects.find(
                                            (project) => project.id === field.value
                                        )?.name
                                        :   "Select Project"
                                    } 
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search project..." />
                                        <CommandEmpty>Project not found.</CommandEmpty>
                                        <CommandGroup>
                                            {projects.map((project) => (
                                                <CommandItem
                                                    value={project.id}
                                                    key={project.id}
                                                    onSelect = {() => {
                                                        form.setValue("project", project.id)
                                                    }}>{project.name}</CommandItem>
                                            ))

                                            }
                                        </CommandGroup>
                                    </Command>
                            </PopoverContent>
                        </Popover>
                    )
                }}
            />
        </section>
    )
}

function HostInfo({register}) {
    return (
        <section>Host Info</section>
    )
}



export default function SourceForm() {
    const form = useForm({})
    const [page, setPage] = useState(1)

    const previous = () => {
        setPage(curPage => curPage - 1)
    }
    const next = () => {
        setPage(curPage => curPage + 1)
    }

    const onSubmit = (data) => {
        axios.post("source/source/", data)
        .then((res) => {
            console.log(res)
        })
    }

    return (
        <div>
            <h1>POG</h1>
            <form className="container mx-auto py-10 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                { page === 1 && <BasicInfo form={form} /> }
                { page === 2 && <ProjectInfo form={form} /> }
                { page === 3 && <HostInfo form={form} /> }
                
                <div>
                    <Button 
                        disabled={page <= 1} 
                        type="button" 
                        onClick={previous} 
                        variant="outline"
                    >Previous</Button>
                    { page === 3 ?
                        <Button type="submit" variant="outline">Add Source</Button>
                        :
                        <Button 
                            disabled={page >= 3} 
                            type="button" 
                            onClick={next} 
                            variant="outline"
                        >Next</Button>
                    }
                </div>
            </form>
            <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
        </div>
    )
}