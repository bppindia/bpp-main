import { Card, CardContent } from '@/components/ui/card'
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from '@/components/ui/stepper'
import { useAuth } from '@/context/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'

const steps = [
  {
    step: 1,
    title: 'account created',
  },
  {
    step: 2,
    title: 'account verified',
  },
  {
    step: 3,
    title: 'payment process(notify)',
  },
  {
    step: 4,
    title: 'membership card generate',
  },
  {
    step: 5,
    title: 'primary member completed',
  },
]

export const StepperStats = () => {
  const { user, loading } = useAuth()

  const getCurrentStep = () => {
    if (!user) return 1

    // Step 1: Account Created (default for all users)
    let currentStep = 1

    // Step 2: Account Verified
    if (user.status === 'APPROVED') {
      currentStep = 2
    }

    // Step 3: Payment Process
    if (
      user.role === 'PRIMARY MEMBER' &&
      user.referralProfile &&
      user.membership
    ) {
      currentStep = 3
    }

    // Step 4: Membership Card Generated
    if (
      user.status === 'APPROVED' &&
      user.role === 'PRIMARY MEMBER' &&
      user.membership?.cardUrl &&
      user.profilePicture
    ) {
      currentStep = 4
    }

    // Step 5: Primary Member Completed
    if (
      user.role === 'PRIMARY MEMBER' &&
      user.membership?.cardUrl &&
      user.profilePicture
    ) {
      currentStep = 5
    }

    return currentStep
  }

  if (loading) {
    return (
      <Card className='mb-6 overflow-hidden'>
        <CardContent className='p-4 sm:p-6'>
          <div className='mx-auto w-full'>
            <div className='flex items-center justify-between'>
              {steps.map(({ step }) => (
                <div key={step} className='flex items-center flex-1'>
                  <Skeleton className='size-5 rounded-full bg-muted' />
                  <Skeleton className='h-4 w-24 ml-2 bg-muted' />
                  {step < steps.length && (
                    <Skeleton className='h-[1px] w-full mx-2 bg-muted' />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='mb-6 overflow-hidden'>
      <CardContent className='p-4 sm:p-6'>
        <div className='mx-auto w-full'>
          <Stepper defaultValue={getCurrentStep()} orientation='horizontal'>
            {steps.map(({ step, title }) => (
              <StepperItem
                key={step}
                step={step}
                className='[&:not(:last-child)]:flex-1'
              >
                <div className='gap-2 flex items-center'>
                  <StepperIndicator className='size-5' />
                  <div className='text-left'>
                    <StepperTitle className='text-xs'>{title}</StepperTitle>
                  </div>
                </div>
                {step < steps.length && <StepperSeparator className='mx-2' />}
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </CardContent>
    </Card>
  )
}
