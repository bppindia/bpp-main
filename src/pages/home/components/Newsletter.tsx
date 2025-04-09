import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import bppLogo from '@/assets/logo/bppLogo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import NewsCard from '@/components/news-card'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation('homePage') // Load translations from homePage

  const handleSubscribe = async () => {
    if (!email) {
      setErrorMessage(t('newsletter.error.emailRequired'))
      return
    }
    alert('subscribed!')
  }

  const renderSubscribeForm = () => (
    <div className='space-y-4'>
      <div className='flex flex-col gap-2 sm:flex-row sm:gap-0'>
        <Input
          type='email'
          placeholder={t('newsletter.form.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='flex-1 focus:ring-2 focus:ring-blue-500 sm:rounded-r-none'
        />
        <Button
          className='bg-[#e85a32] text-white hover:bg-[#f5562a] sm:rounded-l-none'
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading
            ? t('newsletter.button.subscribing')
            : t('newsletter.button.subscribe')}
        </Button>
      </div>

      {errorMessage && (
        <div className='mt-2 text-sm text-red-500'>{errorMessage}</div>
      )}

      {/* {isSubscribed && (
        <div className="mt-2 text-sm text-green-500">{t("newsletter.success.thankYou")}</div>
      )} */}
    </div>
  )

  return (
    <div className='relative mx-auto w-full bg-cover bg-center p-4 sm:p-7'>
      <div className='relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 rounded-xl lg:grid-cols-12'>
        <div className='col-span-full grid grid-cols-12 gap-4 lg:hidden'>
          <div className='col-span-3 sm:col-span-2'>
            <div className='flex h-full items-center justify-center bg-white'>
              <img src={bppLogo} alt='Bharatiya Popular Party Logo' />
            </div>
          </div>
          <div className='col-span-9 space-y-4 sm:col-span-10'>
            <div>
              <p className='mb-2 text-sm text-muted-foreground'>
                {t('newsletter.heading')}
              </p>
              <h2 className='text-xl font-bold sm:text-2xl'>
                {t('newsletter.title')}
              </h2>
            </div>
            <div className='text-sm text-muted-foreground'>
              {t('newsletter.subtitle')}
            </div>
            {renderSubscribeForm()}
          </div>
        </div>
        <div className='hidden space-y-4 lg:col-span-5 lg:block'>
          <div>
            <p className='mb-2 text-sm text-muted-foreground'>
              {t('newsletter.heading')}
            </p>
            <h2 className='text-xl font-bold sm:text-2xl'>
              {t('newsletter.title')}
            </h2>
          </div>
          <div className='text-sm text-muted-foreground'>
            {t('newsletter.subtitle')}
          </div>
          {renderSubscribeForm()}
        </div>
        <div className='hidden space-y-4 lg:col-span-2 lg:block'>
          <div className='flex items-center justify-center bg-white'>
            <img src={bppLogo} alt='Bharatiya Popular Party Logo' />
          </div>
        </div>
        <div className='space-y-4 sm:space-y-7 lg:col-span-5'>
          <NewsCard />
        </div>
      </div>
    </div>
  )
}
