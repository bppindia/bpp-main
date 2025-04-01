import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { occupationData } from "@/data/occupation";

type PersonalDetailData = {
  title?: string;
  firstName: string; // Required
  middleName?: string;
  lastName: string; // Required
  dateOfBirth: string; // Required
  age: number; // Required
  gender: string; // Required
  phone: string; // Required
  email?: string;
  occupation: string; // Required
};

type PersonalDetailFormProps = PersonalDetailData & {
  updateFields: (fields: Partial<PersonalDetailData>) => void;
};

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
  occupation, // Added occupation
  updateFields,
}: PersonalDetailFormProps) {
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (dob: Date | undefined): number => {
    if (!dob) return 0;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 19) {
      setError("Age must be 18 or older.");
    } else {
      setError(null);
    }
    return age;
  };

  return (
    <FormWrapper title="User Details">
      <div className="text-xs text-center text-muted-foreground text-semibold">* Enter your details exactly given in Aadhaar Card</div>
      <div className="grid grid-cols-12 gap-4">
        {/* Title Field */}
        <div className="col-span-2 md:col-span-2">
          <Label>
            Title <span className="text-red-700">*</span>
          </Label>
          <Select
            required
            onValueChange={(value) => updateFields({ title: value })}
            value={title}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mr">Mr</SelectItem>
              <SelectItem value="Ms">Ms</SelectItem>
              <SelectItem value="Mrs">Mrs</SelectItem>
              <SelectItem value="Dr">Dr</SelectItem>
              <SelectItem value="CA">CA</SelectItem>
              <SelectItem value="CS">CS</SelectItem>
              <SelectItem value="Adv">Adv</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* First Name Field */}
        <div className="col-span-5 md:col-span-5">
          <Label>
            First Name <span className="text-red-700">*</span>
          </Label>
          <Input
            placeholder="First name"
            required
            name="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
          />
        </div>

        {/* Middle Name Field */}
        <div className="col-span-5 md:col-span-5">
          <Label>
            Middle Name
          </Label>
          <Input
            placeholder="Middle name"
            name="middleName"
            value={middleName}
            onChange={(e) => updateFields({ middleName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Last Name <span className="text-red-700">*</span></Label>
          <Input
            placeholder="Last name"
            required
            name="lastName"
            value={lastName}
            onChange={(e) => updateFields({ lastName: e.target.value })}
          />
        </div>

        {/* Gender Field */}
        <div>
          <Label>
            Gender <span className="text-red-700">*</span>
          </Label>
          <Select
            onValueChange={(value) => updateFields({ gender: value })}
            value={gender}
            name="gender"
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2: DOB and Age */}
      <div className="grid grid-cols-12 gap-4">
        {/* Date of Birth Field */}
        <div className="col-span-6 md:col-span-6">
          <Label>
            Date of Birth <span className="text-red-700">*</span>
          </Label>
          <DatePicker
            date={dateOfBirth ? new Date(dateOfBirth) : undefined}
            setDate={(date) => {
              updateFields({
                dateOfBirth: date ? date.toLocaleDateString('en-CA') : undefined,
                age: calculateAge(date)
              });
            }}
            endYear={2024}
          />
          {error && <div className="text-xs text-red-700">{error}</div>}
        </div>

        {/* Age Field */}
        <div className="col-span-6 md:col-span-6">
          <Label>
            Age <span className="text-red-700">*</span>
          </Label>
          <Input
            type="number"
            placeholder="Age"
            name="age"
            value={age}
            required
            readOnly
          />
        </div>
      </div>

      {/* Row 3: Additional Fields */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-6">
          <Label>Phone Number <span className="text-red-700">*</span></Label>
          <Input
            placeholder="Enter phone number"
            value={phone}
            maxLength={13}
            required
            name="phone"
            autoComplete="tel"
            onChange={(e) => updateFields({ phone: e.target.value })}
          />
        </div>
        <div className="col-span-6 md:col-span-6">
          <Label>Email Address (optional)</Label>
          <Input
            placeholder="Enter email address"
            value={email}
            autoComplete="email"
            name="email"
            onChange={(e) => updateFields({ email: e.target.value })}
          />
        </div>
      </div>

      {/* Occupation Field */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12">

          <Label htmlFor="occupation">
            Occupation <span className="text-red-700">*</span>
          </Label>
          <Select
            onValueChange={(value) => updateFields({ occupation: value })}
            value={occupation}
          >
            <SelectTrigger id="state" name="state" className="w-full">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {occupationData.occupations.map((occupation) => (
                <SelectItem key={occupation} value={occupation}>
                  {occupation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </FormWrapper>
  );
}