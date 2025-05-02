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
      <DialogContent className='sm:max-w-xl'>
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
                <li>Professional Profile</li>
                <li>Community Contribution</li>
                <li>Donation features</li>
                <li>And more!</li>
              </ul>
              <p className='mt-4 text-sm font-medium'>
                Primary Membership fee (one time only)- Rs. 5/-
              </p>
            </div>
            <DialogFooter className='sm:justify-start'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setOpen(false)
                  navigate({ to: '/dashboard/membership/payment' })
                }}
              >
                Pay Now
              </Button>
              <Button
                type='button'
                variant='outline'
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
                We will start accepting membership fees soon.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <p className='text-sm text-muted-foreground'>
                You will be notified via email or text as soon as
                payment-gateway is open and your membership is confirmed.
              </p>
              <div className='mt-4 space-y-2 text-sm'>
                <p className='font-medium'>Terms and Conditions:</p>
                <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
                  <li>
                    I promise to make the primary membership fee payment
                    promptly upon receiving the official notification.
                  </li>
                  <li>
                    As a primary member, I commit to act in accordance with the
                    values and principles of the organization.
                  </li>
                  <li>
                    I understand that my contact information (email and phone
                    number) will be used to send important updates related to my
                    membership.
                  </li>
                  <li>
                    I acknowledge that the Party reserves the right to revoke my
                    membership in the event of any breach of these terms.
                  </li>
                </ul>
              </div>
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
                variant='secondary'
                onClick={handleNotifyMe}
                disabled={!termsAccepted}
              >
                Notify Me
              </Button>
              <Button
                type='button'
                variant='outline'
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
