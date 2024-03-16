import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"

function BasicInfo({form}) {

    return (
        <section className="space-y-2">
            <div className="font-extrabold text-3xl">Project and Collection</div>
            <Input {...form.register("collection", { required: "Please fill out this field", maxLength: 30 })} 
                type="text" placeholder="Collection" 
                error={form.formState.errors.collection} helperText={form.formState.errors.collection?.message}
            />
            {form.formState.errors.collection && <div></div>}
            <Input {...form.register("institution", { required: "Please fill out this field"})} 
                type="text" placeholder="Institution" 
                error={form.formState.errors.institution} helperText={form.formState.errors.institution?.message}
            />
            <Input {...form.register("project_name", { required: "Please fill out this field"})}
                type="text" placeholder="Project Name" 
                error={form.formState.errors.project_name} helperText={form.formState.errors.project_name?.message}
            />
            <Input {...form.register("project_abbr", { required: "Please fill out this field"})}
                type="text" placeholder="Project Abbreviation"
                error={form.formState.errors.project_abbr} helperText={form.formState.errors.project_abbr?.message}
            />
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
            <div className="font-extrabold text-3xl">Host</div>
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
                    rules={{
                        required: "Please select a sample type"
                    }}
                    render={({field}) => {
                        return (
                            <Select key={host_type} onValueChange={field.onChange} {...field}>
                                <SelectTrigger error={form.formState.errors.sample_type} helperText={form.formState.errors.sample_type?.message}>
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
            <div className="font-extrabold text-3xl">Sampling Location</div>
            <Input {...form.register('loc_location', { required: "Please fill out this field" })} 
                type="text" placeholder="Location"
                error={form.formState.errors.loc_location} helperText={form.formState.errors.loc_location?.message}
            />
            <Input {...form.register('loc_abbr', { required: "Please fill out this field" })} 
                type="text" placeholder="Location Abbreviation"
                error={form.formState.errors.loc_abbr} helperText={form.formState.errors.loc_abbr?.message}
            />
            <Input {...form.register('loc_sampling_site', { required: "Please fill out this field" })} 
                type="text" placeholder="Sampling Site"
                error={form.formState.errors.loc_sampling_site} helperText={form.formState.errors.loc_sampling_site?.message}
            />
            <Input {...form.register('loc_site_abbr', { required: "Please fill out this field" })} 
                type="text" placeholder="Sampling Site Abbreviation"
                error={form.formState.errors.loc_site_abbr} helperText={form.formState.errors.loc_site_abbr?.message}
            />
            <Input {...form.register('loc_sampling_point', { required: "Please fill out this field" })} 
                type="number" placeholder="Sampling Point"
                error={form.formState.errors.loc_sampling_point} helperText={form.formState.errors.loc_sampling_point?.message}
            />
        </section>
    )
}

export default function SourceForm() {
    const form = useForm({
        defaultValues: {
            host_type: ""
        }
    })
    const [page, setPage] = useState(1)
    
    let navigate = useNavigate()

    const previous = () => {
        setPage(curPage => curPage - 1)
    }
    const next = () => {
        form.trigger()
        setPage(curPage => curPage + 1)
    }

    const onSubmit = (data) => {
        axios.post('/source/add/', data)
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
                {/* { page === 1 && <BasicInfo form={form} /> }
                { page === 2 && <HostInfo form={form} /> }
                { page === 3 && <LocationInfo form={form} /> } */}
                { <BasicInfo form={form} /> }
                { <HostInfo form={form} /> }
                { <LocationInfo form={form} /> }
                <div className="space-x-3">
                    {/* <Button 
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
                    } */}
                    <Button type="submit" variant="outline">Add Source</Button>
                </div>
            </form>
            {JSON.stringify(form.watch())}
        </div>
    )
}