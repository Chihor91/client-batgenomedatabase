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
		axios.get('/source/isolate/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<>
			{searchInput.get('id') === null ? (
				<div className='container mx-auto space-y-3 '>
					<Button variant='outline' onClick={() => navigate('/isolate/add')}>
						Add New Isolate
					</Button>
					<IsolateTable data={data} columns={columns} />
				</div>
			) : (
				<StrainPage id={searchInput.get('id')} />
			)}
		</>
	)
}

export default SectionWrapper(Isolate, 'isolate')
