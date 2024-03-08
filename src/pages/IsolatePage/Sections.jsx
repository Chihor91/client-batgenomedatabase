import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import IsolateTable from '@/pages/Isolate/IsolateTable'
import { columns } from '@/pages/Isolate/columns'

const sectionStyle = 'border w-full bg-white/10 shadow-md rounded-md  text-start'
const colTriggerStyle = 'flex  w-full text-start text-2xl font-extrabold p-2'
const colContentStyle = ''
const listStyle = 'space-y-1 p-2'
const label = 'font-bold mr-2'

function Taxonomy({ data }) {
	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Taxonomic Classification</div>
			<ul className={listStyle}>
				{data.taxonomy.domain &&
					<li className='flex'>
						<div className={label}>Domain:</div>
						{data.taxonomy.domain}
					</li>
				}
				{data.taxonomy.phylum &&
					<li className='flex'>
						<div className={label}>Phylum:</div>
						{data.taxonomy.phylum}
					</li>
				}
				{data.taxonomy.class &&
					<li className='flex'>
						<div className={label}>Class:</div>
						{data.taxonomy.class}
					</li>
				}
				{data.taxonomy.order &&
					<li className='flex'>
						<div className={label}>Order:</div>
						{data.taxonomy.order}
					</li>
				}
				{data.taxonomy.family && 
					<li className='flex'>
						<div className={label}>Family:</div>
						{data.taxonomy.family}
					</li>
				}
				{data.taxonomy.genus && 
					<li className='flex'>
						<div className={label}>Genus:</div>
						{data.taxonomy.genus}
					</li>
				}
				{data.taxonomy.species && 
					<li className='flex'>
						<div className={label}>Species:</div>
						{data.taxonomy.species}
					</li>
				}
			</ul>
		</div>
	)
}

function HostInfo({ data }) {
	const [host, setHost] = useState(null)

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/source/' + data.source).then((res) => {
			setHost(res.data)
		})
	}, [])

	return (
		<Collapsible className={sectionStyle}>
			<CollapsibleTrigger className={colTriggerStyle}>Source Information</CollapsibleTrigger>
			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Source ID:</div>
					{host ? host.human_readable_id : 'N/A'}
				</li>
				<li className='flex'>
					<div className={label}>Source Type:</div>
					{host ? host.host_type : 'N/A'}
				</li>
				<li className='flex'>
					<div className={label}>Source Species:</div>
					{host ? host.host_species : 'N/A'}
				</li>
			</ul>
		</Collapsible>
	)
}

function Morphology({data}) {
	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Morphology</div>
			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Gram Stain:</div>
					{data.morphology.gram_stain ? 'Positive' : 'Negative'}
				</li>
				{data.morphology.cell_shape &&
					<li className='flex'>
						<div className={label}>Cell Shape:</div>
						{data.morphology.cell_shape}
					</li>
				}
				<li className='flex'>
					<div className={label}>Motility:</div>
					{data.morphology.motility ? 'Yes' : 'No'}
				</li>
			</ul>
		</div>
	)
}

function CultureGrowth({data}) {
	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Culture and Growth Conditions</div>
			<ul className={listStyle}>
				{data.culture_growth.medium &&
					<li className='flex'>
						<div className={label}>Culture Medium:</div>
						{data.culture_growth.medium}
					</li>
				}
				<li className='flex'>
					<div className={label}>Culture Medium Growth:</div>
					{data.culture_growth.growth ? 'Positive' : 'Negative'}
				</li>
				{data.culture_growth.medium_composition &&
					<li className='flex'>
						<div className={label}>Culture Medium Composition:</div>
						{data.culture_growth.medium_composition}
					</li>
				}
				{data.culture_growth.culture_temp &&
					<li className='flex'>
						<div className={label}>Culture Growth Temperature:</div>
						{data.culture_growth.culture_temp + " °C"} 
					</li>
				}
			</ul>
		</div>
	)
}

function Isolates({ data }) {
	const [isolates, setIsolates] = useState([])

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/isolate/?source=' + data.id).then((res) => {
			setIsolates(res.data)
		})
	}, [])

	return (
		<Collapsible className={sectionStyle}>
			<CollapsibleTrigger className={colTriggerStyle}>
				<ChevronDown strokeWidth={5} className='m-1' />
				Isolates
			</CollapsibleTrigger>
			<CollapsibleContent className={colContentStyle}>
				<IsolateTable data={isolates} columns={columns} />
			</CollapsibleContent>
		</Collapsible>
	)
}

export { Taxonomy, Morphology, CultureGrowth, HostInfo, Isolates }
