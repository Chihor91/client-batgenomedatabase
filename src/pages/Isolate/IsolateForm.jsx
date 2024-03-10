import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectGroup,
	SelectItem,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Command, CommandInput, CommandItem } from '@/components/ui/command'
import { CommandEmpty, CommandGroup } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { Switch } from '@/components/ui/switch'

function Basic({ form, navigate }) {
	const [sources, setSources] = useState([])

	async function fetchData() {
		try {
			const response = await axios.get(axios.defaults.baseURL + '/source/source/')
			if (response.status === 200) {
				setSources(response.data)
			} else {
				console.error('Unexpected response status:', response.status)
			}
		} catch (error) {
			console.error('Error during data fetch:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<section className='space-y-2'>
			<Controller
				control={form.control}
				name='source'
				rules={{
					required: "Please select a source",
				}}
				render={({ field }) => {
					return (
						<Popover onValueChange={field.onChange} {...field}>
							<PopoverTrigger 
								error={(form.formState.errors.source && !field.value)} 
								helperText={form.formState.errors.source?.message}
								asChild
							>
								<Button
									variant='outline'
									role='combobox'
									className={cn('w-full justify-between', !field.value && 'text-primary')}>
									{field.value
										? sources.find((source) => source.id === field.value)?.human_readable_id
										: 'Select Source'}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-full p-0'>
								<Command>
									<CommandInput placeholder='Search source...' />
									<CommandEmpty>
										<button
											className='w-full rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent'
											onClick={() => navigate('/source/add')}>
											Add new source
										</button>
									</CommandEmpty>
									<CommandGroup>
										{sources.map((source, key) => (
											<CommandItem
												value={source.id}
												key={key}
												onSelect={() => {
													form.setValue('source', source.id)
												}}>
												{key + 1 + ' ' + source.human_readable_id}
											</CommandItem>
										))}
										<CommandItem onSelect={() => navigate('/source/add')}>
											Add new source
										</CommandItem>
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
					)
				}}
			/>
			<Controller
				control={form.control}
				name='type'
				rules={{
					required: "Please select a strain type"
				}}
				render={({ field }) => {
					return (
						<Select onValueChange={field.onChange} {...field}>
							<SelectTrigger
								error={form.formState.errors.type}
								helperText={form.formState.errors.type?.message}
							>
								<SelectValue placeholder='Select a strain type' />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectItem value='1'>Bacteria</SelectItem>
									<SelectItem value='2'>Yeast</SelectItem>
									<SelectItem value='3'>Mold</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					)
				}}
			/>
		</section>
	)
}

function Taxonomy({form}) {
    return (
        <section className="space-y-2">
            <Input {...form.register('taxonomy.domain')} type="text" placeholder="Domain" />
            <Input {...form.register('taxonomy.phylum')} type="text" placeholder="Phylum" />
            <Input {...form.register('taxonomy.class')} type="text" placeholder="Class" />
            <Input {...form.register('taxonomy.order')} type="text" placeholder="Order" />
            <Input {...form.register('taxonomy.family')} type="text" placeholder="Family" />
            <Input {...form.register('taxonomy.genus')} type="text" placeholder="Genus" />
            <Input {...form.register('taxonomy.species')} type="text" placeholder="Species" />
        </section>
    )
}

function Morphology({form}) {
    return (
        <section className="space-y-2">
			<Controller
				control={form.control}
				name='morphology.gram_stain'
				render={({ field }) => {
					return (
						<div className={`w-full bg-background ${field.value === undefined && 'bg-transparent'}  flex justify-between border rounded-md p-2 text-sm`}>
							<span>Gram Stain</span>
							<span>{field.value !== undefined && (field.value ? 'Positive' : 'Negative')}</span>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</div>
					)
				}}
			/>
			<Controller
				control={form.control}
				name='morphology.cell_shape'
				render={({ field }) => {
					return (
						<Select onValueChange={field.onChange} {...field}>
							<SelectTrigger>
								<SelectValue placeholder='Cell Shape' />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectItem value='coccus-shaped'>Coccus-shaped</SelectItem>
									<SelectItem value='rod-shaped'>Rod-shaped</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Controller
				control={form.control}
				name='morphology.motility'
				render={({ field }) => {
					return (
						<div className={`w-full bg-background ${field.value === undefined && 'bg-transparent'}  flex justify-between border rounded-md p-2 text-sm`}>
							<span>Motility</span>
							<span>{field.value !== undefined && (field.value ? 'Yes' : 'No')}</span>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</div>
					)
				}}
			/>
        </section>
    )
}

function CultureGrowth({form}) {
    return (
        <section className="space-y-2">
            <Input {...form.register('culture_growth.medium')} type="text" placeholder="Culture Medium" />
            <Controller
				control={form.control}
				name='culture_growth.growth'
				render={({ field }) => {
					return (
						<div className={`w-full bg-background ${field.value === undefined && 'bg-transparent'}  flex justify-between border rounded-md p-2 text-sm`}>
							<span>Growth</span>
							<span>{field.value !== undefined && (field.value ? 'Yes' : 'No')}</span>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</div>
					)
				}}
			/>
            <Input {...form.register('culture_growth.medium_composition')} type="text" placeholder="Culture Medium Composition" />

			<Input {...form.register('culture_growth.culture_temp')} type="number" placeholder="Growth Temperature" />
			<Input {...form.register('culture_growth.temp_range')} type="text" placeholder="Temperature Range" />
        </section>
    )
}

function Physiology({form}) {
	return (
		<section className='space-y-2'>
			<Controller
				control={form.control}
				name='physiology_metabolism.oxygen_tolerance'
				render={({ field }) => {
					return (
						<Select onValueChange={field.onChange} {...field}>
							<SelectTrigger>
								<SelectValue placeholder='Oxygen Tolerance' />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectItem value='aerobe'>Aerobe</SelectItem>
									<SelectItem value='anaerobe'>Anaerobe</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					)
				}}
			/>
		</section>
	)
}

function Safety({form}) {
	return (
		<section className='space-y-2'>
			<Controller
				control={form.control}
				name='safety_information.pathogenicity_human'
				render={({ field }) => {
					return (
						<div className={`w-full bg-background ${field.value === undefined && 'bg-transparent'}  flex justify-between border rounded-md p-2 text-sm`}>
							<span>Pathogenicity (Human)</span>
							<span>{field.value !== undefined && (field.value ? 'Yes' : 'No')}</span>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</div>
					)
				}}
			/>
			<Controller
				control={form.control}
				name='safety_information.pathogenicity_animal'
				render={({ field }) => {
					return (
						<div className={`w-full bg-background ${field.value === undefined && 'bg-transparent'}  flex justify-between border rounded-md p-2 text-sm`}>
							<span>Pathogenicity (Animal)</span>
							<span>{field.value !== undefined && (field.value ? 'Yes' : 'No')}</span>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</div>
					)
				}}
			/>
			<Input {...form.register('safety_information.biosafety_level')} 
				type="number" placeholder="Biosafety Level" 
			/>
		</section>
	)
}

export default function IsolateForm() {
	let navigate = useNavigate()
	const form = useForm({
		source: '',
	})

	const [taxonomy, setTaxonomy] = useState(false)
	const [morphology, setMorphology] = useState(false)
	const [culture, setCulture] = useState(false)
	const [physiology, setPhysiology] = useState(false)
	const [safety, setSafety] = useState(false)

	const { watch } = form

	const onSubmit = (data) => {
		axios
			.post('source/isolate/', data)
			.then((res) => {
				alert('Isolate ' + res.data.human_readable_id + ' successfully created.')
				navigate('/isolate')
			})
			.catch((err) => {
				alert(JSON.stringify(err.response.data.message))
				navigate('/isolate')
			})
	}

	const toggleSection = (value, setter, field) => {
		setter(value)
		!value && form.unregister(field)
		
	}

    return (
        <div>
            <form className="container mx-auto py-10 space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                
				<div className='space-y-2 border p-3 rounded-md'>
					<div className='font-extrabold text-3xl text-left'>Source Information</div>
					<Basic form={form} navigate={navigate} />
				</div>

				<div className='space-y-2 border p-3 rounded-md'>
					<div className='flex justify-between'>
						<div className="font-extrabold text-3xl text-left">
							Taxonomic Classification
						</div>
						<Switch className="mt-2" checked={taxonomy} onCheckedChange={() => toggleSection(!taxonomy, setTaxonomy, "taxonomy")} />
					</div>
					{taxonomy && <Taxonomy form={form} />}
				</div>

                <div className='space-y-2 border p-3 rounded-md'>
					<div className='flex justify-between'>
						<div className="font-extrabold text-3xl text-left">
							Morphology
						</div>
						<Switch className="mt-2" checked={morphology} onCheckedChange={() => toggleSection(!morphology, setMorphology, "morphology")} />
					</div>
					{ morphology && <Morphology form={form} /> }
				</div>

				<div className='space-y-2 border p-3 rounded-md'>
					<div className='flex justify-between'>
						<div className="font-extrabold text-3xl text-left">
							Culture and Growth Conditions
						</div>
						<Switch className="mt-2" checked={culture} onCheckedChange={() => toggleSection(!culture, setCulture, "culture_growth")} />
						
					</div>
					{ culture && <CultureGrowth form={form} /> }
				</div>

				<div className='space-y-2 border p-3 rounded-md'>
					<div className='flex justify-between'>
						<div className="font-extrabold text-3xl text-left">
							Physiology and Metabolism
						</div>
						<Switch className="mt-2" checked={physiology} onCheckedChange={() => toggleSection(!physiology, setPhysiology, "physiology_metabolism")} />
						
					</div>
					{ physiology && <Physiology form={form} /> }
				</div>

				<div className='space-y-2 border p-3 rounded-md'>
					<div className='flex justify-between'>
						<div className="font-extrabold text-3xl text-left">
							Safety Information
						</div>
						<Switch className="mt-2" checked={safety} onCheckedChange={() => toggleSection(!safety, setSafety, "safety_information")} />
						
					</div>
					{ safety && <Safety form={form} /> }
				</div>

				<Button type="submit" variant="outline">Add Isolate</Button>

                <div>{JSON.stringify(watch(form))}</div>
            </form>
        </div>
    )
}
