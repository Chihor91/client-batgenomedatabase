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
						<div className='italic'>{data.taxonomy.genus}</div>
					</li>
				}
				{data.taxonomy.species && 
					<li className='flex'>
						<div className={label}>Species:</div>
						<div className='italic'>{data.taxonomy.species}</div>
					</li>
				}
			</ul>
		</div>
	)
}

function HostInfo({ data }) {
	const [host, setHost] = useState(null)

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/view/id/' + data.source + "/").then((res) => {
			setHost(res.data)
		})
	}, [])

	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Sample Source</div>
			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Source ID:</div>
					{host ? <a href={`/source?id=${data.source}`} className='underline hover:font-bold'>{host.human_readable_id}</a> : 'N/A'}
				</li>
				<li className='flex'>
					<div className={label}>Source Type:</div>
					{host?.host_type ? host.host_type : 'N/A'}
				</li>
				<li className='flex'>
					<div className={label}>Source Species:</div>
					<div className='italic'>{host?.host_species ? host.host_species : 'N/A'}</div>
				</li>
				<li className='flex'>
					<div className={label}>Sample Type:</div>
					{host?.sample_type ? host.sample_type : 'N/A'}
				</li>
			</ul>
		</div>
	)
}

function Morphology({data}) {
	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Morphology</div>
			<ul className={listStyle}>
				{data.morphology.gram_stain !== undefined &&
					<li className='flex'>
						<div className={label}>Gram Stain:</div>
						{data.morphology.gram_stain ? 'Gram-positive' : 'Gram-negative'}
					</li>
				}
				{data.morphology.cell_shape &&
					<li className='flex'>
						<div className={label}>Cell Shape:</div>
						{data.morphology.cell_shape}
					</li>
				}
				{ data.morphology.motility !== undefined &&
					<li className='flex'>
						<div className={label}>Motility:</div>
						{data.morphology.motility ? 'Yes' : 'No'}
					</li>
				}
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
				{data.culture_growth.growth !== undefined &&
					<li className='flex'>
						<div className={label}>Culture Medium Growth:</div>
						{data.culture_growth.growth ? 'Positive' : 'Negative'}
					</li>
				}
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

function PhysiologyMetabolism({data}) {
	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Physiology and Metabolism</div>
			<ul className={listStyle}>
				{data.physiology_metabolism.oxygen_tolerance &&
					<li className='flex'>
						<div className={label}>Oxygen Tolerance:</div>
						{data.physiology_metabolism.oxygen_tolerance}
					</li>
				}
				{data.physiology_metabolism.cytochrome_oxidase !== undefined &&
					<li className='flex'>
						<div className={label}>Presence of Cytochrome c Oxidase:</div>
						{data.physiology_metabolism.cytochrome_oxidase ? "Oxidase-positive" : "Oxidase-negative"}
					</li>
				}
				{data.physiology_metabolism.endospore_forming !== undefined &&
					<li className='flex'>
						<div className={label}>Endospore-forming Capability:</div>
						{data.physiology_metabolism.endospore_forming ? "Endospore-forming" : "Non-endospore-forming"}
					</li>
				}
				{data.physiology_metabolism.antibiotic_resistance_profile &&
					<li className='flex'>
						<div className={label}>Antibiotic Resistance Profile:</div>
						{data.physiology_metabolism.antibiotic_resistance_profile}
					</li>
				}
			</ul>
		</div>
	)
}

function Safety({data}) {
	return (
		<div className={sectionStyle}>
			<div className={colTriggerStyle}>Safety Information</div>
			<ul className={listStyle}>
 				{data.safety_information.pathogenicity_human !== undefined &&
					<li className='flex'>
						<div className={label}>Pathogenicity (Human):</div>
						{data.safety_information.pathogenicity_human || "no"}
					</li>
				}
				{data.safety_information.pathogenicity_animal !== undefined &&
					<li className='flex'>
						<div className={label}>Pathogenicity (Animal):</div>
						{data.safety_information.pathogenicity_animal || "no"}
					</li>
				}
				{data.safety_information.biosafety_level &&
					<li className='flex'>
						<div className={label}>Biosafety Level:</div>
						{data.safety_information.biosafety_level}
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

export { Taxonomy, Morphology, CultureGrowth, PhysiologyMetabolism, Safety, HostInfo, Isolates }
