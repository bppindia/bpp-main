import { SVGProps, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export default function Referral() {
  const { user } = useAuth()
  const [referralLink, setReferralLink] = useState('')
  const [referrals] = useState([
    {
      name: 'John Doe',
      date: '2 days ago',
      status: 'Joined',
      membershipNo: 'BPP-2025-001',
      membershipType: 'Life Member',
    },
    {
      name: 'Jane Appleseed',
      date: '1 week ago',
      status: 'Pending',
      membershipNo: 'Pending',
      membershipType: 'Annual Member',
    },
    {
      name: 'Sarah Miller',
      date: '3 weeks ago',
      status: 'Joined',
      membershipNo: 'BPP-2025-010',
      membershipType: 'Life Member',
    },
    {
      name: 'Sarah Miller',
      date: '3 weeks ago',
      status: 'Joined',
      membershipNo: 'BPP-2025-010',
      membershipType: 'Life Member',
    },
    {
      name: 'Sarah Miller',
      date: '3 weeks ago',
      status: 'Joined',
      membershipNo: 'BPP-2025-010',
      membershipType: 'Life Member',
    },
  ])
  const [earnings] = useState({ total: 3, pending: 1, paid: 2 })

  useEffect(() => {
    if (user) {
      const baseUrl = 'https://bharatiyaparty.org/refer'
      const userReferralCode =
        user.referralCode ||
        `${user.firstName?.toLowerCase()}${user.lastName?.toLowerCase() || ''}`
      setReferralLink(`${baseUrl}/${userReferralCode}`)
    }
  }, [user])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => toast.success('Referral link copied to clipboard!'))
      .catch((err) => toast.error(`Failed to copy link: ${err.message}`))
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-8'>
          {/* Header Section */}
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>
                Refer and Strengthen
              </h1>
              <p className='text-sm text-muted-foreground'>
                Invite supporters to join Bharatiya Popular Party.
              </p>
            </div>
            <Button className='w-full md:w-auto'>Invite Supporters</Button>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {/* Referral Link */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Your Referral Link</CardTitle>
                <CardDescription>Share to invite new members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 truncate rounded-md bg-muted p-2'>
                    {referralLink || 'Generating link...'}
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={copyToClipboard}
                    disabled={!referralLink}
                  >
                    <CopyIcon className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Referrals */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Your Referrals</CardTitle>
                <CardDescription>Track invited supporters</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {referrals.map((referral, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src='/placeholder-user.jpg' />
                        <AvatarFallback>
                          {referral.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>{referral.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          {referral.date}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        referral.status === 'Joined' ? 'default' : 'secondary'
                      }
                    >
                      {referral.status}
                    </Badge>
                  </div>
                ))}
                {!referrals.length && (
                  <p className='text-sm text-muted-foreground'>
                    No referrals yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Impact */}
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Your Impact</CardTitle>
                <CardDescription>Your contribution</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {[
                  {
                    label: 'Total Referrals',
                    value: earnings.total,
                    sub: 'All-time',
                  },
                  {
                    label: 'Pending Approvals',
                    value: earnings.pending,
                    sub: 'Awaiting',
                  },
                  {
                    label: 'Active Members',
                    value: earnings.paid,
                    sub: 'Confirmed',
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div>
                      <p className='text-sm font-medium'>{stat.label}</p>
                      <p className='text-xs text-muted-foreground'>
                        {stat.sub}
                      </p>
                    </div>
                    <p className='text-xl font-bold'>{stat.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Membership No</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals.length ? (
                      referrals.map((referral, index) => (
                        <TableRow key={index}>
                          <TableCell>{referral.name}</TableCell>
                          <TableCell>{referral.date}</TableCell>
                          <TableCell>{referral.membershipType}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                referral.status === 'Joined'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {referral.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{referral.membershipNo}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className='text-center text-muted-foreground'
                        >
                          No referral history found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <section className='space-y-4'>
            <h2 className='text-xl font-bold'>How It Works</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
              {[
                {
                  icon: UserPlusIcon,
                  title: 'Invite Supporters',
                  desc: 'Share your unique referral link.',
                },
                {
                  icon: UsersIcon,
                  title: 'Build Community',
                  desc: 'Each member strengthens our party.',
                },
                {
                  icon: AwardIcon,
                  title: 'Earn Recognition',
                  desc: 'Top recruiters may receive honors.',
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className='flex flex-col items-center p-4 text-center'>
                    <item.icon className='mb-2 h-8 w-8 text-primary' />
                    <h3 className='mb-1 text-lg font-semibold'>{item.title}</h3>
                    <p className='text-sm text-muted-foreground'>{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </Main>
    </>
  )
}

// Icons (unchanged)
function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
      <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
    </svg>
  )
}

function UserPlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <line x1='19' x2='19' y1='8' y2='14' />
      <line x1='22' x2='16' y1='11' y2='11' />
    </svg>
  )
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  )
}

function AwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='8' r='7' />
      <polyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88' />
    </svg>
  )
}
