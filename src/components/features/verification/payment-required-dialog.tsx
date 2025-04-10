import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function PaymentRequiredDialog() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  // Close the dialog after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Upgrade to Primary Membership</DialogTitle>
          <DialogDescription>
            Your account has been verified! To unlock all features, please
            upgrade to Primary Membership.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <p className='text-sm text-muted-foreground'>
            As a Primary Member, you'll get access to:
          </p>
          <ul className='mt-2 list-disc pl-5 text-sm text-muted-foreground'>
            <li>Donation features</li>
            <li>Professional Profile</li>
            <li>Community Contribution</li>
            <li>And more!</li>
          </ul>
          <p className='mt-4 text-sm font-medium'>
            One-time payment of ₹5 only
          </p>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button
            type='button'
            variant='default'
            onClick={() => {
              setOpen(false)
              navigate({ to: '/dashboard/membership/payment' })
            }}
          >
            Pay Now
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => setOpen(false)}
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
