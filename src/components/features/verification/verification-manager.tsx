import { useEffect, useState } from 'react'
import { postData } from '@/api/apiClient'
import { needsVerification, needsPrimaryMembership } from '@/utils/roleAccess'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { PaymentRequiredDialog } from './payment-required-dialog'
import { VerificationPendingDialog } from './verification-pending-dialog'

export function VerificationManager() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [hasRequestedNotification, setHasRequestedNotification] =
    useState(false)

  useEffect(() => {
    // Check if user needs verification
    if (user && needsVerification(user)) {
      setShowVerificationDialog(true)
    }

    // Check if user needs to upgrade to primary membership and hasn't requested notification
    if (user && needsPrimaryMembership(user) && !hasRequestedNotification) {
      setShowPaymentDialog(true)
    }
  }, [user, hasRequestedNotification])

  const handleNotifyMe = async () => {
    try {
      const response = await postData<{ success: boolean; message: string }>(
        '/users/membership/notification/notify',
        {
          userId: user?._id,
          email: user?.email,
        }
      )

      if (response.data.success) {
        setHasRequestedNotification(true)
        toast({
          title: 'Success',
          description: response.data.message,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            response.data.message || 'Failed to submit notification request',
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to submit notification request. Please try again later.',
      })
    }
  }

  return (
    <>
      {showVerificationDialog && <VerificationPendingDialog />}
      {showPaymentDialog && (
        <PaymentRequiredDialog onNotifyMe={handleNotifyMe} />
      )}
    </>
  )
}
