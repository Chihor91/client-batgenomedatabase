import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasicInfo, HostInfo, SamplingInfo, Strains } from './Sections'

export default function SourcePage({ id }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/view/id/' + id + '/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<>
			{data && (
				<div>
					<div className='font-extrabold text-left text-4xl'>{data.human_readable_id}</div>
					<div className='py-10 space-y-6'>
						<BasicInfo data={data} />
						<HostInfo data={data} />
						<SamplingInfo data={data} />
						<Strains data={data} />
					</div>
				</div>
			)}
		</>
	)
}
