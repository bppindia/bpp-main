import React, { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PartyPeoples from '@/assets/images/backgrounds/Party Peoples.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const pages = {
  community: 'community',
  commonMan: 'commonMan',
  professionals: 'professionals',
  business: 'business',
}

const pageOrder = [
  pages.community,
  pages.commonMan,
  pages.professionals,
  pages.business,
]

interface PageWrapperProps {
  children: ReactNode
  direction: number
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, direction }) => (
  <motion.div
    initial={{ x: 100 * direction, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100 * direction, opacity: 0 }}
    transition={{
      type: 'tween',
      stiffness: 600,
      damping: 30,
    }}
    className='absolute my-4 w-full'
  >
    {children}
  </motion.div>
)

const CommunityPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 shadow-sm'>
        <CardContent className='p-6'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='space-y-6'>
              <h1 className='text-4xl font-bold text-gray-900'>
                {t('communityContribution.joinCommunity.title')}
              </h1>
              <h2 className='text-2xl font-semibold text-gray-800'>
                {t('communityContribution.joinCommunity.subtitle')}
              </h2>
              <p className='text-lg text-gray-700'>
                {t('communityContribution.joinCommunity.description')}
              </p>
            </div>
            <div className='relative h-[340px] overflow-hidden rounded-lg'>
              <img
                src={PartyPeoples}
                alt='Community members'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const CommonManPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 shadow-sm'>
        <CardContent className='p-6'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='space-y-6'>
              <h1 className='text-4xl font-bold text-gray-900'>
                {t('communityContribution.commonMan.title')}
              </h1>
              <p className='text-lg text-gray-700'>
                {t('communityContribution.commonMan.description')}
              </p>
            </div>
            <div className='relative h-[340px] overflow-hidden rounded-lg'>
              <img
                src='https://t3.ftcdn.net/jpg/06/55/37/80/360_F_655378099_vsRBlmC6U5Jl4JTMVjrD8tTI1piTf413.jpg'
                alt='Common citizens'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const ProfessionalsPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 shadow-sm'>
        <CardContent className='p-6'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='space-y-6'>
              <h1 className='text-4xl font-bold text-gray-900'>
                {t('communityContribution.professionals.title')}
              </h1>
              <p className='text-lg text-gray-700'>
                {t('communityContribution.professionals.description')}
              </p>
            </div>
            <div className='relative h-[340px] overflow-hidden rounded-lg'>
              <img
                src='https://static.toiimg.com/thumb/msid-47318184,imgsize-21094,width-400,resizemode-4/47318184.jpg'
                alt='Professional members'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const BusinessPage = ({ direction }: { direction: number }) => {
  const { t } = useTranslation('homePage')
  return (
    <PageWrapper direction={direction}>
      <Card className='border-0 shadow-sm'>
        <CardContent className='p-6'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='space-y-6'>
              <h1 className='text-4xl font-bold text-gray-900'>
                {t('communityContribution.business.title')}
              </h1>
              <p className='text-lg text-gray-700'>
                {t('communityContribution.business.description')}
              </p>
            </div>
            <div className='relative h-[340px] overflow-hidden rounded-lg'>
              <img
                src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBjb21tdW5pdHl8ZW58MHx8MHx8fDA%3D'
                alt='Business community members'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}

const CommunityContributionSection = () => {
  const [currentPage, setCurrentPage] = useState(pages.community)
  const [slideDirection, setSlideDirection] = useState(1)
  const { t } = useTranslation('homePage')

  const navigateToPage = (newPage: string) => {
    const currentIndex = pageOrder.indexOf(currentPage)
    const newIndex = pageOrder.indexOf(newPage)
    const direction = newIndex > currentIndex ? 1 : -1
    setSlideDirection(direction)
    setCurrentPage(newPage)
  }

  const renderPage = () => {
    const props = { direction: slideDirection }

    switch (currentPage) {
      case pages.community:
        return <CommunityPage key='community' {...props} />
      case pages.commonMan:
        return <CommonManPage key='commonMan' {...props} />
      case pages.professionals:
        return <ProfessionalsPage key='professionals' {...props} />
      case pages.business:
        return <BusinessPage key='business' {...props} />
      default:
        return <CommunityPage key='community' {...props} />
    }
  }

  return (
    <div className='mx-auto w-full max-w-7xl p-4 py-8'>
      <div className='mb-8 flex flex-wrap gap-4'>
        <Button
          variant={
            currentPage === pages.community ? 'destructive' : 'secondary'
          }
          className={
            currentPage === pages.community
              ? 'bg-[#e85a32] hover:bg-[#e85a32]'
              : ''
          }
          onClick={() => navigateToPage(pages.community)}
        >
          {t('communityContribution.buttons.communityContribution')}
        </Button>
        <Button
          variant={
            currentPage === pages.commonMan ? 'destructive' : 'secondary'
          }
          className={
            currentPage === pages.commonMan
              ? 'bg-[#e85a32] hover:bg-[#e85a32]'
              : ''
          }
          onClick={() => navigateToPage(pages.commonMan)}
        >
          {t('communityContribution.buttons.commonMan')}
        </Button>
        <Button
          variant={
            currentPage === pages.professionals ? 'destructive' : 'secondary'
          }
          className={
            currentPage === pages.professionals
              ? 'bg-[#e85a32] hover:bg-[#e85a32]'
              : ''
          }
          onClick={() => navigateToPage(pages.professionals)}
        >
          {t('communityContribution.buttons.professionals')}
        </Button>
        <Button
          variant={currentPage === pages.business ? 'destructive' : 'secondary'}
          className={
            currentPage === pages.business
              ? 'bg-[#e85a32] hover:bg-[#e85a32]'
              : ''
          }
          onClick={() => navigateToPage(pages.business)}
        >
          {t('communityContribution.buttons.businessCommunity')}
        </Button>
      </div>

      <div className='relative h-[400px] overflow-hidden'>
        <AnimatePresence mode='wait' initial={false}>
          {renderPage()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CommunityContributionSection
