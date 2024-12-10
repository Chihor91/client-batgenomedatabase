import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasicInfo, HostInfo, MISOCategories, SamplingInfo, Isolates } from './Sections'

export default function SourcePage({ id }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/view/id/' + id + '/').then((res) => {
			setData(res.data)
		})
	}, [id])

	return (
		<div className=''>
			{data && (
				<div>
					<div className='font-extrabold text-left text-3xl'>{data.human_readable_id}</div>
					<div className='py-10 space-y-6'>
						<BasicInfo data={data} />
						<HostInfo data={data} />
						<SamplingInfo data={data} />
						<MISOCategories data={data} />
						<Isolates data={data} />
					</div>
				</div>
			)}
		</div>
	)
}
