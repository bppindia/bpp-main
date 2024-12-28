import bpplogo from '@/assets/images/logos/Bpp.png';
import { LoadingButton } from '@/components/features/LoadingButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from "@/context/AuthContext";
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { FormEvent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AddressForm } from './AddressForm';
import CredentialsForm from './CredentialsForm';
import EducationalDetailsForm from './EducationalDetails';
import { EmailForm } from './EmailForm';
import { OtpVerificationForm } from './OtpVerificationForm';
import { PersonalDetailForm } from './PersonalDetailForm';
import { RegistrationForm } from './RegistrationDetails';

type RegistrationData = {

    termsAccepted?: boolean;
    partyObjectivesAccepted?: boolean;
    serveCommunityAccepted?: boolean

    // Personal Details
    title: string;           // e.g., Mr., Ms., Dr.
    firstName: string;       // User's first name
    middleName: string;      // User's middle name (optional)
    lastName: string;        // User's last name
    email: string;           // User's email address
    phone: string;           // User's phone number
    dateOfBirth: string;     // Date of birth (format: YYYY-MM-DD)
    gender: string;          // Male, Female, Other
    age: number;             // User's age (can calculate from DOB)

    // OTP Verification
    otp: string;             // One-time password for verification email otp/ phone otp

    // Address Information
    addressLine1: string;    // First line of address
    addressLine2: string;    // Second line of address (optional)
    cityOrVillage: string;   // City or village name
    district: string;        // District name
    state: string;           // State name
    pincode: string;         // Postal code

    // Educational Details
    qualification: string;   // Highest qualification (e.g., Bachelor's)
    profession: string;      // Current profession (e.g., Engineer)
    position: string;        // Current position (e.g., Manager)

    // Registration Details
    aadhaarNumber: string;      // Aadhaar card number
    voterId: string;         // Voter ID number
    aadhaarFront: File | null;      // Aadhaar card file (File type)
    aadhaarBack: File | null;      // Aadhaar card file (File type)
    voterFront: File | null;         // Voter ID file (File type)
    voterBack: File | null;         // Voter ID file (File type)


    // Credentials Information
    password: string;       //password 
    confirmPassword: string;  // Account password

    // referral Code 
    referralCode: string,    //optional field
};


const INITIAL_DATA: RegistrationData = {

    termsAccepted: false,
    partyObjectivesAccepted: false,
    serveCommunityAccepted: false,

    // Personal Details
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    age: 0,

    // OTP Verification
    otp: "",

    // Address Information
    addressLine1: "",
    addressLine2: "",
    cityOrVillage: "",
    district: "",
    state: "",
    pincode: "",

    // Educational Details
    qualification: "",
    profession: "",
    position: "",

    // Registration Details
    aadhaarNumber: "",
    voterId: "",
    aadhaarFront: null,    // Aadhaar card file (File type)
    aadhaarBack: null,     // Aadhaar card file (File type)
    voterFront: null,     // Voter ID file (File type)
    voterBack: null,

    // Credentials Information
    password: "",
    confirmPassword: "",

    // referral Code 
    referralCode: "", //optional field
};


