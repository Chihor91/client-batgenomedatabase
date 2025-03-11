import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { CultureGrowth, HostInfo, Morphology, PhysiologyMetabolism, Safety, Taxonomy } from './Sections'
import AuthContext from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { enqueueSnackbar } from 'notistack'

function jsonEmpty(data) {
	var empty = true
	try {
		Object.keys(data).forEach(function (property) {
			if (data[property] !== '') {
				empty = false
				return
			}
		})
	} catch {
		empty = true
	}
	return empty
}
export default function StrainPage({ id }) {
	const { user } = useContext(AuthContext)
	const [data, setData] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [visibility, setVisibility] = useState(null)

	useEffect(() => {
		axios.get('/source/isolate/view/id/' + id + '/').then((res) => {
			setData(res.data)
			setVisibility(res.data.visibility)
		})
	}, [id])

	const updateVisibility = (id, visibility) => {
		let data = {visibility: visibility}
		axios.put('/source/isolate/visibility/' + id + '/', data).then((res) => {
			enqueueSnackbar(res.data.message, {
				variant: 'success',
				autoHideDuration: 2000,
				onClose: () => location.reload()
			})
		}).catch((err) => {
			enqueueSnackbar(err.response.data.error, {
				variant: 'error',
				autoHideDuration: 2000,
				onClose: () => location.reload()
			})
		})
	}

	// const openModal = () => {
	// 	setIsModalOpen(true)
	// }

	// const closeModal = () => {
	// 	setIsModalOpen(false)
	// }

	// const handleOverlayClick = (e) => {
	// 	if (e.target.classList.contains('modal-overlay')) {
	// 		closeModal()
	// 	}
	// }

	// useEffect(() => {
	// 	const handleKeyDown = (event) => {
	// 		if (event.key === 'Escape') {
	// 			closeModal()
	// 		}
	// 	}

	// 	window.addEventListener('keydown', handleKeyDown)

	// 	return () => {
	// 		window.removeEventListener('keydown', handleKeyDown)
	// 	}
	// }, [])

	// //Image from backend
	// const sampleImageSrc =
	// 	'https://cdn.dsmz.de/images/strain/11843/EM_DSM_2949_1.jpg'

	return (
		<>
			{data && (
				<div className='h-[100vh]'>
					{/* STRAIN ID */}
					<div className='font-extrabold text-left text-3xl'>{data.human_readable_id}</div>
					<div className='flex flex-col'>
						<div className='flex space-x-1'>
							<span className='font-bold'>Accession Number:</span>
							<span>{data.accession_no}</span>
						</div>
						<div className='flex space-x-1'>
							<span className='font-bold'>Type:</span>
							<span>
								{data.type === 1 && ' Bacteria'}
								{data.type === 2 && ' Yeast'}
								{data.type === 3 && ' Mold'}
							</span>
						</div>
					</div>

					{ data.author_id == user?.id || user?.is_superuser && //TODO:better admin check
						<div className='flex space-x-2'>
							<div className='font-bold'>Visibility:</div>
							<select className='bg-secondary_background' id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
								<option value='Public'>Public</option>
								<option value='Researchers Only'>Researchers Only</option>
								<option value='Private'>Private</option>
							</select>
							<Button className='h-6' disabled={data.visibility === visibility} onClick={() => {updateVisibility(data.id, visibility)}}>Save</Button>
						</div>
						
					}

					<div className='flex gap-10 w-full py-10 flex-wrap sm:flex-nowrap'>
						{/* IMAGE*/}
						{/* <section className='w-full h-full flex flex-col space-y-3 justify-center '>
							<div className=' relative group cursor-pointer overflow-hidden duration-500 border rounded-sm text-gray-50 p-10'>
								<div className='bg-white/10 shadow-sm border ' onClick={openModal}>
									<img
										className='w-full max-w-full h-full max-h-[400px] object-contain'
										src={"https://cdn.dsmz.de/images/strain/11843/EM_DSM_2949_2.jpg"}
										alt='some'
									/>
									<div className='absolute w-full flex flex-col text-left rounded-md text-sm text-foreground text-wrap left-0 p-2 -bottom-12 duration-500 group-hover:bg-background group-hover:opacity-100 group-hover:-translate-y-12 opacity-0'>
										{data.human_readable_id}
									</div>
								</div>
							</div>
							<div className=' relative group cursor-pointer overflow-hidden duration-500 border rounded-sm text-gray-50 p-10'>
								<div className='bg-white/10 shadow-sm border ' onClick={openModal}>
									<img
										className='w-full max-w-full h-[400px] object-contain'
										src={"https://cdn.dsmz.de/images/strain/11843/EM_DSM_2949_1.jpg"}
										alt='some'
									/>
									<div className='absolute w-full flex flex-col text-left rounded-md text-sm text-foreground text-wrap left-0 p-2 -bottom-12 duration-500 group-hover:bg-background group-hover:opacity-100 group-hover:-translate-y-12 opacity-0'>
										{data.human_readable_id}
									</div>
								</div>
							</div>
							<div className=' relative group cursor-pointer overflow-hidden duration-500 border rounded-sm text-gray-50 p-10'>
								<div className='bg-white/10 shadow-sm border ' onClick={openModal}>
									<img
										className='w-full max-w-full h-[400px] object-contain'
										src={"https://cdn.dsmz.de/images/strain/11843/EM_DSM_2949_3.jpg"}
										alt='some'
									/>
									<div className='absolute w-full flex flex-col text-left rounded-md text-sm text-foreground text-wrap left-0 p-2 -bottom-12 duration-500 group-hover:bg-background group-hover:opacity-100 group-hover:-translate-y-12 opacity-0'>
										{data.human_readable_id}
									</div>
								</div>
							</div>
						</section> 
						*/}

						{/* INFO */}
						<section className='w-full space-y-6'>
							{ !jsonEmpty(data.taxonomy) && <Taxonomy data={data} /> }
							<HostInfo data={data} />
							{ !jsonEmpty(data.morphology) && <Morphology data={data} /> }
							{ !jsonEmpty(data.culture_growth) && <CultureGrowth data={data} /> }
							{ !jsonEmpty(data.physiology_metabolism) && <PhysiologyMetabolism data={data} /> }
							{ !jsonEmpty(data.safety_information) && <Safety data={data} /> }

						</section>
					</div>

					{/* MODAL */}
					{/* {isModalOpen && (
						<div
							className='fixed top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-80 flex items-center justify-center modal-overlay'
							onClick={handleOverlayClick}>
							<div className=' max-w-4xl p-1  rounded-sm flex justify-center items-center'>
								<img
									className='w-full  object-fit-contain -auto object-fit-contain'
									src={"https://cdn.dsmz.de/images/strain/11843/EM_DSM_2949_1.jpg"}
									alt='some'
									style={{ boxShadow: '0 0 20px rgba(255, 255,255,0.8' }}
								/>
							</div>
						</div>
					)} */}
				</div>
			)}
		</>
	)
}
