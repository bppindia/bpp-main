import { useState } from 'react'
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

  const handleStateChange = (selectedState: string) => {
    updateFields({ state: selectedState, district: '' }) // Reset district when state changes
    const stateData = stateWithDistrictData.states.find(
      (s) => s.state === selectedState
    )
    setDistricts(stateData ? stateData.districts : [])
  }

  return (
    <FormWrapper title='Address Details'>
      <div className='grid gap-4'>
        {/* Address Line 1 */}
        <div className='text-semibold text-center text-xs text-muted-foreground'>
          * Provide Address as given in Aadhaar Card
        </div>
        <div>
          <Label htmlFor='addressLine1'>
            Address Line 1 <span className='text-red-700'>*</span>
          </Label>
          <Input
            id='addressLine1'
            placeholder='House/Flat No., Building Name, Street'
            name='addressLine1'
            required
            value={addressLine1}
            onChange={(e) => updateFields({ addressLine1: e.target.value })}
          />
        </div>

        {/* Address Line 2 */}
        <div>
          <Label htmlFor='addressLine2'>Address Line 2</Label>
          <Input
            id='addressLine2'
            name='addressLine2'
            placeholder='Area, Landmark'
            value={addressLine2}
            onChange={(e) => updateFields({ addressLine2: e.target.value })}
          />
        </div>

        {/* City/Village, Taluka, District Row */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <Label htmlFor='cityOrVillage'>
              City/Village <span className='text-red-700'>*</span>
            </Label>
            <Input
              id='cityOrVillage'
              placeholder='Enter city/village'
              name='city'
              value={cityOrVillage}
              required
              onChange={(e) => updateFields({ cityOrVillage: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor='state'>
              State <span className='text-red-700'>*</span>
            </Label>
            <Select
              onValueChange={handleStateChange}
              defaultValue={state || ''}
            >
              <SelectTrigger id='state' name='state' className='w-full'>
                <SelectValue placeholder='Select your state' />
              </SelectTrigger>
              <SelectContent>
                {stateWithDistrictData.states.map(({ state }) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* State and Pincode Row */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='district'>
              District <span className='text-red-700'>*</span>
            </Label>
            <Select
              onValueChange={(value) => updateFields({ district: value })}
              defaultValue={district || ''}
              disabled={!districts.length}
            >
              <SelectTrigger id='district' name='district' className='w-full'>
                <SelectValue placeholder='Select your district' />
              </SelectTrigger>
              <SelectContent>
                {districts.map((districtName) => (
                  <SelectItem key={districtName} value={districtName}>
                    {districtName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='pincode'>
              Pincode <span className='text-red-700'>*</span>
            </Label>
            <Input
              id='pincode'
              placeholder='Enter pincode'
              name='pincode'
              value={pincode}
              required
              onChange={(e) => updateFields({ pincode: e.target.value })}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  )
}
