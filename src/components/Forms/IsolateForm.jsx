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
            Basic Info
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
                                        !field.value && "text-muted-foreground"
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
                                            <CommandItem onClick={() => navigate("/source/add")}>Add new source</CommandItem>
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
                                <SelectValue placeholder="Select a isolate type" />
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

// function HostInfo({form, modalOpen, setModalOpen}) {
//     const [host, setHost] = useState(null)
//     const hostSampleTypes = {
//         "" : [
//             { name: "Water", value: "WATER" }
//         ],
//         BAT : [
//             { name: "Bat Gut", value: "GUT" },
//             { name: "Bat Rinse", value: "BAT_RINSE" },
//             { name: "Guano", value: "GUANO" },
//             { name: "Fresh Guano", value: "FRESH_GUANO" },
//         ]
//     }

//     const host_type = form.watch("host_type")

//     useEffect(() => {
//         setHost(host_type)
//         form.setValue("host_species", undefined)
//         form.setValue("sample_type", "")

//     }, [host_type])



//     return (
//         <section className="space-y-2">
//             Host Info
//             <Controller
//                 control={form.control}
//                 name="host_type"
//                 render={({field}) => {
//                     return (
//                         <Select onValueChange={field.onChange} {...field}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select a host type" />
//                             </SelectTrigger>
                            
//                             <SelectContent>
//                                 <SelectGroup>
//                                     <SelectItem value="">None</SelectItem>
//                                     <SelectItem value="BAT">Bat</SelectItem>
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                     )
//                 }}
//             />
//             { host_type  && <Input {...form.register("host_species")} type="text" placeholder="Host Species" /> }
//             { (host_type || host_type === "") &&
//                 <Controller
//                     control={form.control}
//                     name="sample_type"
//                     render={({field}) => {
//                         return (
//                             <Select key={host_type} onValueChange={field.onChange} {...field}>
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select a sample type" />
//                                 </SelectTrigger>
                                
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectItem disabled value="">Select a sample type</SelectItem>
//                                         { hostSampleTypes[form.watch("host_type")]
//                                             .map((sampleType, key) => 
//                                                 <SelectItem 
//                                                     key={key} 
//                                                     value={sampleType.value}
//                                                 >
//                                                     {sampleType.name}
//                                                 </SelectItem>) 
//                                         }
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                         )
//                     }}
//                 />
//             }
//         </section>
//     )
// }

// function LocationInfo({form}) {
//     const [locations, setLocations] = useState([])
//     const [caves, setCaves] = useState([])
//     const [points, setPoints] = useState([])
//     const [locID, setLocID] = useState(null)
//     const [caveID, setCaveID] = useState(null)

//     async function fetchLocations() {
//         const { data } = await axios.get(axios.defaults.baseURL + "/location/location/")
//         setLocations(data)
//     }

//     async function fetchCaves(location) {
//         const { data } = await axios.get(axios.defaults.baseURL + "/location/cave/?location=" + location)
//         setCaves(data)
//     }

//     async function fetchPoints(cave) {
//         const { data } = await axios.get(axios.defaults.baseURL + "/location/point/?cave=" + cave)
//         setPoints(data)
//     }

//     useEffect(() => {
//         fetchLocations()
//     }, [])


//     return (
//         <section>Location Info
//             <Select onValueChange={(value) => {setLocID(value); fetchCaves(value)}}>
//                 <SelectTrigger>
//                     <SelectValue placeholder="Select a location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                     {
//                         locations.map((location) => <SelectItem value={location.id.toString()}>{location.abbr}</SelectItem>)
//                     }
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>

//             <Select disabled={!locID} onValueChange={(value) => {setCaveID(value); fetchPoints(value)}}>
//                 <SelectTrigger>
//                     <SelectValue placeholder="Select a cave" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                     {
//                         caves.map((cave) => <SelectItem value={cave.id.toString()}>{cave.abbr}</SelectItem>)
//                     }
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>
            
//             <Controller
//                 control={form.control}
//                 name="sampling_point"
//                 render={({field}) => {
//                     return(
//                         <Select disabled={!caveID} onValueChange={field.onChange} {...field}>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select a sampling point" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectGroup>
//                                     {
//                                         points.map((point) => <SelectItem value={point.id.toString()}>{point.point_number.toString()}</SelectItem>)
//                                     }
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                     )
//                 }}
//             />
                    

//         </section>
//     )
// }



export default function IsolateForm() {
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
                        <Button type="submit" variant="outline">Add Source</Button>
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
            {/* <ProjectFormModal open={projectModal} handleClose={() => setProjectModal(false)} /> */}
            {/* <pre>{JSON.stringify(form.watch(), null, 2)}</pre> */}
        </div>
    )
}