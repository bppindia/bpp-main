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
  onCaptchaVerified: (verified: boolean) => void
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  password,
  confirmPassword,
  referralCode,
  updateFields,
  onCaptchaVerified,
}) => {
  const [passwordError, setPasswordError] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match.')
      } else if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters long.')
      } else if (!/[A-Z]/.test(password)) {
        setPasswordError('Password must contain at least one uppercase letter.')
      } else if (!/[a-z]/.test(password)) {
        setPasswordError('Password must contain at least one lowercase letter.')
      } else if (!/[0-9]/.test(password)) {
        setPasswordError('Password must contain at least one number.')
      } else if (!/[!@#$%^&*]/.test(password)) {
        setPasswordError(
          'Password must contain at least one special character (!@#$%^&*).'
        )
      } else {
        setPasswordError('')
      }
    } else {
      setPasswordError('')
    }
  }, [password, confirmPassword])

  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaError('')
      onCaptchaVerified(true)
    } else {
      setCaptchaError('Please complete the CAPTCHA verification')
      onCaptchaVerified(false)
    }
  }

  return (
    <FormWrapper title='Credentials Details'>
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
            className={passwordError ? 'border-red-500 focus:ring-red-500' : ''}
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
            onChange={(e) => updateFields({ confirmPassword: e.target.value })}
            autoComplete='confirm-password'
            className={passwordError ? 'border-red-500 focus:ring-red-500' : ''}
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
          {captchaError && (
            <p className='mt-1 text-xs text-red-600'>{captchaError}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  )
}

export default CredentialsForm