const MultiStepForm = () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { sendOtp, verifyOtp } = useAuth();

    //Function that update the fields inside FormData
    function updateFields(fields: Partial<RegistrationData>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

    const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultiStepForm([
            <EmailForm {...data} updateFields={updateFields} />,
            <OtpVerificationForm {...data} updateFields={updateFields} />,
            <PersonalDetailForm {...data} updateFields={updateFields} />,
            <AddressForm {...data} updateFields={updateFields} />,
            <RegistrationForm {...data} updateFields={updateFields} />,
            ...(data.serveCommunityAccepted ? [<EducationalDetailsForm {...data} updateFields={updateFields} />] : []),
            <CredentialsForm {...data} updateFields={updateFields} />,
        ]);


    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (currentStepIndex === 0) {
            // Handle first step - Send OTP
            if (!data.termsAccepted || !data.partyObjectivesAccepted) {
                toast.error('Please accept all terms and conditions');
                return;
            }

            // Validate either email or phone
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const phoneRegex = /^(\+91)?[6-9]\d{9}$/;

            const isEmail = data?.email && emailRegex.test(data.email);
            const isPhone = data?.phone && phoneRegex.test(data.phone);

            if (!isEmail && !isPhone) {
                toast.error('Please enter a valid email or phone number');
                return;
            }

            try {
                // Determine whether to send OTP to email or phone
                if (isEmail) {
                    await sendOtp(data.email!, 'email'); // Send email OTP
                } else if (isPhone) {
                    const formattedPhoneNumber = data.phone;
                    await sendOtp(formattedPhoneNumber!, 'phone'); // Send phone OTP
                }
                next(); // Move to OTP verification step
            } catch (error) {
                toast.error('Failed to send OTP');
            }
        } else if (currentStepIndex === 1) {
            // Handle second step - Verify OTP
            if (data.otp.length !== 4) {
                toast.error('Please enter a valid 4-digit OTP');
                return;
            }

            try {
                // Verify OTP
                const formattedPhoneNumber = data.phone;
                const verificationTarget = data.email || formattedPhoneNumber;
                const verificationType = data.email ? 'email' : 'phone';
                await verifyOtp(verificationTarget!, data.otp, verificationType);
                next(); // Move to the next step after verification
            } catch (error) {
                console.error('Failed to verify OTP:', error);
            }
        } else if (currentStepIndex === 2) {
            // Add validation for personal details
            const requiredFields = [
                'firstName', 'lastName', 'dateOfBirth',
                'gender'
            ];

            const missingFields = requiredFields.filter(field => !((data as any)[field]));

            if (missingFields.length > 0) {
                toast.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
                return;
            }
            const today = new Date();
            const birthDate = new Date(data.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 19) {
                toast("Age must be 18 or older.");
            } else if (data.phone && data.phone.length >= 10) {
                next();
            } else if (!data.phone || data.phone.length < 10) {
                toast("Phone number must be at least 10 digits.");
            } else {
                next();
            }
        } else if (isLastStep) {
            try {
                setLoading(true);

                const formData = new FormData();
                // Append required fields
                formData.append('title', data.title);
                formData.append('firstName', data.firstName);
                formData.append('lastName', data.lastName);
                formData.append('dateOfBirth', data.dateOfBirth);
                formData.append('gender', data.gender);
                formData.append('age', String(data.age));
                formData.append('addressLine1', data.addressLine1);
                formData.append('cityOrVillage', data.cityOrVillage);
                formData.append('district', data.district);
                formData.append('state', data.state);
                formData.append('pincode', data.pincode);

                // Append optional fields if filled
                if (data.email) formData.append('email', data.email);
                if (data.phone) formData.append('phone', data.phone);
                if (data.middleName) formData.append('middleName', data.middleName);
                if (data.addressLine2) formData.append('addressLine2', data.addressLine2);
                if (data.qualification) formData.append('qualification', data.qualification);
                if (data.profession) formData.append('profession', data.profession);
                if (data.position) formData.append('position', data.position);
                if (data.referralCode) formData.append('referralCode', data.referralCode);

                // Append files if they exist
                if (data.aadhaarFront) formData.append('aadhaarFront', data.aadhaarFront);
                if (data.aadhaarBack) formData.append('aadhaarBack', data.aadhaarBack);
                if (data.aadhaarNumber) formData.append('aadhaarNumber', data.aadhaarNumber);
                if (data.voterFront) formData.append('voterFront', data.voterFront);
                if (data.voterBack) formData.append('voterBack', data.voterBack);
                if (data.voterId) formData.append('voterId', data.voterId);

                // Append credentials
                formData.append('password', data.password);

                // Make API request
                const response = await fetch('https://api.bppindia.com:8443/api/v1/signup', {
                    method: 'POST',
                    body: formData,
                });


                if (response.ok) {
                    const result = await response.json();
                    console.log(result, 'Registration successful');
                    toast.success("Registration Successful! Redirecting to the Login page...");
                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    console.error("Registration failed:", errorData);
                    toast.error(errorData.message || "Registration failed. Please try again.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Registration failed. Please try again.");
                setLoading(false);
            }
        } else if (!isLastStep) {
            setLoading(false);

            return next();
        }
    }


    return (
        <section className="flex items-center justify-center h-screen mx-autorounded-none md:rounded-3xl md:p-8 py-10">
            <div>
                <Card className="mx-auto border-gray-300">
                    <CardHeader>
                        <div className="flex items-center justify-center text-xl font-bold text-blue-800">
                            <img
                                src={bpplogo}
                                alt=""
                                className="w-[120px] object-contain rounded-lg"
                            />
                        </div>
                        <h2 className="text-2xl font-black text-center text-neutral-800 dark:text-neutral-200">
                            <div>Welcome to</div>
                            <div style={{ color: '#79A5F2' }}>Bharatiya Popular Party</div>
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={onSubmitHandler}>
                            <div className="grid">
                                {step}

                                {isFirstStep && (
                                    <Button type="submit">
                                        Next
                                    </Button>
                                )}
                                {currentStepIndex === 1 && (
                                    <Button type="submit" className="w-full">
                                        Verify OTP
                                    </Button>
                                )}

                                {currentStepIndex === 2 && (
                                    <div className="flex justify-between gap-2">
                                        <Button type="submit" className='w-full'>
                                            Next
                                        </Button>
                                    </div>
                                )}

                                {isLastStep && (
                                    <div className="flex justify-between gap-2">
                                        <Button type="button" className='w-full' onClick={back}>
                                            Back
                                        </Button>
                                        <LoadingButton loading={loading} type="submit" className="w-full">
                                            Finish
                                        </LoadingButton>
                                    </div>
                                )}
                                {!isFirstStep && currentStepIndex !== 1 && currentStepIndex !== 2 && !isLastStep && (
                                    <>
                                        <div className="flex justify-between gap-2">
                                            <Button type="button" className='w-full' onClick={back}>
                                                Back
                                            </Button>
                                            <Button type="submit" className='w-full'>
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="flex justify-center mt-3 gap-1 text-sm">
                    <Link to='/auth/business-community-join' className="font-semibold underline">sign up as a business</Link>{' '}
                    <p>or</p>{' '}
                    <Link to="/auth/login" className="font-semibold underline">
                        log in
                    </Link>
                </div>
                <Toaster />
            </div>
        </section>
    );
};

export default MultiStepForm;
