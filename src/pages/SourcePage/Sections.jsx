import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import axios from 'axios'
import { useEffect, useState } from 'react'
import StrainTable from '@/pages/Isolate/IsolateTable'
import { columns } from '@/pages/Isolate/columns'
import { useTheme } from '@/components/ui/theme-provider'

const collapsibleStyle = 'border bg-white/10 shadow-md  text-start'
const colTriggerStyle = 'flex  w-full text-start text-2xl font-extrabold p-2'
const colContentStyle = ''
const listStyle = 'space-y-1 p-2'
const label = 'font-bold mr-1'

function BasicInfo({ data }) {
	return (
		<div className={collapsibleStyle}>
			<div className={colTriggerStyle}>
				Collection Information
			</div>
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
			<div className={colTriggerStyle}>
					Host Information
			</div>
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
			<div className={colTriggerStyle}>
				Sampling Information
			</div>

			<ul className={listStyle}>
				<li className='flex'>
					<div className={label}>Location:</div>
					{data.loc_location ? data.loc_location + ' (' + data.loc_abbr + ')' : 'N/A'}
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

function Strains({ data }) {
	const [strains, setStrains] = useState([])
	const theme = useTheme()
	useEffect(() => {
		axios.get('/source/isolate/source/' + data.id + '/').then((res) => {
			setStrains(res.data)
		})
	}, [])

	return (
		<>
			<div className={colTriggerStyle}>
				Isolates
			</div>
			<StrainTable data={strains} columns={columns} />
		</>
	)
}

export { BasicInfo, HostInfo, SamplingInfo, Strains }
