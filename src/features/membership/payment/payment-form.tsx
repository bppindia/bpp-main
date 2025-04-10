import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { postData } from '@/api/apiClient'
import { useAuth } from '@/context/AuthContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/dashboard/header'
import { Main } from '@/components/layout/dashboard/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CheckCircle2 } from 'lucide-react'

export function PaymentForm() {
  const { user, fetchUserData } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showDonation, setShowDonation] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [formData, setFormData] = useState({
    accountName: '',
    mobile: '',
    email: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    transactionId: '',
    paymentMode: '',
    donationAmount: '',
    paymentScreenshot: null as File | null,
    remarks: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create FormData object for multipart/form-data
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('accountName', formData.accountName)
      formDataToSend.append('mobile', formData.mobile)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('bankName', formData.bankName)
      formDataToSend.append('accountNumber', formData.accountNumber)
      formDataToSend.append('ifscCode', formData.ifscCode)
      formDataToSend.append('transactionId', formData.transactionId)
      formDataToSend.append('paymentMode', formData.paymentMode)
      
      // Add donation amount if provided
      if (formData.donationAmount) {
        formDataToSend.append('donationAmount', formData.donationAmount)
      }
      
      // Add remarks if provided
      if (formData.remarks) {
        formDataToSend.append('remarks', formData.remarks)
      }

      // Add payment screenshot file
      if (formData.paymentScreenshot) {
        formDataToSend.append('screenshot', formData.paymentScreenshot)
      }

      // Get user ID from auth context
      const userId = user?._id
      if (!userId) {
        throw new Error('User ID not found')
      }

      // Use API client to submit payment
      await postData(
        `/users/payment/${userId}`,
        formDataToSend as unknown as Record<string, unknown>,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      // Show success dialog instead of toast
      setShowSuccessDialog(true)

      // Refresh user data to get updated role and status
      await fetchUserData()
    } catch (error) {
      // Log error for debugging
      // eslint-disable-next-line no-console
      console.error('Error submitting payment:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit payment details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDialogClose = () => {
    setShowSuccessDialog(false)
    // Navigate to dashboard when dialog is closed
    navigate({ to: '/dashboard' })
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
        <div className='mx-auto'>
          <div className='mb-8'>
            <h1 className='mb-2 text-xl font-bold'>Membership Payment</h1>
            <p className='text-muted-foreground'>
              Complete your payment to upgrade your membership
            </p>
          </div>

          {/* User Details Card */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Your Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div>
                  <p className='text-sm text-muted-foreground'>Name</p>
                  <p className='font-medium'>
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.lastName}`
                      : user?.name || 'Not available'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Current Membership
                  </p>
                  <Badge
                    variant={user?.role === 'MEMBER' ? 'outline' : 'default'}
                  >
                    {user?.role || 'MEMBER'}
                  </Badge>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Wallet Balance
                  </p>
                  <p className='font-medium'>
                    {user?.wallet?.balance !== undefined
                      ? `₹${user.wallet.balance}`
                      : '₹0'}
                  </p>
                </div>
              </div>
              {user?.membership && (
                <div className='mt-4 border-t pt-4'>
                  <p className='mb-2 text-sm text-muted-foreground'>
                    Membership Details
                  </p>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <p className='text-sm font-medium'>Type</p>
                      <p>{user.membership.type || 'N/A'}</p>
                    </div>
                    <div>
                      <p className='text-sm font-medium'>Status</p>
                      <p>{user.membership.status || 'N/A'}</p>
                    </div>
                    {user.membership.validity && (
                      <>
                        <div>
                          <p className='text-sm font-medium'>Start Date</p>
                          <p>
                            {new Date(
                              user.membership.validity.startDate || ''
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className='text-sm font-medium'>Expiry Date</p>
                          <p>
                            {new Date(
                              user.membership.validity.expiryDate || ''
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </>
                    )}
                    {user.membership.membershipNumber && (
                      <div>
                        <p className='text-sm font-medium'>Membership Number</p>
                        <p>{user.membership.membershipNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bank Account Details Card */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Please transfer the payment to the following account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='rounded-md bg-muted p-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <p className='text-sm font-medium'>Account Name</p>
                    <p className='text-lg'>BPP India</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Account Number</p>
                    <p className='text-lg'>XXXXXXXXXXXX</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>IFSC Code</p>
                    <p className='text-lg'>XXXXXXXX</p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Bank</p>
                    <p className='text-lg'>XXXXX Bank</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-sm font-medium'>
                    Amount for Active Primary Membership
                  </p>
                  <p className='text-lg font-bold'>₹5 (One-time payment)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Please provide your payment details to complete the transaction
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='accountName'>Account Name</Label>
                    <Input
                      id='accountName'
                      name='accountName'
                      value={formData.accountName}
                      onChange={handleInputChange}
                      placeholder='Enter your account name'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='mobile'>Mobile Number</Label>
                    <Input
                      id='mobile'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder='Enter your mobile number'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='Enter your email'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='bankName'>Bank Name</Label>
                    <Input
                      id='bankName'
                      name='bankName'
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder='Enter your bank name'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='accountNumber'>Account Number</Label>
                    <Input
                      id='accountNumber'
                      name='accountNumber'
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder='Enter your account number'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='ifscCode'>IFSC Code</Label>
                    <Input
                      id='ifscCode'
                      name='ifscCode'
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      placeholder='Enter IFSC code'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='transactionId'>Transaction ID</Label>
                    <Input
                      id='transactionId'
                      name='transactionId'
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      placeholder='Enter transaction ID'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='paymentMode'>Payment Mode</Label>
                    <Input
                      id='paymentMode'
                      name='paymentMode'
                      value={formData.paymentMode}
                      onChange={handleInputChange}
                      placeholder='Enter payment mode (UPI, NEFT, etc.)'
                      required
                    />
                  </div>
                </div>

                <div className='flex items-center space-x-2 py-2'>
                  <Switch
                    id='donation'
                    checked={showDonation}
                    onCheckedChange={setShowDonation}
                  />
                  <Label htmlFor='donation'>
                    I would like to make a donation
                  </Label>
                </div>

                {showDonation && (
                  <div className='space-y-2'>
                    <Label htmlFor='donationAmount'>Donation Amount (₹)</Label>
                    <Input
                      id='donationAmount'
                      name='donationAmount'
                      type='number'
                      value={formData.donationAmount}
                      onChange={handleInputChange}
                      placeholder='Enter donation amount'
                    />
                  </div>
                )}

                <div className='space-y-2'>
                  <Label htmlFor='paymentScreenshot'>Payment Screenshot</Label>
                  <Input
                    id='paymentScreenshot'
                    name='paymentScreenshot'
                    type='file'
                    onChange={handleFileChange}
                    accept='image/*,.pdf'
                    required
                  />
                  <p className='text-xs text-muted-foreground'>
                    Upload a screenshot or PDF of your payment confirmation
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='remarks'>Remarks (Optional)</Label>
                  <Textarea
                    id='remarks'
                    name='remarks'
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder='Any additional information about your payment'
                    rows={3}
                  />
                </div>
              </CardContent>

              <Separator className='my-4' />

              <CardFooter className='flex justify-between'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate({ to: '/dashboard' })}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Payment Details'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </Main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center">Payment Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Your payment has been submitted successfully and is pending approval.
              You will be notified once your payment is verified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button onClick={handleDialogClose}>
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
