import React from 'react'
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

type EducationalDetailsData = {
  qualification?: string
  profession?: string
  position?: string
}

type EducationalDetailsFormProps = EducationalDetailsData & {
  updateFields: (fields: Partial<EducationalDetailsData>) => void
}

const EducationalDetailsForm: React.FC<EducationalDetailsFormProps> = ({
  qualification,
  profession,
  position,
  updateFields,
}) => {
  return (
    <FormWrapper title='Educational Details'>
      <div>
        <Label htmlFor='qualification'>Qualification</Label>
        <Input
          id='qualification'
          name='qualification'
          required
          placeholder='Enter your qualification'
          value={qualification}
          onChange={(e) => updateFields({ qualification: e.target.value })}
        />
      </div>

      {/* Profession */}
      <div>
        <Label htmlFor='profession'>Select Your Professional Category</Label>
        <Select
          required
          name='profession'
          onValueChange={(value) => updateFields({ profession: value })}
          value={profession}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select profession' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Medical'>Medical</SelectItem>
            <SelectItem value='Legal'>Legal</SelectItem>
            <SelectItem value='Social'>Social</SelectItem>
            <SelectItem value='Other'>Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Position */}
      <div>
        <Label htmlFor='position'>Position</Label>
        <Input
          id='position'
          name='position'
          required
          placeholder='Enter your position'
          value={position}
          onChange={(e) => updateFields({ position: e.target.value })}
        />
      </div>
    </FormWrapper>
  )
}

export default EducationalDetailsForm
