import axios from 'axios'
import { useState, useEffect } from 'react'
import SourceTable from './SourceTable'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SourcePage from '@/pages/SourcePage'

function Source() {
	const [searchInput] = useSearchParams()
	const [data, setData] = useState([])
	let navigate = useNavigate()

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/view/all/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<div className='p-20 mx-20'>
			{searchInput.get('id') === null ? (
				<div className='space-y-3'>
					<Button variant='outline' className="bg-secondary_background" onClick={() => navigate('/source/add')}>
						Add New Source
					</Button>
					<SourceTable data={data} columns={columns} />
				</div>
			) : (
				<SourcePage id={searchInput.get('id')} />
			)}
		</div>
	)
}

export default Source
