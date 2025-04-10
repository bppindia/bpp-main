import { useEffect, useState } from 'react'
import { needsVerification, needsPrimaryMembership } from '@/utils/roleAccess'
import { useAuth } from '@/context/AuthContext'
import { PaymentRequiredDialog } from './payment-required-dialog'
import { VerificationPendingDialog } from './verification-pending-dialog'

export function VerificationManager() {
  const { user } = useAuth()
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  useEffect(() => {
    // Check if user needs verification
    if (user && needsVerification(user)) {
      setShowVerificationDialog(true)
    }

    // Check if user needs to upgrade to primary membership
    if (user && needsPrimaryMembership(user)) {
      setShowPaymentDialog(true)
    }
  }, [user])

  return (
    <>
      {showVerificationDialog && <VerificationPendingDialog />}
      {showPaymentDialog && <PaymentRequiredDialog />}
    </>
  )
}
