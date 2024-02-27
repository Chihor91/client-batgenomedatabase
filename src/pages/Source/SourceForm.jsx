import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { TextField } from "@mui/material"
function BasicInfo({form}) {

    return (
        <section className="space-y-2">
            <div className="font-extrabold text-3xl">Basic Info</div>
            <Input {...form.register("collection", { required: true, maxLength: 30 })} type="text" placeholder="Collection" />
            <Input {...form.register("institution")} type="text" placeholder="Institution" />
            <Input {...form.register("project_name")} type="text" placeholder="Project Name" />
            <Input {...form.register("project_abbr")} type="text" placeholder="Project Abbreviation" />
        </section>
    )
}

function HostInfo({form}) {
    const [host, setHost] = useState(null)
    const hostSampleTypes = {
        "" : [
            { name: "Water", value: "WATER" }
        ],
        BAT : [
            { name: "Bat Gut", value: "GUT" },
            { name: "Bat Rinse", value: "BAT_RINSE" },
            { name: "Guano", value: "GUANO" },
            { name: "Fresh Guano", value: "FRESH_GUANO" },
        ]
    }

    const host_type = form.watch("host_type")

    useEffect(() => {
        setHost(host_type)
        form.setValue("host_species", undefined)
        form.setValue("sample_type", "")

    }, [host_type])



    return (
        <section className="space-y-2">
            <div className="font-extrabold text-3xl">Host Info</div>
            <Controller
                control={form.control}
                name="host_type"
                render={({field}) => {
                    return (
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a host type" />
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="">None</SelectItem>
                                    <SelectItem value="BAT">Bat</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }}
            />
            { host_type  && <Input {...form.register("host_species")} type="text" placeholder="Host Species" /> }
            { (host_type || host_type === "") &&
                <Controller
                    control={form.control}
                    name="sample_type"
                    render={({field}) => {
                        return (
                            <Select key={host_type} onValueChange={field.onChange} {...field}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a sample type" />
                                </SelectTrigger>
                                
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem disabled value="">Select a sample type</SelectItem>
                                        { hostSampleTypes[form.watch("host_type")]
                                            .map((sampleType, key) => 
                                                <SelectItem 
                                                    key={key} 
                                                    value={sampleType.value}
                                                >
                                                    {sampleType.name}
                                                </SelectItem>) 
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }}
                />
            }
        </section>
    )
}

function LocationInfo({form}) {
    return (
        <section className="space-y-2">
            <TextField
                size="small"
                {...form.register('loc_location')}
                type="text" placeholder="Location"
            />
            <TextField
                small="small"
                {...form.register('loc_abbr')}
                type="text" placeholder="Location Abbreviation"
            />
            <TextField
                small="small"
                {...form.register('loc_sampling_site')}
                type="text" placeholder="Sampling Site"
            />
            <TextField
                small="small"
                {...form.register('loc_site_abbr')}
                type="text" placeholder="Sampling Site Abbreviation"
            />
            <TextField
                small="small"
                {...form.register('loc_sampling_point')}
                type="number" placeholder="Sampling Point"
            />
        </section>
    )
}

export default function SourceForm() {
    const form = useForm({})
    const [page, setPage] = useState(1)
    
    let navigate = useNavigate()

    const previous = () => {
        setPage(curPage => curPage - 1)
    }
    const next = () => {
        setPage(curPage => curPage + 1)
    }

    const onSubmit = (data) => {
        axios.post('source/source/', data)
        .then((res) => {
            alert("Source " + res.data.human_readable_id + " successfully created.")
            navigate('/source')
        }).catch((err) => {
            alert(JSON.stringify(err.response.data.message))
            navigate('/source')
        })
    }

    return (
        <div>
            <form className="container mx-auto py-10 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                { page === 1 && <BasicInfo form={form} /> }
                { page === 2 && <HostInfo form={form} /> }
                { page === 3 && <LocationInfo form={form} /> }
                
                <div className="space-x-5">
                    <Button 
                        disabled={page <= 1} 
                        type="button" 
                        onClick={previous} 
                        variant="outline"
                    >Previous</Button>
                    { page === 3 &&
                        <Button type="submit" variant="outline">Add Source</Button>
                    }
                    { page != 3 &&
                        <Button 
                            disabled={page >= 3} 
                            type="button" 
                            onClick={next} 
                            variant="outline"
                        >Next</Button>
                    }
                </div>
            </form>
        </div>
    )
}