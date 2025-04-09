import { Link } from '@tanstack/react-router'
import {
  ChevronRightIcon,
  GraduationCapIcon,
  Handshake,
  ShieldCheck,
  ShieldCheckIcon,
  Target,
  Users,
  UsersRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const VisionMission = () => {
  const { t } = useTranslation('homePage')

  return (
    <section className='container max-w-7xl'>
      <div className='container mx-auto px-4'>
        <Tabs defaultValue='vision' className='mx-auto w-full'>
          <TabsList className='mx-auto grid w-full max-w-md grid-cols-2 rounded-lg bg-white/50 p-1 shadow-lg backdrop-blur-sm dark:bg-gray-800/50'>
            <TabsTrigger
              value='vision'
              className='transition-all duration-300 data-[state=active]:bg-[#e85a32] data-[state=active]:text-primary-foreground'
            >
              {t('VisionMission.vision.title')}
            </TabsTrigger>
            <TabsTrigger
              value='mission'
              className='transition-all duration-300 data-[state=active]:bg-[#e85a32] data-[state=active]:text-primary-foreground'
            >
              {t('VisionMission.mission.title')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='vision' className='mt-8'>
            <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
              <div className='order-2 lg:order-1'>
                <div>
                  <span className='inline-block rounded-lg bg-[#e85a32] px-3 py-2 text-xs text-gray-50 shadow-md dark:text-gray-900'>
                    {t('VisionMission.vision.visionStatement.heading')}
                  </span>

                  <h2 className='mt-4 scroll-m-20 border-b pb-4 text-3xl font-bold tracking-tight transition-colors first:mt-0 sm:text-4xl xl:text-5xl'>
                    {t('VisionMission.vision.visionStatement.heading2')}{' '}
                    <span className='mt-2 block'>
                      <span className='text-[#e85a32] duration-500 animate-in fade-in'>
                        {' '}
                        {t('VisionMission.vision.visionStatement.heading3')}
                      </span>{' '}
                      <span className='text-blue-500 duration-700 animate-in fade-in'>
                        {' '}
                        {t('VisionMission.vision.visionStatement.heading4')}
                      </span>{' '}
                      <span className='duration-1000 animate-in fade-in'>
                        {' '}
                        {t('VisionMission.vision.visionStatement.heading5')}
                      </span>
                    </span>
                  </h2>
                  <p className='mt-3 text-muted-foreground'>
                    {t('VisionMission.vision.visionStatement.text1')}
                  </p>
                  <p className='mt-3 text-muted-foreground'>
                    {t('VisionMission.vision.visionStatement.text2')}
                  </p>
                  <p className='mt-5'>
                    <Link
                      className='group inline-flex items-center gap-x-2 font-medium text-primary underline-offset-4 hover:text-primary/90 hover:underline'
                      to='/'
                    >
                      {t('VisionMission.vision.link.text')}
                      <ChevronRightIcon className='h-4 w-4 flex-shrink-0 transition-all ease-in-out group-hover:translate-x-1' />
                    </Link>
                  </p>
                </div>
              </div>
              <div className='order-1 space-y-2 lg:order-2 lg:space-y-2'>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <UsersRound className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.vision.features.items.0.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.vision.features.items.0.description')}
                    </p>
                  </div>
                </div>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <GraduationCapIcon className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.vision.features.items.1.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.vision.features.items.1.description')}
                    </p>
                  </div>
                </div>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <ShieldCheckIcon className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.vision.features.items.2.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.vision.features.items.2.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='mission' className='mt-8'>
            <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
              <div className='space-y-2 lg:space-y-2'>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <Users className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.mission.features.items.0.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.mission.features.items.0.description')}
                    </p>
                  </div>
                </div>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <Target className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.mission.features.items.1.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.mission.features.items.1.description')}
                    </p>
                  </div>
                </div>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <ShieldCheck className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.mission.features.items.2.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.mission.features.items.2.description')}
                    </p>
                  </div>
                </div>
                <div className='flex transform rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 dark:hover:bg-gray-800/50'>
                  <span className='inline-flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full border bg-[#e85a32] text-white shadow-lg'>
                    <Handshake className='h-5 w-5 flex-shrink-0 text-white' />
                  </span>
                  <div className='ms-5 sm:ms-8'>
                    <h3 className='text-base font-semibold sm:text-lg'>
                      {t('VisionMission.mission.features.items.3.title')}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                      {t('VisionMission.mission.features.items.3.description')}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className='inline-block rounded-lg bg-[#e85a32] px-3 py-2 text-xs text-white shadow-md'>
                  {t('VisionMission.mission.missionStatement.heading')}
                </span>

                <h2 className='mt-4 scroll-m-20 border-b pb-4 text-3xl font-bold tracking-tight transition-colors first:mt-0 sm:text-4xl xl:text-5xl'>
                  {t('VisionMission.mission.missionStatement.heading2')}{' '}
                  <span className='mt-2 block'>
                    <span className='text-[#e85a32] duration-500 animate-in fade-in'>
                      {' '}
                      {t('VisionMission.mission.missionStatement.heading3')}
                    </span>{' '}
                    <span className='text-blue-500 duration-700 animate-in fade-in'>
                      {t('VisionMission.mission.missionStatement.heading4')}
                    </span>{' '}
                    <span className='duration-1000 animate-in fade-in'>
                      {t('VisionMission.mission.missionStatement.heading5')}
                    </span>
                  </span>
                </h2>
                <p className='mt-3 text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text1')}
                </p>
                <p className='mt-3 text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text2')}
                </p>
                <p className='mt-3 text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text3')}
                </p>
                <p className='mt-3 text-muted-foreground'>
                  {t('VisionMission.mission.missionStatement.text4')}
                </p>
                <p className='mt-5'>
                  <Link
                    className='group inline-flex items-center gap-x-2 font-medium text-primary underline-offset-4 hover:text-primary/90 hover:underline'
                    to='/'
                  >
                    {t('VisionMission.mission.link.text')}
                    <ChevronRightIcon className='h-4 w-4 flex-shrink-0 transition-all ease-in-out group-hover:translate-x-1' />
                  </Link>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default VisionMission
