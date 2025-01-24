import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

// import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { defineStepper } from '@stepperize/react';
import { IndianRupee, Percent } from 'lucide-react';


const membersInfoSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last Name is required'),
    phone: z.string().min(10, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    dateOfBirth: z.string().optional(),
    aadhaarCard: z.string().min(12, 'Aadhaar Card number is required'),
    voterId: z.string().min(10, 'Voter ID is required'),
});

const caseRegisterSchema = z.object({
    typeOfSupport: z.string().min(1, 'Type of Support is required'),
    category: z.string().min(1, 'Category is required'),
    // typeOfCase: z.string().min(1, 'Type of Case is required'),
    // dateOfDispute: z.string().min(1, 'Date of Dispute is required'),
    briefYourCase: z.string().min(1, 'Brief your case is required'),
    // additionalDocument: z.string().optional(),
    // financialAid: z.string().optional(),
});

const fundRequirementSchema = z.object({
    // totalCost: z.string().min(1, 'Total cost is required'),
    // category: z.string().min(1, 'Category is required'),
    selfPercentage: z.string().optional(),
    selfAmount: z.string().optional(),
    familyFriendsPercentage: z.string().optional(),
    familyFriendsAmount: z.string().optional(),
    workplacePercentage: z.string().optional(),
    workplaceAmount: z.string().optional(),
    otherInstitutesPercentage: z.string().optional(),
    otherInstitutesAmount: z.string().optional(),
    // totalAmountRequested: z.string().min(1, 'Total amount requested is required'),
});


const beneficiarySchema = z.object({
    lawFirms: z.boolean().optional(),
    independentAdvocate: z.boolean().optional(),
    nameOfLawFirm: z.string().min(1, 'Name of Law Firm is required'),
    nameOfAdvocate: z.string().min(1, 'Name of Advocate is required'),
    enrollmentNumber: z.string().min(1, 'Enrollment Number is required'),
    stateBarCouncil: z.string().min(1, 'State Bar Council is required'),
    gstNumber: z.string().optional(),
});



type MembersInfoFormValues = z.infer<typeof membersInfoSchema>;
type CaseRegistrationFormValues = z.infer<typeof caseRegisterSchema>;
type FundRequirementFormValues = z.infer<typeof fundRequirementSchema>;
type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>;

const { useStepper, steps, utils } = defineStepper(
    { id: 'member', label: 'Member information', schema: membersInfoSchema },
    { id: 'case', label: 'Case Registration', schema: caseRegisterSchema },
    { id: 'fund', label: 'Fund Requirement', schema: fundRequirementSchema },
    { id: 'beneficiary', label: 'Beneficiary information', schema: beneficiarySchema },
    { id: 'review', label: 'Review', schema: z.object({}) }
);

function LegalCaseRegistration() {
    const stepper = useStepper();

    const form = useForm({
        mode: 'onTouched',
        resolver: zodResolver(stepper.current.schema),
    });

    const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
        // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
        console.log(`Form values for step ${stepper.current.id}:`, values);
        if (stepper.isLast) {
            stepper.reset();
        } else {
            stepper.next();
        }
    };

    const currentIndex = utils.getIndex(stepper.current.id);

    return (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg mx-auto"
            >
            <Card>
                <CardHeader>
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold">Case Registration</h2>
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Step {currentIndex + 1} of {steps.length}
                    </span>
                    </div>
                </div>
                <nav aria-label="Checkout Steps" className="group my-4">
                    <ol
                    className="flex items-center justify-between gap-2"
                    aria-orientation="horizontal"
                    >
                    {stepper.all.map((step, index, array) => (
                        <React.Fragment key={step.id}>
                        <li className="flex items-center gap-4 flex-shrink-0">
                            <Button
                            type="button"
                            role="tab"
                            variant={index <= currentIndex ? 'default' : 'secondary'}
                            aria-current={
                                stepper.current.id === step.id ? 'step' : undefined
                            }
                            aria-posinset={index + 1}
                            aria-setsize={steps.length}
                            aria-selected={stepper.current.id === step.id}
                            className="flex size-10 items-center justify-center rounded-full"
                            onClick={async () => {
                                const valid = await form.trigger();
                                //must be validated
                                if (!valid) return;
                                //can't skip steps forwards but can go back anywhere if validated
                                if (index - currentIndex > 1) return;
                                stepper.goTo(step.id);
                            }}
                            >
                            {index + 1}
                            </Button>
                            <span className="text-sm font-medium">{step.label}</span>
                        </li>
                        {index < array.length - 1 && (
                            <Separator
                            className={`flex-1 ${index < currentIndex ? 'bg-primary' : 'bg-muted'
                                }`}
                            />
                        )}
                        </React.Fragment>
                    ))}
                    </ol>
                </nav>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    {stepper.switch({
                    member: () => <MembersInfoForm />,
                    case: () => <CaseRegistrationForm />,
                    fund: () => <FundRequirementForm />,
                    beneficiary: () => <BeneficiaryForm />,
                    review: () => <Review />,
                    })}
                </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                {!stepper.isLast ? (
                    <>
                    <Button
                        variant="secondary"
                        onClick={stepper.prev}
                        disabled={stepper.isFirst}
                    >
                        Back
                    </Button>
                    <Button type="submit">
                        {stepper.isLast ? 'Complete' : 'Next'}
                    </Button>
                    </>
                ) : (
                    <Button onClick={stepper.reset}>Reset</Button>
                )}
                </CardFooter>
            </Card>
            </form>
        </Form>
    );
}

function MembersInfoForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<MembersInfoFormValues>();

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Member information</CardTitle>
                <CardDescription className='py-2'>
                    Please provide your details for electronic signature*
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-primary"
                            >
                                First Name*
                            </Label>
                            <Input
                                id="firstName"
                                {...register('firstName')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.firstName && (
                                <span className="text-sm text-destructive">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor="middleName"
                                className="block text-sm font-medium text-primary"
                            >
                                Middle Name
                            </Label>
                            <Input
                                id="middleName"
                                {...register('middleName')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.middleName && (
                                <span className="text-sm text-destructive">
                                    {errors.middleName.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-primary"
                            >
                                Last Name*
                            </Label>
                            <Input
                                id="lastName"
                                {...register('lastName')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.lastName && (
                                <span className="text-sm text-destructive">
                                    {errors.lastName.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label
                                htmlFor="phone"
                                className="block text-sm font-medium text-primary"
                            >
                                Phone*
                            </Label>
                            <Input
                                id="phone"
                                {...register('phone')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.phone && (
                                <span className="text-sm text-destructive">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor="email"
                                className="block text-sm font-medium text-primary"
                            >
                                Email*
                            </Label>
                            <Input
                                id="email"
                                {...register('email')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.email && (
                                <span className="text-sm text-destructive">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor="dateOfBirth"
                                className="block text-sm font-medium text-primary"
                            >
                                Date Of Birth
                            </Label>
                            <Input
                                id="dateOfBirth"
                                {...register('dateOfBirth')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.dateOfBirth && (
                                <span className="text-sm text-destructive">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label
                                htmlFor="aadhaarCard"
                                className="block text-sm font-medium text-primary"
                            >
                                Aadhaar Card*
                            </Label>
                            <Input
                                id="aadhaarCard"
                                {...register('aadhaarCard')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.aadhaarCard && (
                                <span className="text-sm text-destructive">
                                    {errors.aadhaarCard.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor="voterId"
                                className="block text-sm font-medium text-primary"
                            >
                                Voter ID*
                            </Label>
                            <Input
                                id="voterId"
                                {...register('voterId')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.voterId && (
                                <span className="text-sm text-destructive">
                                    {errors.voterId.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
                    <CardFooter>
                    <div className='text-red-600 text-xs'>
                        *Note: During the case registration process, no changes or modifications to personal information, including voter details, Aadhar card information, etc., will be accepted.
                        <br/>All details must match exactly as per the membership records.
                    </div>
                    </CardFooter>
        </Card>
    );
}

function CaseRegistrationForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<CaseRegistrationFormValues>();


    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Register your Case</CardTitle>
                <CardDescription className='py-2'>
                    Case Registration
                </CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label
                                htmlFor="typeOfSupport"
                                className="block text-sm font-medium text-primary"
                            >
                                Type of Support*
                            </Label>
                            <Input
                                id="typeOfSupport"
                                {...register('typeOfSupport')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.typeOfSupport && (
                                <span className="text-sm text-destructive">
                                    {errors.typeOfSupport.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label
                                htmlFor="category"
                                className="block text-sm font-medium text-primary"
                            >
                                Category*
                            </Label>
                            <Input
                                id="category"
                                {...register('category')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {errors.category && (
                                <span className="text-sm text-destructive">
                                    {errors.category.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label
                                htmlFor="typeOfCase"
                                className="block text-sm font-medium text-primary"
                            >
                                Type of Case*
                            </Label>
                            <Select 
                            // {...register('typeOfCase')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a case type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Criminal Cases">Criminal Cases</SelectItem>
                                    <SelectItem value="Civil Cases">Civil Cases</SelectItem>
                                    <SelectItem value="Constitutional Cases">Constitutional Cases</SelectItem>
                                    <SelectItem value="Administrative Cases">Administrative Cases</SelectItem>
                                    <SelectItem value="Family Law Cases">Family Law Cases</SelectItem>
                                    <SelectItem value="Commercial Cases">Commercial Cases</SelectItem>
                                    <SelectItem value="Labor and Employment Cases">Labor and Employment Cases</SelectItem>
                                    <SelectItem value="Environmental Cases">Environmental Cases</SelectItem>
                                    <SelectItem value="Property Cases">Property Cases</SelectItem>
                                    <SelectItem value="Consumer Cases">Consumer Cases</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* {errors.typeOfCase && (
                                <span className="text-sm text-destructive">
                                    {errors.typeOfCase.message}
                                </span>
                            )} */}
                        </div>
                        <div>
                            <Label>
                                Date of Dispute <span className="text-red-700">*</span>
                            </Label>
                            {/* <DatePicker 
                                endYear={2024} 
                                setDate={function (date: Date | undefined): void {
                                    throw new Error('Function not implemented.');
                                } } date={undefined}                            /> */}
                            {/* {errors.dateOfDispute && (
                                <div className="text-red-700 text-xs">
                                    {errors.dateOfDispute.message}
                                </div>
                            )} */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                            <Label
                                htmlFor="briefYourCase"
                                className="block text-sm font-medium text-primary"
                            >
                                Brief your case*
                            </Label>
                            <textarea
                                id="briefYourCase"
                                {...register('briefYourCase')}
                                className="block w-full p-2 border rounded-md"
                                rows={4}
                            />
                            {errors.briefYourCase && (
                                <span className="text-sm text-destructive">
                                    {errors.briefYourCase.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                            <Label
                                htmlFor="additionalDocument"
                                className="block text-sm font-medium text-primary"
                            >
                                Additional Document
                            </Label>
                            <Input
                                type="file"
                                id="additionalDocument"
                                // {...register('additionalDocument')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {/* {errors.additionalDocument && (
                                <span className="text-sm text-destructive">
                                    {errors.additionalDocument.message}
                                </span>
                            )} */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label
                                htmlFor="financialAid"
                                className="block text-sm font-medium text-primary"
                            >
                                Financial Aid
                            </Label>
                            <div className="flex items-center space-x-4">
                                <Checkbox
                                    id="financialAidYes"
                                    // {...register('financialAid')}
                                    value="yes"
                                />
                                <Label htmlFor="financialAidYes">Yes</Label>
                                <Checkbox
                                    id="financialAidNo"
                                    // {...register('financialAid')}
                                    value="no"
                                />
                                <Label htmlFor="financialAidNo">No</Label>
                            </div>
                            <div className='text-sm text-red-600'>financial Aid Currently unavailable</div>
                            {/* {errors.financialAid && (
                                <span className="text-sm text-destructive">
                                    {errors.financialAid.message}
                                </span>
                            )} */}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}




function FundRequirementForm() {
    const {
        // register,
        formState: { errors },
    } = useFormContext<FundRequirementFormValues>();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Fund Requirement</CardTitle>
                <CardDescription className="py-2">This facility is available in org legal aid</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="totalCost" className="block text-sm font-medium text-primary">
                                Total cost of your case*
                            </Label>
                            <Input
                                id="totalCost"
                                // {...register('totalCost')}
                                className="block w-full p-2 border rounded-md"
                            />
                            {/* {errors.totalCost && (
                                <span className="text-sm text-destructive">{errors.totalCost.message}</span>
                            )} */}
                        </div>
                    </div>

                    <PercentageAmountInput
                        percentageName="selfPercentage"
                        amountName="selfAmount"
                        label="SELF"
                        errors={errors}
                    />

                    <PercentageAmountInput
                        percentageName="familyFriendsPercentage"
                        amountName="familyFriendsAmount"
                        label="Family & Friends"
                        errors={errors}
                    />

                    <PercentageAmountInput
                        percentageName="workplacePercentage"
                        amountName="workplaceAmount"
                        label="Workplace"
                        errors={errors}
                    />

                    <PercentageAmountInput
                        percentageName="otherInstitutesPercentage"
                        amountName="otherInstitutesAmount"
                        label="Other Institutes"
                        errors={errors}
                    />

                    <div>
                        <Label htmlFor="totalAmountRequested" className="block text-sm font-medium text-primary">
                            Total amount requested*
                        </Label>
                        <div className="flex rounded-lg shadow-sm shadow-black/5">
                            <Input
                                id="totalAmountRequested"
                                // {...register('totalAmountRequested')}
                                className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                                placeholder="Total amount"
                            />
                            <button
                                className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Total amount"
                            >
                                <IndianRupee size={16} strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                        {/* {errors.totalAmountRequested && (
                            <span className="text-sm text-destructive">{errors.totalAmountRequested.message}</span>
                        )} */}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}




function BeneficiaryForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<BeneficiaryFormValues>();

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Beneficiary information</CardTitle>
                    <CardDescription className="py-2">
                        Organization/individual information
                    </CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor="lawFirms"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Law Firms
                                </Label>
                                <Checkbox
                                    id="lawFirms"
                                    {...register('lawFirms')}
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="independentAdvocate"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Independent Advocate
                                </Label>
                                <Checkbox
                                    id="independentAdvocate"
                                    {...register('independentAdvocate')}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor="nameOfLawFirm"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Name of Law Firm*
                                </Label>
                                <Input
                                    id="nameOfLawFirm"
                                    {...register('nameOfLawFirm')}
                                    className="block w-full p-2 border rounded-md"
                                />
                                {errors.nameOfLawFirm && (
                                    <span className="text-sm text-destructive">
                                        {errors.nameOfLawFirm.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label
                                    htmlFor="nameOfAdvocate"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Name of Advocate*
                                </Label>
                                <Input
                                    id="nameOfAdvocate"
                                    {...register('nameOfAdvocate')}
                                    className="block w-full p-2 border rounded-md"
                                />
                                {errors.nameOfAdvocate && (
                                    <span className="text-sm text-destructive">
                                        {errors.nameOfAdvocate.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor="enrollmentNumber"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Enrollment Number*
                                </Label>
                                <Input
                                    id="enrollmentNumber"
                                    {...register('enrollmentNumber')}
                                    className="block w-full p-2 border rounded-md"
                                />
                                {errors.enrollmentNumber && (
                                    <span className="text-sm text-destructive">
                                        {errors.enrollmentNumber.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label
                                    htmlFor="stateBarCouncil"
                                    className="block text-sm font-medium text-primary"
                                >
                                    State Bar Council*
                                </Label>
                                <Input
                                    id="stateBarCouncil"
                                    {...register('stateBarCouncil')}
                                    className="block w-full p-2 border rounded-md"
                                />
                                {errors.stateBarCouncil && (
                                    <span className="text-sm text-destructive">
                                        {errors.stateBarCouncil.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <Label
                                    htmlFor="gstNumber"
                                    className="block text-sm font-medium text-primary"
                                >
                                    GST Number
                                </Label>
                                <Input
                                    id="gstNumber"
                                    {...register('gstNumber')}
                                    className="block w-full p-2 border rounded-md"
                                />
                                {errors.gstNumber && (
                                    <span className="text-sm text-destructive">
                                        {errors.gstNumber.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Your current location</CardTitle>
                    <CardDescription className="py-2">
                        your location
                    </CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor="lawFirms"
                                    className="block text-sm font-medium text-primary"
                                >
                                    State
                                </Label>
                                <Input
                                    id="nameOfLawFirm"
                                    {...register('nameOfLawFirm')}
                                    className="block w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="independentAdvocate"
                                    className="block text-sm font-medium text-primary"
                                >
                                    District
                                </Label>
                                <Input
                                    id="nameOfLawFirm"
                                    {...register('nameOfLawFirm')}
                                    className="block w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label
                                    htmlFor="nameOfLawFirm"
                                    className="block text-sm font-medium text-primary"
                                >
                                    Pincode
                                </Label>
                                <Input
                                    id="nameOfLawFirm"
                                    {...register('nameOfLawFirm')}
                                    className="block w-full p-2 border rounded-md"
                                />
                                {errors.nameOfLawFirm && (
                                    <span className="text-sm text-destructive">
                                        {errors.nameOfLawFirm.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>




            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>You are almost Done</CardTitle>
                    <CardDescription className='py-4'>
                        <div>

                            After you submit this form,We will review your case. Decision to accept or reject concerns will be made at the
                            *sole discretion* of the Bharatiya Popular Party administration.
                        </div>

                        <div>
                            You will receive an email confirming that we received your submission. After we've reviewed your application,
                            well send you an email to let you know if it's been approved or declined.
                        </div>
                    </CardDescription>
                    <Separator />

                    <CardTitle className='text-2xl font-bold'>Agreement</CardTitle>
                    <CardDescription className='py-4'>
                        <div>

                            By submitting this application you confirm that you are the Member of the Bharatiya Popular Party and agree to
                            the conditions described below.
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p>
                            You agree to comply with the terms and conditions of the Bharatiya Popular Party.
                        </p>
                        <p>
                            All information provided in this application is true and accurate to the best of your knowledge. Any false
                            or misleading information may result in the immediate disqualification of the request.
                        </p>
                        <p>
                            You consent to receive notifications and updates from BPP through email, SMS, regarding this
                            submission and any related matters.
                        </p>
                        <p>
                            You understand that approval of your application does not imply an obligation by BPP to provide further
                            assistance beyond the agreed scope.
                        </p>
                        <p>
                            You acknowledge that the decision of the BPP administration is final and binding, and no appeals will be
                            entertained.
                        </p>
                        <div>
                            <Checkbox id="agreement" className="mr-2" />
                            <Label htmlFor="agreement">
                                By submitting this application, you confirm that you have the authority to submit this request and agree to the conditions described below
                            </Label>
                        </div>
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}



function Review() {
    return <div className="text-center">Review content here</div>;
}

export default LegalCaseRegistration;




interface PercentageAmountInputProps {
    percentageName: string;
    amountName: string;
    label: string;
    errors: any;
}

const PercentageAmountInput: React.FC<PercentageAmountInputProps> = ({
    percentageName,
    amountName,
    label,
    errors,
}) => {
    const { register } = useFormContext<FundRequirementFormValues>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <Label>
            Percentage <span className="text-red-700">*</span>
          </Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                    <Input
                        id={percentageName}
                        {...register(percentageName as keyof FundRequirementFormValues)}
                        className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                        placeholder="Percentage"
                    />
                    <button
                        className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Percentage"
                    >
                        <Percent size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
                {errors[percentageName] && (
                    <span className="text-sm text-destructive">{errors[percentageName].message}</span>
                )}
            </div>
            <div>
            <Label>
            Amount ( in INR ) <span className="text-red-700">*</span>
          </Label>
                <div className="flex rounded-lg shadow-sm shadow-black/5">
                    <Input
                        id={amountName}
                        {...register(amountName as keyof FundRequirementFormValues)}
                        className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                        placeholder="Amount"
                    />
                    <button
                        className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Amount"
                    >
                        <IndianRupee size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
                {errors[amountName] && (
                    <span className="text-sm text-destructive">{errors[amountName].message}</span>
                )}
            </div>
            <div className="flex items-center">
                <span>{label}</span>
            </div>
        </div>
    );
};