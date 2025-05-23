import { useState, useMemo } from 'react'
import { occupationData } from '@/data/occupation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/features/DatePicker'
import { FormWrapper } from './FormWrapper'

type PersonalDetailData = {
  title?: string
  firstName: string // Required
  middleName?: string
  lastName: string // Required
  dateOfBirth: string // Required
  age: number // Required
  gender: string // Required
  phone: string // Required
  email?: string
  occupation: string // Required
}

type PersonalDetailFormProps = PersonalDetailData & {
  updateFields: (fields: Partial<PersonalDetailData>) => void
}

export function PersonalDetailForm({
  title,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  age,
  gender,
  phone,
  email,
  occupation,
  updateFields,
}: PersonalDetailFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredOccupations = useMemo(() => {
    if (!searchQuery) return occupationData.occupations
    return occupationData.occupations.filter((occ) =>
      occ.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const calculateAge = (dob: Date | undefined): number => {
    if (!dob) return 0
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    if (age < 19) {
      setError('Age must be 18 or older.')
    } else {
      setError(null)
    }
    return age
  }

  return (
    <FormWrapper title='User Details'>
      <div className='text-semibold text-center text-xs text-muted-foreground'>
        * Enter your details exactly given in Aadhaar Card
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-12'>
        {/* Title Field */}
        <div className='col-span-1 sm:col-span-2'>
          <Label>
            Title <span className='text-red-700'>*</span>
          </Label>
          <Select
            required
            onValueChange={(value) => updateFields({ title: value })}
            value={title}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select title' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Mr'>Mr</SelectItem>
              <SelectItem value='Ms'>Ms</SelectItem>
              <SelectItem value='Mrs'>Mrs</SelectItem>
              <SelectItem value='Dr'>Dr</SelectItem>
              <SelectItem value='CA'>CA</SelectItem>
              <SelectItem value='CS'>CS</SelectItem>
              <SelectItem value='Adv'>Adv</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* First Name Field */}
        <div className='col-span-1 sm:col-span-5'>
          <Label>
            First Name <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='First name'
            required
            name='firstName'
            autoComplete='given-name'
            value={firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
          />
        </div>

        {/* Middle Name Field */}
        <div className='col-span-1 sm:col-span-5'>
          <Label>Middle Name</Label>
          <Input
            placeholder='Middle name'
            name='middleName'
            value={middleName}
            onChange={(e) => updateFields({ middleName: e.target.value })}
          />
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div>
          <Label>
            Last Name <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='Last name'
            required
            name='lastName'
            value={lastName}
            onChange={(e) => updateFields({ lastName: e.target.value })}
          />
        </div>

        {/* Gender Field */}
        <div>
          <Label>
            Gender <span className='text-red-700'>*</span>
          </Label>
          <Select
            onValueChange={(value) => updateFields({ gender: value })}
            value={gender}
            name='gender'
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Select gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='male'>Male</SelectItem>
              <SelectItem value='female'>Female</SelectItem>
              <SelectItem value='other'>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2: DOB and Age */}
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12'>
        {/* Date of Birth Field */}
        <div className='col-span-1 sm:col-span-6'>
          <Label>
            Date of Birth <span className='text-red-700'>*</span>
          </Label>
          <DatePicker
            date={dateOfBirth ? new Date(dateOfBirth) : undefined}
            setDate={(date) => {
              updateFields({
                dateOfBirth: date
                  ? date.toLocaleDateString('en-CA')
                  : undefined,
                age: calculateAge(date),
              })
            }}
            endYear={2024}
          />
          {error && <div className='text-xs text-red-700'>{error}</div>}
        </div>

        {/* Age Field */}
        <div className='col-span-1 sm:col-span-6'>
          <Label>
            Age <span className='text-red-700'>*</span>
          </Label>
          <Input
            type='number'
            placeholder='Age'
            name='age'
            value={age}
            required
            readOnly
          />
        </div>
      </div>

      {/* Row 3: Additional Fields */}
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12'>
        <div className='col-span-1 sm:col-span-6'>
          <Label>
            Phone Number <span className='text-red-700'>*</span>
          </Label>
          <Input
            placeholder='Enter phone number'
            value={phone}
            maxLength={13}
            required
            name='phone'
            autoComplete='tel'
            onChange={(e) => updateFields({ phone: e.target.value })}
          />
        </div>
        <div className='col-span-1 sm:col-span-6'>
          <Label>Email Address (optional)</Label>
          <Input
            placeholder='Enter email address'
            value={email}
            autoComplete='email'
            name='email'
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        </div>
      </div>

      {/* Occupation Field */}
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-12'>
        <div className='col-span-1 sm:col-span-12'>
          <Label htmlFor='occupation'>
            Occupation <span className='text-red-700'>*</span>
          </Label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={isOpen}
                className='w-full justify-between'
              >
                {occupation || 'Select occupation'}
                <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0'>
              <div className='p-2'>
                <Input
                  placeholder='Search occupation...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='mb-2'
                />
                <div className='max-h-[300px] overflow-y-auto'>
                  {filteredOccupations.map((occ) => (
                    <div
                      key={occ}
                      className='cursor-pointer px-2 py-1.5 hover:bg-accent hover:text-accent-foreground'
                      onClick={() => {
                        updateFields({ occupation: occ })
                        setIsOpen(false)
                        setSearchQuery('')
                      }}
                    >
                      {occ}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </FormWrapper>
  )
}
