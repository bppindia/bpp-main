import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { BadgeDollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Employment from '@/assets/images/backgrounds/sliders/EMPLOYMENT & ECONOMIC GROWTH.jpeg'

export function Slide9() {
  const navigate = useNavigate()
  const { t } = useTranslation('homePage')

  return (
    <div className='relative h-[80vh] w-full'>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className='absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${Employment})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </motion.div>

      <div className='relative mx-auto flex h-full max-w-5xl flex-col justify-center px-8 md:px-16 lg:px-24'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='mb-3 flex items-center gap-4'
        >
          <BadgeDollarSign className='text-white' size={30} />
          <h2 className='text-3xl font-bold text-white'>
            {' '}
            {t('Slider.Goal7.tittle')}
          </h2>
        </motion.div>

        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl'
        >
          {t('Slider.Goal7.subTittle')}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-md mb-4 text-white'
        >
          {t('Slider.Goal7.description')}
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            className='rounded-full bg-[#e85a32] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#d14f2c] hover:shadow-xl'
            onClick={() => navigate({ to: '/about/bpp-goals' })}
          >
            {t('Slider.Goal7.button')}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
