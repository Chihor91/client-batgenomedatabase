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
	const [loading, setLoading] = useState(true)

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
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<section className='space-y-2'>
			<div className='font-extrabold text-3xl'>Basic Info</div>
			<Controller
				control={form.control}
				name='source'
				render={({ field }) => {
					return (
						<Popover onValueChange={field.onChange} {...field}>
							<PopoverTrigger asChild>
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
				render={({ field }) => {
					return (
						<Select onValueChange={field.onChange} {...field}>
							<SelectTrigger>
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
            <div className="font-extrabold text-3xl">Taxonomic Classification</div>
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
            <div className="font-extrabold text-3xl">Morphology</div>
			<Controller
				control={form.control}
				name='morphology.gram_stain'
				render={({ field }) => {
					return (
						<div className='w-full bg-background flex justify-between border rounded-md p-2 text-sm'>
							<span>Gram Stain</span>
							<span>{field.value ? 'Positive' : 'Negative'}</span>
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
						<div className='w-full bg-background flex justify-between border rounded-md p-2 text-sm'>
							<span>Motility</span>
							<span>{field.value ? 'Yes' : 'No'}</span>
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
            <div className="font-extrabold text-3xl">Culture and Growth Conditions</div>
            <Input {...form.register('culture_growth.medium')} type="text" placeholder="Culture Medium" />
            <Controller
				control={form.control}
				name='culture_growth.growth'
				render={({ field }) => {
					return (
						<div className='w-full bg-background flex justify-between border rounded-md p-2 text-sm'>
							<span>Growth</span>
							<span>{field.value ? 'Yes' : 'No'}</span>
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
			<div className="font-extrabold text-3xl">Physiology and Metabolism</div>
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
			<div className="font-extrabold text-3xl">Safety Information</div>
			<Controller
				control={form.control}
				name='safety_information.pathogenicity_human'
				render={({ field }) => {
					return (
						<div className='w-full bg-background flex justify-between border rounded-md p-2 text-sm'>
							<span>Pathogenicity (Human)</span>
							<span>{field.value ? 'Yes' : 'No'}</span>
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
						<div className='w-full bg-background flex justify-between border rounded-md p-2 text-sm'>
							<span>Pathogenicity (Animal)</span>
							<span>{field.value ? 'Yes' : 'No'}</span>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</div>
					)
				}}
			/>
			<Input {...form.register('culture_growth.medium_composition')} type="number" placeholder="Biosafety Level" />
		</section>
	)
}

export default function IsolateForm() {
	let navigate = useNavigate()
	const form = useForm({
		source: '',
	})
	const [page, setPage] = useState(1)

	const { watch } = form

    const previous = () => {
        setPage(curPage => curPage - 1)
    }
    const next = () => {
        setPage(curPage => curPage + 1)
    }
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

    return (
        <div>
            <form className="container mx-auto py-10 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                { page === 1 && <Basic form={form} navigate={navigate} /> }
                { page === 2 && <Taxonomy form={form} /> }
                { page === 3 && <Morphology form={form} /> }
				{ page === 4 && <CultureGrowth form={form} /> }
				{ page === 5 && <Physiology form={form} /> }
				{ page === 6 && <Safety form={form} /> }
                
                <div className="space-x-3">
                    <Button 
                        disabled={page <= 1} 
                        type="button" 
                        onClick={previous} 
                        variant="outline"
                    >Previous</Button>
                    { page === 6 &&
                        <Button type="submit" variant="outline">Add Isolate</Button>
                    }
                    { page != 6 &&
                        <Button 
                            disabled={page >= 6} 
                            type="button" 
                            onClick={next} 
                            variant="outline"
                        >Next</Button>
                    }
                </div>
                {JSON.stringify(watch(form))}
            </form>
        </div>
    )
}
