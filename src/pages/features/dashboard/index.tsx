import { HeaderNav } from '@/components/layout/dashboard/header-nav'
import { Main } from '@/components/layout/dashboard/main'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp } from 'lucide-react'
import { useState } from 'react'

const userData = {
  firstName: "Swapnil",
  lastName: "Mahadik",
  role: "Primary Member",
  id: 123,
  referralCount: 0,
  validUntil: "2025-12-31",
  referralCode: "JD2023",
  balance: 0,
  contributionGoal: 0,
  contributionProgress: 0,
  avatar: "/avatar.jpg",
}

export default function Goals() {
  const [activeTab, setActiveTab] = useState('overview')


  return (
    <>
      <HeaderNav />
      <Main fixed>
        <div className='mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          <div className="flex items-center gap-4 mt-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
              <AvatarFallback>{userData.firstName[0]}{userData.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
                Welcome, {userData.firstName}
              </h1>
              <p className="text-muted-foreground text-sm">Your party dashboard overview</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions <TrendingUp className="ml-2 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>G</DropdownMenuItem>
                <DropdownMenuItem>Download Report</DropdownMenuItem>
                <DropdownMenuItem>Share Referal Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>Contribute Now</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='queries'>Queries</TabsTrigger>
            <TabsTrigger value='wallet'>Wallet</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-3 sm:flex-row'>

          </div>
        </div>
        <Separator className='shadow' />
        <div className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 mx-auto w-full max-w-full'>

        </div>
      </Main>
    </>
  )
}