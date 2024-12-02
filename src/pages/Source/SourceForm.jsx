import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { caves } from "@/constants/caves"

function BasicInfo({form}) {

    return (
        <section className="space-y-2">
            <div className="font-extrabold text-3xl">Project and Collection</div>
            <Input {...form.register("collection_name", { required: "Please fill out this field", maxLength: {value: 512, message: "Please input below 512 characters"}})} 
                type="text" placeholder="Collection Name"
                error={form.formState.errors.collection_name} helperText={form.formState.errors.collection_name?.message}
            />
            <Input {...form.register("collection", { required: "Please fill out this field", maxLength: {value: 25, message: "Please input below 25 characters."} })} 
                type="text" placeholder="Collection Abbreviation" 
                error={form.formState.errors.collection} helperText={form.formState.errors.collection?.message}
            />
            <Input {...form.register("institution_name", { required: "Please fill out this field", maxLength: {value: 512, message: "Please input below 512 characters"}})} 
                type="text" placeholder="Institution Name"
                error={form.formState.errors.institution_name} helperText={form.formState.errors.institution_name?.message}
            />
            <Input {...form.register("institution", { required: "Please fill out this field", maxLength: {value: 25, message: "Please input below 25 characters."}})} 
                type="text" placeholder="Institution Abbreviation" 
                error={form.formState.errors.institution} helperText={form.formState.errors.institution?.message}
            />
            <Input {...form.register("project_name", { required: "Please fill out this field", maxLength: {value: 512, message: "Please input below 512 characters."}})}
                type="text" placeholder="Project Name" 
                error={form.formState.errors.project_name} helperText={form.formState.errors.project_name?.message}
            />
            <Input {...form.register("project_abbr", { required: "Please fill out this field", maxLength: {value: 25, message: "Please input below 25 characters."}})}
                type="text" placeholder="Project Abbreviation"
                error={form.formState.errors.project_abbr} helperText={form.formState.errors.project_abbr?.message}
            />
        </section>
    )
}

function HostInfo({form}) {
    const hostSampleTypes = {
        "" : [
            { name: "Water", value: "WATER" }
        ],
        BAT : [
            { name: "Bat Gut", value: "GUT" },
            { name: "Bat Rinse", value: "RINSE" },
            { name: "Guano", value: "GUANO" },
            { name: "Fresh Guano", value: "FRESH_GUANO" },
            { name: "Bat Fecal Pellet", value: "FECAL_PELLET"}
        ]
    }

    const host_type = form.watch("host_type")

    useEffect(() => {
        form.setValue("host_species", undefined)
        form.setValue("sample_type", "")

    }, [form, host_type])



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
            { host_type  && 
                <Input {...form.register("host_species", {maxLength: {value: 50, message: "Please input below 50 characters."}})} 
                type="text" className="italic" placeholder="Host Species" 
                error={form.formState.errors.host_species} helperText={form.formState.errors.host_species?.message} /> 
            }
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

	const sample_site = form.watch("loc_sampling_site")
	useEffect(() => {
        let site = caves.find(cave => cave.name === sample_site)
		if (site) {
			form.setValue("loc_city", site.municity)
			form.setValue("loc_province", site.province)
			form.setValue("loc_abbr", site.loc_abbr)
			form.setValue("loc_site_abbr", site.loc_site_abbr)
			form.setValue("loc_longitude", site.coordinates[1])
			form.setValue("loc_latitude", site.coordinates[0])

		}


    }, [form, sample_site])
    return (
		<section className="space-y-2">
			<div className="font-extrabold text-3xl">Sampling Site</div>
            <Controller
                control={form.control}
                name="loc_sampling_site"
                render={({field}) => {
                    return (
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a sampling site" />
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectGroup>
                                    {caves.map((cave, key) => 
										<SelectItem
											key={key}
											value={cave.name}
										>{cave.name}</SelectItem>
									)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }}
            />
			<Input {...form.register('loc_sampling_point', { required: "Please fill out this field"})} 
				type="number" placeholder="Sampling Point" min='0'
				error={form.formState.errors.loc_sampling_point} helperText={form.formState.errors.loc_sampling_point?.message}
			/>			
			<Input {...form.register("loc_city")} 
                type="text" placeholder="City/Municipality" disabled
                error={form.formState.errors.loc_city} helperText={form.formState.errors.loc_city?.message} />
			<Input {...form.register("loc_province")} 
                type="text" placeholder="Province" disabled
                error={form.formState.errors.loc_province} helperText={form.formState.errors.loc_province?.message} /> 
			<Input {...form.register('loc_site_abbr')} type="hidden" />
            <Input {...form.register('loc_abbr')} type="hidden" />
            <Input {...form.register('loc_longitude')} type="hidden" />
            <Input {...form.register('loc_latitude')} type="hidden" />
		</section>
    )
}

export default function SourceForm() {
    const form = useForm({
        defaultValues: {
            host_type: ""
        }
    })

    let navigate = useNavigate()

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
                { <BasicInfo form={form} /> }
                { <HostInfo form={form} /> }
                { <LocationInfo form={form} /> }
                <div className="space-x-3">
                    <Button type="submit" variant="outline">Add Source</Button>
                </div>
            </form>
			{JSON.stringify(form.watch())}
        </div>
    )
}