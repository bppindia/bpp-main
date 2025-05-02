import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { goals } from './data/goals'

const GoalsPage = () => {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main fixed>
        <div className='space-y-6'>
          <h1 className='text-3xl font-bold tracking-tight'>Our Goals</h1>
          <Separator />
          <div className='prose prose-sm max-w-none text-gray-500'>
            <p className='leading-relaxed'>
              Bharatiya Popular Party aims to build a stronger nation rooted in
              unity, equality, and opportunity for all. We stand for justice,
              peace, and prosperity, and envision a democracy free from the
              influence of muscle and money power.
            </p>
            <p className='leading-relaxed'>
              Our focus lies in health, education, agriculture, industry, and
              inclusive development, benefiting every citizen. We are committed
              to a future where every individual contributes to, and benefits
              from, collective growth.
            </p>
          </div>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {goals.map((goal) => (
            <Card
              key={goal.number}
              className={`${goal.bgColor} cursor-pointer overflow-hidden text-white transition-transform duration-200 hover:scale-105`}
            >
              <CardContent className='p-0'>
                <div className='flex h-full flex-col'>
                  <div className='flex items-center p-3'>
                    <span className='mr-2 text-2xl font-bold'>
                      {goal.number}
                    </span>
                  </div>
                  <div className='flex flex-col items-center p-4 text-center'>
                    <div className='mb-3'>
                      <goal.icon size={40} color={goal.iconColor} />
                    </div>
                    <h3 className='mb-2 text-sm font-bold leading-tight'>
                      {goal.title}
                    </h3>
                    <p className='text-xs opacity-90'>{goal.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  )
}

export default GoalsPage
