import React, { useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/features/password-input'
import { FormWrapper } from './FormWrapper'

type CredentialsData = {
  password: string // Required
  confirmPassword: string // Required
  referralCode?: string
}

type CredentialsFormProps = CredentialsData & {
  updateFields: (fields: Partial<CredentialsData>) => void
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  password,
  confirmPassword,
  referralCode,
  updateFields,
}) => {
  const [passwordError, setPasswordError] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match.')
    } else {
      setPasswordError('')
    }
  }, [password, confirmPassword])

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaVerified) {
      alert('Please complete the CAPTCHA to proceed.')
      return
    }
  }

  return (
    <FormWrapper title='Credentials Details'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-1'>
          <div>
            <Label htmlFor='password'>
              Password <span className='text-red-700'>*</span>
            </Label>
            <PasswordInput
              id='password'
              name='password'
              value={password}
              onChange={(e) => updateFields({ password: e.target.value })}
              autoComplete='password'
            />
          </div>
          <div>
            <Label htmlFor='confirmPassword'>
              Confirm Password <span className='text-red-700'>*</span>
            </Label>
            <PasswordInput
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) =>
                updateFields({ confirmPassword: e.target.value })
              }
              autoComplete='confirm-password'
            />
            {passwordError && (
              <p className='text-xs text-red-600'>{passwordError}</p>
            )}
          </div>
          <div>
            <Label htmlFor='referralCode'>Referral Code (Optional)</Label>
            <Input
              id='referralCode'
              name='referralCode'
              type='text'
              placeholder='Referral code'
              value={referralCode}
              onChange={(e) => updateFields({ referralCode: e.target.value })}
            />
          </div>
          <div className='mt-4'>
            <ReCAPTCHA
              sitekey='6Lf7ICApAAAAAIbqoBmcwf2BV3VcFJdazMoLF4Ql'
              onChange={handleCaptchaChange}
            />
          </div>
          {/* <div className="mt-4">
            <button
              type="submit"
              disabled={!captchaVerified}
              className={`btn ${captchaVerified ? "btn-primary" : "btn-disabled"}`}
            >
              Submit
            </button>
          </div> */}
        </div>
      </form>
    </FormWrapper>
  )
}

export default CredentialsForm
