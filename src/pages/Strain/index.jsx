import axios from 'axios'
import { useState, useEffect } from 'react'
import StrainTable from './StrainTable'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StrainPage from '../StrainPage'
import { SectionWrapper } from '@/hoc'

function Isolate() {
	const [searchInput] = useSearchParams()
	const [data, setData] = useState([])
	let navigate = useNavigate()

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/strain/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<>
			{searchInput.get('id') === null ? (
				<div className='container mx-auto py-10 space-y-3'>
					<Button variant='outline' onClick={() => navigate('/isolate/add')}>
						Add New Strain
					</Button>
					<StrainTable data={data} columns={columns} />
				</div>
			) : (
				<StrainPage id={searchInput.get('id')} />
			)}
		</>
	)
}

export default SectionWrapper(Isolate, 'isolate')
