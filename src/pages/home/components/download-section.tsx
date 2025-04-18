import { useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FaAndroid } from 'react-icons/fa'
import appQr from '@/assets/appQR.svg'
import laptopImg from '@/assets/mockups/laptop.png'
import phoneImg from '@/assets/mockups/phone.png'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedShinyText } from '@/components/animated-shiny-text'
import NumberTicker from '@/components/number-ticker'

const DownloadSection = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('homePage')

  return (
    <div className='w-full bg-background transition-colors dark:bg-gray-900'>
      <div className='p-6 md:p-12'>
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Left Column - Image Section */}
          <div>
            <div
              className='mx-auto overflow-hidden rounded-3xl dark:border-gray-700'
              style={{
                height: '450px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={phoneImg}
                alt='bpp phone'
                id='previewImage'
                className='max-h-full max-w-full object-contain'
              />
            </div>
            <Tabs
              defaultValue='mobile'
              className='mx-auto mt-4 w-full md:w-[380px]'
              onValueChange={(value) => {
                const previewImage = document.getElementById(
                  'previewImage'
                ) as HTMLImageElement
                if (value === 'desktop') {
                  previewImage.src = laptopImg
                } else {
                  previewImage.src = phoneImg
                }
              }}
            >
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='mobile'>
                  {' '}
                  {t('DownloadQr.section1')}
                </TabsTrigger>
                <TabsTrigger value='desktop'>
                  {' '}
                  {t('DownloadQr.section2')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Right Column - Download Section */}
          <div className='flex flex-col space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                  <NumberTicker
                    initialValue={103786}
                    incrementOptions={[2, 3, 4]}
                    delay={3}
                    className='text-blue-600 dark:text-white'
                  />{' '}
                  {t('DownloadQr.header')}
                </h1>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 md:text-5xl'>
                  {t('DownloadQr.subheader')}
                </h2>
              </div>
            </div>

            <h1 className='text-xl font-bold text-gray-900 dark:text-white md:text-3xl'>
              {t('DownloadQr.heading')}
            </h1>

            {/* QR Code */}
            <div className='flex flex-col items-center gap-6 md:flex-row'>
              <div className='flex h-32 w-32 items-center justify-center rounded-lg border bg-white p-2 dark:bg-gray-800 md:h-40 md:w-40'>
                <img
                  src={appQr}
                  alt='App QR Code'
                  className='max-h-full max-w-full'
                />
              </div>
              <div className='space-y-2 text-center md:text-left'>
                <p className='text-sm font-bold text-gray-600 dark:text-gray-400'>
                  {t('DownloadQr.scanTxt')}
                </p>
                <div className='flex flex-row gap-2 md:flex-row'>
                  <Button
                    onClick={() =>
                      (window.location.href =
                        'https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk')
                    }
                    className='flex items-center justify-center gap-3 bg-[#2196f3] p-4 text-white hover:bg-[#1e40af]'
                  >
                    <FaAndroid className='h-6 w-6 text-white' />
                    <p className='text-left'>{t('DownloadQr.buttonTxt')}</p>
                  </Button>
                  <Button
                    className='flex items-center justify-center gap-3 bg-[#2196f3] p-4 text-white hover:bg-[#1e40af]'
                    onClick={() => navigate({ to: '/download-app' })}
                  >
                    <ArrowRightIcon className='h-6 w-6 text-white' />
                  </Button>
                </div>
              </div>
            </div>

            {/* How it works Button */}
            <div
              className={cn(
                'group inline-block max-w-sm rounded-full border border-black/5 bg-neutral-100 text-base font-bold text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              )}
              onClick={() =>
                navigate({ to: '/community-contribution/how-it-works' })
              }
            >
              <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
                <span className='text-sm font-bold'>
                  {t('DownloadQr.contribution')}
                </span>
                <ArrowRightIcon className='ml-1 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1' />
              </AnimatedShinyText>
            </div>

            {/* Signup Input */}
            <div className='max-w-md'>
              <div className='flex gap-2'>
                <Input
                  type='text'
                  placeholder={t('DownloadQr.placeholder')}
                  className='flex-1'
                />
                <Button
                  onClick={() => navigate({ to: '/sign-up' })}
                  className='bg-blue-600 text-white hover:bg-blue-900'
                >
                  {t('DownloadQr.button')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadSection
