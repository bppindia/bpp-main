import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import appQr from '@/assets/appQR.svg'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const QRToggle = () => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation('header')
  return (
    <div
      className='inline-block relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button variant='ghost' className='p-2'>
        <Download size={18} />
      </Button>

      {isHovered && (
        <Card className='absolute top-full left-1/2 z-50 p-4 mt-2 bg-white shadow-lg transition-all duration-200 ease-in-out transform -translate-x-1/2 dark:bg-gray-800'>
          <div className='flex flex-col gap-3 items-center'>
            <img src={appQr} alt='QR Code' className='w-40 h-40' />
            <p className='text-sm text-center text-gray-600 dark:text-gray-300'>
              {t('Download.label')}
            </p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate({ to: '/download-app' })}
            >
              {t('Download.button')}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default QRToggle
