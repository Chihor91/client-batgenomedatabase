import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasicInfo, HostInfo } from './Sections'

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
				<div className='h-[100vh] '>
					{/* STRAIN ID */}
					<div className='font-extrabold text-left  text-4xl'>{data.human_readable_id}</div>

					<main className='flex gap-10 w-full mt-20 flex-wrap sm:flex-nowrap'>
						{/* IMAGE*/}
						<section className='w-full flex justify-center '>
							<div className=' relative group cursor-pointer overflow-hidden duration-500  w-full h-full border rounded-sm text-gray-50 p-10'>
								<div className=''>
									<div className='bg-white/10 shadow-sm border ' onClick={openModal}>
										<img
											className='w-full max-w-full h-[400px] object-cover'
											src={sampleImageSrc}
											alt='some'
										/>
									</div>
									<div className='absolute w-56 left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-12'>
										<div className='absolute -z-10 left-0 w-64  h-28 opacity-0 duration-500 group-hover:opacity-100 hover:text-white group-hover:bg-primary'></div>
										<span className='text-md text-primary font-bold '>Image information</span>
										<p className='group-hover:opacity-100  pb-2 w-56 duration-500 opacity-0'>
											{data.human_readable_id}
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* INFO */}
						<section className='w-full space-y-6 '>
							<BasicInfo data={data} />
							<HostInfo data={data} />
							<HostInfo data={data} />
						</section>
					</main>

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
