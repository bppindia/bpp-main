import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileInput } from '@/components/features/FileInput'
import { FormWrapper } from './FormWrapper'

type RegistrationData = {
  aadhaarNumber: string // Required
  voterId?: string
  aadhaarFront: File | null // Required
  aadhaarBack: File | null // Required
  voterFront?: File | null
  voterBack?: File | null
  serveCommunityAccepted?: boolean
}

type RegistrationFormProps = RegistrationData & {
  updateFields: (fields: Partial<RegistrationData>) => void
}

export function RegistrationForm({
  aadhaarNumber,
  voterId,
  updateFields,
}: RegistrationFormProps) {
  const [serveCommunity, setServeCommunity] = useState<boolean | false>(false)
  const [aadhaarError, setAadhaarError] = useState<string>('')
  const [voterIdError, setVoterIdError] = useState<string>('')

  const handleServeAccepted = (value: boolean) => {
    setServeCommunity(value)
    updateFields({ serveCommunityAccepted: value })
  }

  const validateAadhaarNumber = (value: string) => {
    const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/
    return aadhaarRegex.test(value)
  }

  const validateVoterId = (value: string) => {
    const voterIdRegex = /^[A-Z]{3}[0-9]{7}$/
    return voterIdRegex.test(value)
  }

  const formatAadhaarNumber = (value: string) => {
    // Remove all spaces from the input
    const digitsOnly = value.replace(/\s/g, '')

    // Only allow numbers
    const numbersOnly = digitsOnly.replace(/[^\d]/g, '')

    // Limit to 12 digits
    const truncated = numbersOnly.slice(0, 12)

    // Add spaces after every 4 digits
    const formatted = truncated.replace(/(\d{4})/g, '$1 ').trim()

    return formatted
  }

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s/g, '') // Remove spaces
    const formattedValue = formatAadhaarNumber(rawValue)

    updateFields({ aadhaarNumber: rawValue })

    if (!formattedValue) {
      setAadhaarError('Aadhaar number is required')
    } else if (formattedValue.replace(/\s/g, '').length === 14) {
      if (!validateAadhaarNumber(formattedValue)) {
        setAadhaarError(
          'Please enter a valid Aadhaar number (e.g., 2345 6789 0123)'
        )
      } else {
        setAadhaarError('')
      }
    } else {
      setAadhaarError('Aadhaar number must be 12 digits')
    }
  }

  return (
    <FormWrapper title='User Details'>
      <div className='grid gap-2'>
        <div className='text-center text-xs font-semibold text-muted-foreground'>
          * Provide your Aadhaar card details.
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <Label htmlFor='aadhaarNumber'>Aadhaar Number</Label>
            <Input
              id='aadhaarNumber'
              placeholder='eg 2345 6789 0123'
              value={aadhaarNumber}
              maxLength={12}
              className={
                aadhaarError ? 'border-red-500 focus:ring-red-500' : ''
              }
              onChange={handleAadhaarChange}
            />
            {aadhaarError && (
              <p className='mt-1 text-xs text-red-500'>{aadhaarError}</p>
            )}
          </div>
        </div>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <FileInput
              id='aadhaarFront'
              label='Aadhaar Card Front'
              onChange={(file) => {
                if (
                  file &&
                  !['image/jpeg', 'image/png', 'application/pdf'].includes(
                    file.type
                  )
                ) {
                  return
                }
                if (file && file.size > 5 * 1024 * 1024) {
                  return
                }
                updateFields({ aadhaarFront: file })
              }}
            />
          </div>
          <div>
            <FileInput
              id='aadhaarBack'
              label='Aadhaar Card Back'
              onChange={(file) => {
                if (
                  file &&
                  !['image/jpeg', 'image/png', 'application/pdf'].includes(
                    file.type
                  )
                ) {
                  return
                }
                if (file && file.size > 5 * 1024 * 1024) {
                  return
                }
                updateFields({ aadhaarBack: file })
              }}
            />
          </div>
        </div>
        <div className='my-4 flex items-center'>
          <div className='h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />
          <span className='mx-4 text-neutral-500 dark:text-neutral-400'>
            or
          </span>
          <div className='h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />
        </div>
        <div className='text-center text-xs font-semibold text-muted-foreground'>
          * Provide your Voter ID card details.
        </div>
        <div className='mt-4 grid grid-cols-1 gap-4'>
          <div>
            <Label htmlFor='voterId'>Voter ID / Electoral Card</Label>
            <Input
              id='voterId'
              placeholder='Enter Voter ID'
              value={voterId}
              className={
                voterIdError ? 'border-red-500 focus:ring-red-500' : ''
              }
              onChange={(e) => {
                const value = e.target.value
                updateFields({ voterId: value })

                if (value && !validateVoterId(value)) {
                  setVoterIdError('Please enter a valid Voter ID Number')
                } else {
                  setVoterIdError('')
                }
              }}
            />
            {voterIdError && (
              <p className='mt-1 text-xs text-red-500'>{voterIdError}</p>
            )}
          </div>
          <div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <FileInput
                  id='voterFront'
                  label='Voter Card Front'
                  onChange={(file) => {
                    if (
                      file &&
                      !['image/jpeg', 'image/png', 'application/pdf'].includes(
                        file.type
                      )
                    ) {
                      return
                    }
                    if (file && file.size > 5 * 1024 * 1024) {
                      return
                    }
                    updateFields({ voterFront: file })
                  }}
                />
              </div>
              <div>
                <FileInput
                  id='voterBack'
                  label='Voter Card Back'
                  onChange={(file) => {
                    if (
                      file &&
                      !['image/jpeg', 'image/png', 'application/pdf'].includes(
                        file.type
                      )
                    ) {
                      return
                    }
                    if (file && file.size > 5 * 1024 * 1024) {
                      return
                    }
                    updateFields({ voterBack: file })
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='text-sm font-medium'>
              Do you want to serve the community as a professional?{' '}
              <span className='text-red-700'>*</span>
            </div>
            <div className='mt-1 text-xs text-muted-foreground'>
              <em>
                Serving the community as a professional member can help winning
                the confidence and increase your chances of being nominated as
                block head.
              </em>
            </div>
          </div>
        </div>

        <div className='mt-4 flex flex-wrap gap-4'>
          <Label className='flex items-center'>
            <Checkbox
              checked={serveCommunity === true}
              onCheckedChange={() => handleServeAccepted(true)}
            />
            <span className='ms-1'>Yes</span>
          </Label>
          <Label className='flex items-center'>
            <Checkbox
              checked={serveCommunity === false}
              onCheckedChange={() => handleServeAccepted(false)}
            />
            <span className='ms-1'>No</span>
          </Label>
        </div>
        <div className='mt-4 text-center text-xs font-semibold text-red-500'>
          * upload clear image of Aadhaar and voter ID
        </div>
      </div>
    </FormWrapper>
  )
}
