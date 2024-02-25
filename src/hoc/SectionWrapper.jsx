import { motion } from 'framer-motion'
import { staggerContainer } from '../common/motion'

const StarWrapper = (Component, idName) =>
	function HOC() {
		return (
			<motion.section
				variants={staggerContainer()}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}
				className={`sm:px-16 px-6 sm:py-20 max-w-screen-2xl mx-auto relative z-0 h-full`}>
				<span className='hash-span' id={idName}>
					&nbsp;
				</span>

				<Component />
			</motion.section>
		)
	}

export default StarWrapper
