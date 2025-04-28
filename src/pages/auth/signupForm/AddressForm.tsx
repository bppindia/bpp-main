import { useState, useCallback, useMemo } from 'react'
import { stateWithDistrictData } from '@/data/states'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GoogleAddressAutocomplete } from '@/components/features/GoogleAddressAutocomplete'
import { FormWrapper } from './FormWrapper'

type AddressData = {
  addressLine1: string // Required
  addressLine2?: string
  cityOrVillage: string // Required
  district: string // Required
  state: string // Required
  pincode: string // Required
}

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm({
  addressLine1,
  addressLine2,
  cityOrVillage,
  district,
  state,
  pincode,
  updateFields,
}: AddressFormProps) {
  const [districts, setDistricts] = useState<string[]>([])
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressData, string>>
  >({})
  const [autocompleteValue, setAutocompleteValue] = useState(addressLine1 || '')

  const validateField = useCallback((field: keyof AddressData, value: string) => {
    const newErrors = { ...errors }

    if (!value && field !== 'addressLine2') {
      newErrors[field] = 'This field is required'
    } else {
      delete newErrors[field]
    }

    if (field === 'pincode' && value && !/^\d{6}$/.test(value)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }

    if (field === 'addressLine1' && value && value.length < 5) {
      newErrors.addressLine1 =
        'Address line 1 must be at least 5 characters long'
    }

    setErrors(newErrors)
    return !newErrors[field]
  }, [errors])

  const handleStateChange = useCallback(
    (selectedState: string) => {
      updateFields({ state: selectedState, district: '' })
      const stateData = stateWithDistrictData.states.find(
        (s) => s.state === selectedState
      )
      setDistricts(stateData ? stateData.districts : [])
      validateField('state', selectedState)
    },
    [updateFields, validateField]
  )

  const handleAddressSelect = useCallback(
    (address: AddressData) => {
      updateFields({
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        cityOrVillage: address.cityOrVillage,
        district: address.district,
        state: address.state,
        pincode: address.pincode,
      })
      setAutocompleteValue(address.addressLine1 || '')

      const stateData = stateWithDistrictData.states.find(
        (s) => s.state === address.state
      )
      setDistricts(stateData ? stateData.districts : [])

      Object.entries(address).forEach(([key, value]) => {
        validateField(key as keyof AddressData, value || '')
      })
    },
    [updateFields, validateField]
  )

  const handleInputChange = useCallback(
    (field: keyof AddressData, value: string) => {
      updateFields({ [field]: value })
      if (field === 'addressLine1') {
        setAutocompleteValue(value)
      }
      validateField(field, value)
    },
    [updateFields, validateField]
  )

  const handlePincodeChange = useCallback(
    (value: string) => {
      const numericValue = value.replace(/\D/g, '').slice(0, 6)
      handleInputChange('pincode', numericValue)
    },
    [handleInputChange]
  )

  const handleAutocompleteChange = useCallback(
    (value: string) => {
      setAutocompleteValue(value)
      updateFields({ addressLine1: value })
      validateField('addressLine1', value)
    },
    [updateFields, validateField]
  )

  const districtOptions = useMemo(
    () =>
      districts.map((districtName) => (
        <SelectItem key={districtName} value={districtName}>
          {districtName}
        </SelectItem>
      )),
    [districts]
  )

  const stateOptions = useMemo(
    () =>
      stateWithDistrictData.states.map(({ state }) => (
        <SelectItem key={state} value={state}>
          {state}
        </SelectItem>
      )),
    []
  )

  return (
    <FormWrapper title='Address Details'>
      <div className='grid gap-4'>
        <div className='text-semibold text-center text-xs text-muted-foreground'>
          * Provide Address as given in Aadhaar Card
        </div>
        <div>
          <Label htmlFor='addressLine1'>
            Address Line 1 <span className='text-red-700'>*</span>
          </Label>
          <GoogleAddressAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onAddressSelect={handleAddressSelect}
            required
            value={autocompleteValue}
            onChange={handleAutocompleteChange}
            className={
              errors.addressLine1 ? 'border-red-500 focus:ring-red-500' : ''
            }
          />
          {errors.addressLine1 && (
            <p className='mt-1 text-xs text-red-500'>{errors.addressLine1}</p>
          )}
        </div>

        <div>
          <Label htmlFor='addressLine2'>Address Line 2</Label>
          <Input
            id='addressLine2'
            name='addressLine2'
            placeholder='Area, Landmark'
            value={addressLine2 || ''}
            onChange={(e) => handleInputChange('addressLine2', e.target.value)}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <Label htmlFor='cityOrVillage'>
              City/Village <span className='text-red-700'>*</span>
            </Label>
            <Input
              id='cityOrVillage'
              placeholder='Enter city/village'
              name='city'
              value={cityOrVillage || ''}
              required
              onChange={(e) => handleInputChange('cityOrVillage', e.target.value)}
              className={
                errors.cityOrVillage ? 'border-red-500 focus:ring-red-500' : ''
              }
            />
            {errors.cityOrVillage && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.cityOrVillage}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor='state'>
              State <span className='text-red-700'>*</span>
            </Label>
            <Select onValueChange={handleStateChange} value={state || ''}>
              <SelectTrigger
                id='state'
                name='state'
                className={`w-full ${errors.state ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
              >
                <SelectValue placeholder='Select your state' />
              </SelectTrigger>
              <SelectContent>{stateOptions}</SelectContent>
            </Select>
            {errors.state && (
              <p className='mt-1 text-xs text-red-500'>{errors.state}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='district'>
              District <span className='text-red-700'>*</span>
            </Label>
            <Select
              onValueChange={(value) => handleInputChange('district', value)}
              value={district || ''}
              disabled={!districts.length}
            >
              <SelectTrigger
                id='district'
                name='district'
                className={`w-full ${errors.district ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
              >
                <SelectValue placeholder='Select your district' />
              </SelectTrigger>
              <SelectContent>{districtOptions}</SelectContent>
            </Select>
            {errors.district && (
              <p className='mt-1 text-xs text-red-500'>{errors.district}</p>
            )}
          </div>
          <div>
            <Label htmlFor='pincode'>
              Pincode <span className='text-red-700'>*</span>
            </Label>
            <Input
              id='pincode'
              placeholder='Enter pincode'
              name='pincode'
              value={pincode || ''}
              required
              maxLength={6}
              onChange={(e) => handlePincodeChange(e.target.value)}
              className={
                errors.pincode ? 'border-red-500 focus:ring-red-500' : ''
              }
            />
            {errors.pincode && (
              <p className='mt-1 text-xs text-red-500'>{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}