import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { caves } from "@/constants/caves"
import { projects } from "@/constants/projects"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import SelectMISO from "@/components/Forms/SelectMISO"
import { Separator } from "@/components/ui/separator"

function BasicInfo({form}) {
	const project_name = form.watch("project_name")

	useEffect(() => {
        let project = projects.find(project => project.project_name === project_name)
		if (project) {
			form.setValue("project_abbr", project.project_abbr)
			form.setValue("institution_name", project.institution_name)
			form.setValue("institution", project.institution_abbr)
			form.setValue("collection_name", project.collection_name)
			form.setValue("collection", project.collection_abbr)
		}

    }, [form, project_name])

    return (
        <section className="grid grid-cols-6 gap-x-4 gap-y-2">
            <div className="font-bold text-xl col-span-full">Project and Collection</div>
			<div className="col-span-full">
				<Label>Project</Label>
				<Controller
					control={form.control}
					name="project_name"
					rules={{
						required: "Please select a project"
					}}
					render={({field}) => {
						return (
							<Select onValueChange={field.onChange} {...field}>
								<SelectTrigger error={form.formState.errors.project_name} helperText={form.formState.errors.project_name?.message}>
									<SelectValue placeholder="Select a project" />
								</SelectTrigger>
								
								<SelectContent>
									<SelectGroup>
										{projects.map((project, key) => 
											<SelectItem 
												key={key}
												value={project.project_name}
											>
												{project.project_name}
											</SelectItem>
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						)
					}}
				/>
			</div>
            <div className="lg:col-span-3 col-span-full">
				<Label>Collection</Label>
				<Input {...form.register("collection_name")} disabled
					type="text" placeholder="e.g. Microbial Culture Collection" 
				/>
			</div>

			<div className="lg:col-span-3 col-span-full">
				<Label>Institution</Label>
				<Input {...form.register("institution_name")} disabled
					type="text" placeholder="e.g. UPLB Museum of Natural History" 
				/>
			</div>

            <Input {...form.register("collection")} 
                type="hidden" placeholder="Collection Abbreviation" 
            />

            <Input {...form.register("institution")} 
                type="hidden" placeholder="Institution Abbreviation" 
            />

            <Input {...form.register("project_abbr")}
                type="hidden" placeholder="Project Abbreviation"
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
        <section className="grid grid-cols-6 gap-x-4 gap-y-2">
            <div className="font-bold text-xl col-span-full">Host</div>
            <div className="col-span-6">
				<Label>Host Type</Label>
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
			</div>
			<div className="lg:col-span-3 col-span-full">
				<Label>Host Species</Label>
				<Input {...form.register("host_species", {maxLength: {value: 50, message: "Please input below 50 characters."}})} 
				type="text" className="italic" placeholder="Host Species" disabled={!host_type}
				error={form.formState.errors.host_species} helperText={form.formState.errors.host_species?.message} /> 
			</div>
            { (host_type || host_type === "") &&
                <div className="lg:col-span-3 col-span-full">
					<Label>Sample Type</Label>
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
				</div>
            }
        </section>
    )
}

function MISOCategories({form}) {
	const [MISOCategories, setMISOCategories] = useState([])

	useEffect(() => {	
		form.setValue("miso_categories", MISOCategories)
	}, [form, MISOCategories])

	function handleMISOChange (MISOData) {
		setMISOCategories([...MISOCategories, MISOData])
	}

	return (
		<div>
			<div className="font-bold text-xl text-left">MISO Categories</div>
			<div>{ MISOCategories.length != 0 ?
				MISOCategories.map((item, key) => 
					<Badge key={key} variant='secondary' className='inline text-xs'>
						{item.toString()}
						<Button
						type='button'
						variant='ghost'
						className='h-1 w-2 items-center text-destructive hover:bg-disable'
						onClick={() => {
							const newArray = [...MISOCategories.slice(0, key),...MISOCategories.slice(key+1)]
							setMISOCategories(newArray)
						}}
						>x</Button>
					</Badge>)
				:
				null
			}</div>
			<SelectMISO handleMISOChange={handleMISOChange} />
		</div>
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
		<section className="grid grid-cols-6 gap-x-4 gap-y-2">
			<div className="font-bold text-xl text-left col-span-full">Sampling Site</div>
			<div className="lg:col-span-4 col-span-full">
				<Label>Site/Cave</Label>
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
			</div>
			<div className="lg:col-span-2 col-span-full">
				<Label>Sampling Point</Label>
				<Input {...form.register('loc_sampling_point', { required: "Please fill out this field"})} 
					type="number" placeholder="e.g. 0" min='0'
					error={form.formState.errors.loc_sampling_point} helperText={form.formState.errors.loc_sampling_point?.message}
				/>
			</div>
			<div className="lg:col-span-3 col-span-full">
				<Label>City/Municipality</Label>
				<Input {...form.register("loc_city")} 
					type="text" placeholder="e.g. Cavinti" disabled
					error={form.formState.errors.loc_city} helperText={form.formState.errors.loc_city?.message}
				/>
			</div>
			<div className="lg:col-span-3 col-span-full">
				<Label>Province</Label>
				<Input {...form.register("loc_province")} 
					type="text" placeholder="e.g. Laguna" disabled
					error={form.formState.errors.loc_province} helperText={form.formState.errors.loc_province?.message} 
				/> 
			</div>
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
        <div className="container border rounded-lg py-10 my-10">
            <form className="text-left" onSubmit={form.handleSubmit(onSubmit)}>
                <BasicInfo form={form} />
				<Separator className="my-4" />
                <HostInfo form={form} />
				<Separator className="my-4" />
                <LocationInfo form={form} />
				<Separator className="my-4" />
				<MISOCategories form={form} />
				<Separator className="my-4" />
                <div className="space-x-3">
                    <Button type="submit" variant="outline">Add Source</Button>
                </div>
            </form>
			{/* {JSON.stringify(form.watch())} */}
        </div>
    )
}