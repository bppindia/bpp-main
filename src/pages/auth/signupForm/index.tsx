import { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import { toast } from 'sonner'
import bpplogo from '@/assets/images/logos/Bpp.png'
import { useAuth } from '@/context/AuthContext'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import { LoadingButton } from '@/components/features/LoadingButton'
import { AddressForm } from './AddressForm'
import CredentialsForm from './CredentialsForm'
import EducationalDetailsForm from './EducationalDetails'
import { EmailForm } from './EmailForm'
import { OtpVerificationForm } from './OtpVerificationForm'
import { PersonalDetailForm } from './PersonalDetailForm'
import { RegistrationForm } from './RegistrationDetails'

// Adjusted RegistrationData type to reflect required fields
type RegistrationData = {
  identifier?: string // Optional, will be set as email or phone
  termsAccepted: boolean
  partyObjectivesAccepted: boolean
  serveCommunityAccepted?: boolean
  title?: string
  firstName: string // Required
  middleName?: string
  lastName: string // Required
  email?: string
  phone: string // Required
  dateOfBirth: string // Required
  gender: string // Required
  age: number // Required
  otp: string // Required for OTP verification
  occupation: string // Required
  addressLine1: string // Required
  addressLine2?: string
  cityOrVillage: string // Required
  district: string // Required
  state: string // Required
  pincode: string // Required
  qualification?: string
  profession?: string
  position?: string
  aadhaarNumber: string // Required
  voterId?: string
  aadhaarFront: File | null // Required
  aadhaarBack: File | null // Required
  voterFront?: File | null
  voterBack?: File | null
  password: string // Required
  confirmPassword: string // Required
  referralCode?: string
}

const INITIAL_DATA: RegistrationData = {
  identifier: '',
  termsAccepted: false,
  partyObjectivesAccepted: false,
  serveCommunityAccepted: false,
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  age: 0,
  otp: '',
  occupation: '',
  addressLine1: '',
  addressLine2: '',
  cityOrVillage: '',
  district: '',
  state: '',
  pincode: '',
  qualification: '',
  profession: '',
  position: '',
  aadhaarNumber: '',
  voterId: '',
  aadhaarFront: null,
  aadhaarBack: null,
  voterFront: null,
  voterBack: null,
  password: '',
  confirmPassword: '',
  referralCode: '',
}

const MultiStepForm = () => {
  const [data, setData] = useState(INITIAL_DATA)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { sendOtp, verifyOtp, register, loading } = useAuth()

  // Read referral code from URL and apply it
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const ref = searchParams.get('ref')
    if (ref) {
      updateFields({ referralCode: ref })
    }
  }, [location.search])

  function updateFields(fields: Partial<RegistrationData>) {
    setData((prev) => ({ ...prev, ...fields }))
  }

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <EmailForm {...data} updateFields={updateFields} />,
      <OtpVerificationForm {...data} updateFields={updateFields} />,
      <PersonalDetailForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <RegistrationForm {...data} updateFields={updateFields} />,
      ...(data.serveCommunityAccepted
        ? [<EducationalDetailsForm {...data} updateFields={updateFields} />]
        : []),
      <CredentialsForm
        {...data}
        updateFields={updateFields}
        onCaptchaVerified={setIsCaptchaVerified}
      />,
    ])

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    // Check CAPTCHA verification for the final step
    if (isLastStep && !isCaptchaVerified) {
      toast.error('Please complete the CAPTCHA verification to proceed')
      return
    }

    // Step 0: Send OTP
    if (currentStepIndex === 0) {
      if (!data.termsAccepted || !data.partyObjectivesAccepted) {
        toast.error('Please accept all terms and conditions')
        return
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      const phoneRegex = /^\+91[6-9]\d{9}$/

      const isEmail = data.email && emailRegex.test(data.email)
      const isPhone = data.phone && phoneRegex.test(data.phone)

      if (!isEmail && !isPhone) {
        toast.error(
          'Please enter a valid email or phone number (e.g., +91XXXXXXXXXX)'
        )
        return
      }

      try {
        const identifier = isEmail ? data.email : data.phone
        updateFields({ identifier }) // Store identifier in state
        await sendOtp(identifier!)
        next()
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to send OTP'
        toast.error(errorMessage)
      }
    }

    // Step 1: Verify OTP
    else if (currentStepIndex === 1) {
      if (!data.otp || data.otp.length !== 4) {
        toast.error('Please enter a valid 4-digit OTP')
        return
      }

      try {
        const identifier = data.identifier || data.email || data.phone
        await verifyOtp(identifier!, data.otp)
        next()
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to verify OTP'
        toast.error(errorMessage)
      }
    }

    // Step 2: Personal Details
    else if (currentStepIndex === 2) {
      const requiredFields: (keyof RegistrationData)[] = [
        'title',
        'firstName',
        'lastName',
        'dateOfBirth',
        'age',
        'gender',
        'phone',
        'occupation',
      ]
      const missingFields = requiredFields.filter((field) => !data[field])

      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`)
        return
      }

      const today = new Date()
      const birthDate = new Date(data.dateOfBirth!)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--
      }

      if (age < 18) {
        toast.error('You must be 18 or older to register')
        return
      }

      if (!data.phone || !/^\+91[6-9]\d{9}$/.test(data.phone)) {
        toast.error('Please enter a valid phone number (e.g., +91XXXXXXXXXX)')
        return
      }

      updateFields({ age })
      next()
    }

    // Step 3: Address Details
    else if (currentStepIndex === 3) {
      const requiredFields: (keyof RegistrationData)[] = [
        'addressLine1',
        'cityOrVillage',
        'district',
        'state',
        'pincode',
      ]
      const missingFields = requiredFields.filter((field) => !data[field])

      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`)
        return
      }

      // Validate pincode format (6 digits)
      if (!/^\d{6}$/.test(data.pincode)) {
        toast.error('Please enter a valid 6-digit pincode')
        return
      }

      next()
    }

    // Step 4: Registration Details
    else if (currentStepIndex === 4) {
      if (!data.aadhaarNumber || !data.aadhaarFront || !data.aadhaarBack) {
        toast.error(
          'Aadhaar number and both front and back images are required'
        )
        return
      }

      // Validate Aadhaar number format (12 digits)
      if (!/^\d{12}$/.test(data.aadhaarNumber)) {
        toast.error('Please enter a valid 12-digit Aadhaar number')
        return
      }

      // Validate file types for Aadhaar uploads
      const allowedFileTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
      ]
      const frontFileType = data.aadhaarFront?.type
      const backFileType = data.aadhaarBack?.type

      if (!frontFileType || !allowedFileTypes.includes(frontFileType)) {
        toast.error(
          'Aadhaar front image must be a PDF or image file (PNG, JPEG, JPG)'
        )
        return
      }

      if (!backFileType || !allowedFileTypes.includes(backFileType)) {
        toast.error(
          'Aadhaar back image must be a PDF or image file (PNG, JPEG, JPG)'
        )
        return
      }

      next()
    }

    // Final Step: Register
    else if (isLastStep) {
      if (!data.password || data.password !== data.confirmPassword) {
        toast.error('Passwords must match and cannot be empty')
        return
      }

      if (!data.aadhaarNumber || !data.aadhaarFront || !data.aadhaarBack) {
        toast.error(
          'Aadhaar number and both front and back images are required'
        )
        return
      }

      try {
        const identifier = data.identifier || data.email || data.phone!
        const registrationData: RegistrationData = {
          identifier,
          termsAccepted: data.termsAccepted,
          partyObjectivesAccepted: data.partyObjectivesAccepted,
          serveCommunityAccepted: data.serveCommunityAccepted,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          age: data.age,
          otp: data.otp,
          occupation: data.occupation,
          addressLine1: data.addressLine1,
          cityOrVillage: data.cityOrVillage,
          district: data.district,
          state: data.state,
          pincode: data.pincode,
          aadhaarNumber: data.aadhaarNumber,
          aadhaarFront: data.aadhaarFront,
          aadhaarBack: data.aadhaarBack,
          password: data.password,
          confirmPassword: data.confirmPassword,
          ...(data.title && { title: data.title }),
          ...(data.middleName && { middleName: data.middleName }),
          ...(data.email && { email: data.email }),
          ...(data.addressLine2 && { addressLine2: data.addressLine2 }),
          ...(data.qualification && { qualification: data.qualification }),
          ...(data.profession && { profession: data.profession }),
          ...(data.position && { position: data.position }),
          ...(data.voterId && { voterId: data.voterId }),
          ...(data.voterFront && { voterFront: data.voterFront }),
          ...(data.voterBack && { voterBack: data.voterBack }),
          ...(data.referralCode && { referralCode: data.referralCode }),
        }

        await register(registrationData)
        toast.success('Registration Successful! Redirecting to login...', {
          duration: 3000,
        })
        setTimeout(() => navigate({ to: '/sign-in' }), 4000)
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Registration failed'
        toast.error(errorMessage)
      }
    }

    // Intermediate Steps
    else {
      next()
    }
  }

  return (
    <section className='flex min-h-screen items-center justify-center bg-background px-4 py-6 sm:p-8 md:p-10'>
      <div className='w-full max-w-xl'>
        <Card className='border-0 sm:border sm:shadow-md'>
          <CardHeader className='px-4 sm:px-4'>
            <div className='flex items-center justify-center text-xl font-bold text-blue-800'>
              <Link to='/'>
                <img
                  src={bpplogo}
                  alt='BPP Logo'
                  className='w-[120px] rounded-lg object-contain'
                />
              </Link>
            </div>
            <h2 className='text-center text-2xl font-black text-neutral-800 dark:text-neutral-200'>
              <div>Welcome to</div>
              <div style={{ color: '#79A5F2' }}>Bharatiya Popular Party</div>
            </h2>
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={onSubmitHandler}>
              <div className='grid'>
                {step}
                <div className='mt-4 flex justify-between gap-2'>
                  {!isFirstStep && (
                    <Button type='button' onClick={back} className='w-full'>
                      Back
                    </Button>
                  )}
                  {isFirstStep && (
                    <Button type='submit' className='w-full' disabled={loading}>
                      Next
                    </Button>
                  )}
                  {currentStepIndex === 1 && (
                    <Button type='submit' className='w-full' disabled={loading}>
                      Verify OTP
                    </Button>
                  )}
                  {!isFirstStep && !isLastStep && currentStepIndex !== 1 && (
                    <Button type='submit' className='w-full' disabled={loading}>
                      Next
                    </Button>
                  )}
                  {isLastStep && (
                    <LoadingButton
                      type='submit'
                      loading={loading}
                      className='w-full'
                      disabled={!isCaptchaVerified}
                    >
                      Register
                    </LoadingButton>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className='mt-3 flex justify-center gap-1 text-sm'>
          <Link to='/business-sign-up' className='font-semibold underline'>
            sign up as a business
          </Link>{' '}
          <p>or</p>{' '}
          <Link to='/sign-in' className='font-semibold underline'>
            log in
          </Link>
        </div>
        <Toaster />
      </div>
    </section>
  )
}

export default MultiStepForm
