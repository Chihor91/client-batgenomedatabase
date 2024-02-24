import axios from 'axios'
import { useState, useEffect } from 'react'
import DataTable from '@/components/DataTable/ProjectTable'
import { columns } from './columns'
import { ProjectForm } from '@/components/Forms/ProjectForm'
import { SectionWrapper } from '@/hoc'

function Project() {
	const [data, setData] = useState([])

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/project/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<>
			<div className='container mx-auto py-10 space-y-3'>
				<ProjectForm />
				<DataTable data={data} columns={columns} />
			</div>
		</>
	)
}

export default SectionWrapper(Project, 'wrapper')
