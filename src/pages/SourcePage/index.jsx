import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasicInfo, HostInfo, SamplingInfo, Strains } from './Sections'

export default function SourcePage({ id }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/source/' + id).then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<>
			{data && (
				<div className='space-y-3'>
					<div className='font-extrabold text-4xl'>{data.human_readable_id}</div>
					<BasicInfo data={data} />
					<HostInfo data={data} />
					<SamplingInfo data={data} />
					<Strains data={data} />
				</div>
			)}
		</>
	)
}
