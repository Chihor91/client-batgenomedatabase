import axios from 'axios'
import { useEffect, useState } from 'react'
import { CultureGrowth, HostInfo, Morphology, PhysiologyMetabolism, Safety, Taxonomy } from './Sections'
function jsonEmpty(data) {
	var empty = true
	try {
		Object.keys(data).forEach(function (property) {
			if (data[property] !== '') {
				empty = false
				throw new Error();
			}
		})
	} catch{
		
	}
	return empty
}
export default function StrainPage({ id }) {
	const [data, setData] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		axios.get('/source/isolate/' + id).then((res) => {
			setData(res.data)
		})
	}, [])

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains('modal-overlay')) {
			closeModal()
		}
	}

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				closeModal()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	//Image from backend
	const sampleImageSrc =
		'https://images.unsplash.com/photo-1708757857789-2c7ba96bf644?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

	return (
		<>
			{data && (
				<div className='h-[100vh]'>
					{/* STRAIN ID */}
					<div className='font-extrabold text-left text-4xl'>{data.human_readable_id}</div>
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

					<div className='flex gap-10 w-full py-10 flex-wrap sm:flex-nowrap'>
						{/* IMAGE*/}
						<section className='w-full h-full flex flex-col space-y-3 justify-center '>
							{/*TODO: image map function*/}
							<div className=' relative group cursor-pointer overflow-hidden duration-500 border rounded-sm text-gray-50 p-10'>
								<div className='bg-white/10 shadow-sm border ' onClick={openModal}>
									<img
										className='w-full max-w-full h-[400px] object-cover'
										src={sampleImageSrc}
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
										className='w-full max-w-full h-[400px] object-cover'
										src={sampleImageSrc}
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
										className='w-full max-w-full h-[400px] object-cover'
										src={sampleImageSrc}
										alt='some'
									/>
									<div className='absolute w-full flex flex-col text-left rounded-md text-sm text-foreground text-wrap left-0 p-2 -bottom-12 duration-500 group-hover:bg-background group-hover:opacity-100 group-hover:-translate-y-12 opacity-0'>
										{data.human_readable_id}
									</div>
								</div>
							</div>
						</section>

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
					{isModalOpen && (
						<div
							className='fixed top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-80 flex items-center justify-center modal-overlay'
							onClick={handleOverlayClick}>
							<div className=' max-w-4xl p-1  rounded-sm flex justify-center items-center'>
								<img
									className='w-full  object-fit-contain -auto object-fit-contain'
									src={sampleImageSrc}
									alt='some'
									style={{ boxShadow: '0 0 20px rgba(255, 255,255,0.8' }}
								/>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}
