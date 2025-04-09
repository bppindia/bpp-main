import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/dashboard/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

const DonationPage: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState(20)
  const [coverFees, setCoverFees] = useState(true)

  const handleDonationAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDonationAmount(parseInt(e.target.value))
  }

  const totalDonation = donationAmount + (coverFees ? 0.6 : 0)

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <main className='flex-1 px-4 py-6 md:px-6 lg:py-8'>
        <div className='x-auto'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>
                Change begins. Donate today.
              </h1>
              <p className='text-muted-foreground'>
                Change begins. Donate today.
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2'>
            <Card className='mx-auto w-full'>
              <CardHeader>
                <CardTitle className='text-3xl font-bold'>
                  Change begins. Donate today.
                </CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-between'>
                <img
                  src='https://placehold.co/800x560'
                  className='w-[300px] object-contain md:w-[500px] lg:w-full'
                  alt='Implementation process'
                />
              </CardContent>
            </Card>
            <Card className='mx-auto w-full'>
              <CardHeader>
                <CardTitle>Change begins. Donate today.</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='donateOnce' className='w-full'>
                  <div className='space-y-4'>
                    <div>
                      <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='donateOnce'>
                          Donate Once
                        </TabsTrigger>
                        <TabsTrigger value='donateMonthly'>
                          Donate Monthly
                        </TabsTrigger>
                      </TabsList>
                      <div className='my-3 grid grid-cols-3 gap-4'>
                        <button
                          className={`rounded-md px-4 py-2 transition-colors ${
                            donationAmount === 10
                              ? 'bg-gray-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setDonationAmount(10)}
                        >
                          Rs 10
                        </button>
                        <button
                          className={`rounded-md px-4 py-2 transition-colors ${
                            donationAmount === 20
                              ? 'bg-gray-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setDonationAmount(20)}
                        >
                          Rs 20
                        </button>
                        <button
                          className={`rounded-md px-4 py-2 transition-colors ${
                            donationAmount === 50
                              ? 'bg-gray-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setDonationAmount(50)}
                        >
                          Rs 50
                        </button>
                        <button
                          className={`rounded-md px-4 py-2 transition-colors ${
                            donationAmount === 100
                              ? 'bg-gray-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setDonationAmount(100)}
                        >
                          Rs 100
                        </button>
                        <button
                          className={`rounded-md px-4 py-2 transition-colors ${
                            donationAmount === 200
                              ? 'bg-gray-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setDonationAmount(200)}
                        >
                          Rs 200
                        </button>
                        <button
                          className={`rounded-md px-4 py-2 transition-colors ${
                            donationAmount === 500
                              ? 'bg-gray-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setDonationAmount(500)}
                        >
                          Rs 500
                        </button>
                      </div>
                      <Input
                        type='number'
                        placeholder='Other amount'
                        value={donationAmount}
                        onChange={handleDonationAmountChange}
                        className='mt-4 w-full'
                      />
                    </div>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='terms'
                          checked={coverFees}
                          onCheckedChange={(checked) => setCoverFees(!!checked)}
                        />
                        <label
                          htmlFor='terms'
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          I would like to cover the transaction fees for this
                          donation
                        </label>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
              <CardFooter className='flex flex-col items-center justify-between space-y-4'>
                <div className='w-full'>
                  <div>
                    My grand total will be Rs {totalDonation.toFixed(2)}
                  </div>
                  <Button className='mt-4 w-full' disabled>
                    Next
                  </Button>
                </div>
                <div className='flex items-center space-x-1'>
                  <Lock className='h-4 w-4' />
                  <span>Secure donation</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

export default DonationPage
