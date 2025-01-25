import { z } from 'zod';

export const membersInfoSchema = z.object({
    // firstName: z.string().min(1, 'First Name is required'),
    // middleName: z.string().optional(),
    // lastName: z.string().min(1, 'Last Name is required'),
    // phone: z.string().min(10, 'Phone number is required'),
    // email: z.string().email('Invalid email address'),
    // dateOfBirth: z.string().optional(),
    // aadhaarCard: z.string().min(12, 'Aadhaar Card number is required'),
    // voterId: z.string().min(10, 'Voter ID is required'),
});

export const caseRegisterSchema = z.object({
    // typeOfSupport: z.string().min(1, 'Type of Support is required'),
    // category: z.string().min(1, 'Category is required'),
    // typeOfCase: z.string().min(1, 'Type of Case is required'),
    // dateOfDispute: z.string().min(1, 'Date of Dispute is required'),
    // briefYourCase: z.string().min(1, 'Brief your case is required'),
    // additionalDocument: z.string().optional(),
    // financialAid: z.string().optional(),
});

export const fundRequirementSchema = z.object({
    // totalCost: z.string().min(1, 'Total cost is required'),
    // category: z.string().min(1, 'Category is required'),
    // selfPercentage: z.string().optional(),
    // selfAmount: z.string().optional(),
    // familyFriendsPercentage: z.string().optional(),
    // familyFriendsAmount: z.string().optional(),
    // workplacePercentage: z.string().optional(),
    // workplaceAmount: z.string().optional(),
    // otherInstitutesPercentage: z.string().optional(),
    // otherInstitutesAmount: z.string().optional(),
    // totalAmountRequested: z.string().min(1, 'Total amount requested is required'),
});

export const beneficiarySchema = z.object({
    // lawFirms: z.boolean().optional(),
    // independentAdvocate: z.boolean().optional(),
    // nameOfLawFirm: z.string().min(1, 'Name of Law Firm is required'),
    // nameOfAdvocate: z.string().min(1, 'Name of Advocate is required'),
    // enrollmentNumber: z.string().min(1, 'Enrollment Number is required'),
    // stateBarCouncil: z.string().min(1, 'State Bar Council is required'),
    // gstNumber: z.string().optional(),
});

export const locationSchema = z.object({
    // lawFirms: z.boolean().optional(),
    // independentAdvocate: z.boolean().optional(),
    // nameOfLawFirm: z.string().min(1, 'Name of Law Firm is required'),
    // nameOfAdvocate: z.string().min(1, 'Name of Advocate is required'),
    // enrollmentNumber: z.string().min(1, 'Enrollment Number is required'),
    // stateBarCouncil: z.string().min(1, 'State Bar Council is required'),
    // gstNumber: z.string().optional(),
});

export type MembersInfoFormValues = z.infer<typeof membersInfoSchema>;
export type CaseRegistrationFormValues = z.infer<typeof caseRegisterSchema>;
export type FundRequirementFormValues = z.infer<typeof fundRequirementSchema>;
export type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>;
export type LocationSchemaFormValues = z.infer<typeof locationSchema>;