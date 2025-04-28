import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PaymentRequiredDialogProps {
  onNotifyMe?: () => void
}

export function PaymentRequiredDialog({
  onNotifyMe,
}: PaymentRequiredDialogProps) {
  const [open, setOpen] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showNotificationContent, setShowNotificationContent] = useState(false)
  const navigate = useNavigate()

  const handleNotifyMe = async () => {
    if (onNotifyMe) {
      await onNotifyMe()
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        {!showNotificationContent ? (
          <>
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
                onClick={() => setShowNotificationContent(true)}
              >
                Notify Me
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Membership Notification</DialogTitle>
              <DialogDescription>
                Our political party will accept membership on a specific date
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <p className='text-sm text-muted-foreground'>
                Once payment is accepted, we will notify you via email and
                in-app notifications.
              </p>
              <div className='mt-4 flex items-center space-x-2'>
                <Checkbox
                  id='terms'
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            <DialogFooter className='sm:justify-start'>
              <Button
                type='button'
                variant='default'
                onClick={handleNotifyMe}
                disabled={!termsAccepted}
              >
                Notify Me
              </Button>
              <Button
                type='button'
                variant='secondary'
                onClick={() => setShowNotificationContent(false)}
              >
                Back
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
