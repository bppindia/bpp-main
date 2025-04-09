import { useTranslation } from 'react-i18next'
import sirPhoto from '@/assets/images/sirPhoto.png'

const PresidentMessage = () => {
  const { t } = useTranslation('homePage')
  return (
    <div className='font-poppins mx-auto w-full max-w-6xl'>
      <div className='mt-3'>
        {/* Header */}
        <h1 className='mb-6 text-center text-xl font-semibold text-[#3b82f6] md:text-3xl lg:text-4xl'>
          {t('PresidentMessage.heading')}
        </h1>

        <div className='grid grid-cols-1 items-start gap-2 lg:grid-cols-3'>
          {/* Image Column */}
          <div className='col-span-1 flex items-center justify-center xl:justify-end'>
            <div className='relative'>
              <img src={sirPhoto} alt='Party President' className='w-full' />
              <div>
                <p className='text-md font-semibold text-[#e85a32]'>
                  - {t('PresidentMessage.presidentName')}
                </p>
                <p className='text-md mx-3 font-semibold text-[#e85a32]'>
                  {' '}
                  {t('PresidentMessage.designation')}
                </p>
              </div>
            </div>
          </div>

          {/* Message Column */}
          <div className='col-span-2 flex flex-col'>
            <div className='container'>
              <p className='md:text-md mb-3 text-sm leading-relaxed text-gray-800'>
                {t('PresidentMessage.description')}
              </p>

              <p className='md:text-md mb-3 text-sm leading-relaxed text-gray-800'>
                {t('PresidentMessage.description2')}
              </p>

              <p className='md:text-md mb-3 text-sm leading-relaxed text-gray-800'>
                {t('PresidentMessage.description3')}
              </p>
              <p className='md:text-md mb-3 text-sm leading-relaxed text-gray-800'>
                {t('PresidentMessage.description4')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresidentMessage
