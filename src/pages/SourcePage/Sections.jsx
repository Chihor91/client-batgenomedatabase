import axios from 'axios'
import { useEffect, useState } from 'react'
import StrainTable from '@/pages/Isolate/IsolateTable'
import { columns } from '@/pages/Isolate/columns'
import { category_1 } from '@/constants/miso'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const collapsibleStyle = 'border rounded-lg bg-white/10 shadow-md  text-start p-2'
const colTriggerStyle = 'w-full text-start text-xl font-bold p-2'
const listStyle = 'space-y-1 p-2'
const label = 'font-semibold mr-1'

function BasicInfo({ data }) {
	return (
		<div className={collapsibleStyle}>
			<Label className={colTriggerStyle}>
				Collection Information
			</Label>
			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Collection:</div>
					{data.collection_name + ' (' + data.collection + ')'}
				</li>
				<li className='flex'>
					<div className={label}>Institution:</div>
					{data.institution_name + ' (' + data.institution + ')'}
				</li>
				<li className='flex'>
					<div className={label}>Project:</div>
					{data.project_name + ' (' + data.project_abbr + ')'}
				</li>
			</ul>
		</div>
	)
}

function HostInfo({ data }) {
	
	return (
		<div className={collapsibleStyle}>
			<Label className={colTriggerStyle}>
					Host Information
			</Label>
			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Host Type:</div>
					{data.host_type === '' ? 'N/A' : data.host_type}
				</li>
				<li className='flex'>
					<div className={label}>Host Species:</div>
					<div className='italic'>{data.host_species === '' ? 'N/A' : data.host_species}</div>
				</li>
				<li className='flex'>
					<div className={label}>Sample Type:</div>
					{data.sample_type}
				</li>
			</ul>
		</div>
	)
}

function SamplingInfo({ data }) {

	return (
		<div className={collapsibleStyle}>
			<Label className={colTriggerStyle}>
				Sampling Information
			</Label>

			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Location:</div>
					{
						data.loc_city && data.loc_province 
							? data.loc_city + ', ' + data.loc_province  + ' (' + data.loc_abbr + ')' 
							: 'N/A'
					}
				</li>
				<li className='flex'>
					<div className={label}>Sampling Site:</div>
					{data.loc_sampling_site
						? data.loc_sampling_site + ' (' + data.loc_site_abbr + ')'
						: 'N/A'}
				</li>
				<li className='flex'>
					<div className={label}>Sampling Point:</div>
					{data.loc_sampling_point}
				</li>
			</ul>
		</div>
	)
}

function MISOCategories({ data }) {
	const miso = data.miso_categories

	const displayMISO = (data) => {
		const color = category_1.find( item => {return item.name === data[0] })?.color_code

		return (
			<div className="grid grid-flow-col min-w-max gap-1 m-1">
				<Badge
				className={cn(
					data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
				)}
				>{data[0]}</Badge>
				<Badge
				className={cn(
					data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
				)}
				>{data[1]}</Badge>
				<Badge
				className={cn(
					data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
				)}
				>{data[2]}</Badge>
			</div>
		)
	}

	return (
		<div className={collapsibleStyle}>
			<Label className={colTriggerStyle}>
				MISO Categories
			</Label>
			<div>
				{
					JSON.stringify(miso) !== '{}' && miso?.length != 0 ? (
						miso?.length == 1 ? 
							<>{displayMISO(miso[0])}</>
						: 
							<>{miso.map( item => displayMISO(item))}</>
					) : null
				}
			</div>
		</div>
	)
}

function Isolates({ data }) {
	const [isolates, setIsolates] = useState([])
	useEffect(() => {
		axios.get('/source/isolate/source/' + data.id + '/').then((res) => {
			setIsolates(res.data)
		})
	}, [data.id])

	return (
		<div>
			<Label className={colTriggerStyle}>Isolates</Label>
			<StrainTable data={isolates} columns={columns} />
		</div>
	)
}

export { BasicInfo, HostInfo, SamplingInfo, MISOCategories, Isolates }
