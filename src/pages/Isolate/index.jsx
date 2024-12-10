import axios from 'axios'
import { useState, useEffect } from 'react'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StrainPage from '../IsolatePage'
import { SectionWrapper } from '@/hoc'
import IsolateTable from './IsolateTable'

function Isolate() {
	const [searchInput] = useSearchParams()
	const [data, setData] = useState([])
	let navigate = useNavigate()

	useEffect(() => {
		axios.get('/source/isolate/view/all/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<div className='p-20'>
			{searchInput.get('id') === null ? (
				<div className='space-y-3 space-x-2'>
					<Button variant='outline' onClick={() => navigate('/isolate/add')}>
						Add New Isolate
					</Button>
					<Button variant='outline' onClick={() => navigate('/isolate/add/multiple')}>
						Add Multiple Isolates
					</Button>
					<IsolateTable data={data} columns={columns} />
				</div>
			) : (
				<StrainPage id={searchInput.get('id')} />
			)}
		</div>
	)
}

export default Isolate
