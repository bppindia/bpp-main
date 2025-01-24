import { ContentLayout } from '@/components/admin-panel/content-layout'
import LegalCaseRegistration from '@/components/form/caseRegistration/legal'
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from '@/components/ui/select'
// import { Separator } from '@/components/ui/separator'
// import { Textarea } from '@/components/ui/textarea'
import DashboardLayout from '@/layout/DashboardLayout'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'

const CaseRegistrationForm = () => {

    // const [formData, setFormData] = useState({
    //     fullName: '',
    //     membershipId: '',
    //     emailAddress: '',
    //     phoneNumber: '',
    //     issueTitle: '',
    //     issueDescription: '',
    //     supportTypes: [],
    //     otherSupportType: '',
    //     supportDescription: '',
    //     previousSupport: '',
    //     consent: false
    // });

    // const [errors, setErrors] = useState({});
    // const [submitted, setSubmitted] = useState(false);

    // const supportTypeOptions = [
    //     { value: 'financial', label: 'Financial Assistance' },
    //     { value: 'resources', label: 'Resources (e.g., food, clothes, books, wheelchairs)' },
    //     { value: 'counselling', label: 'Counselling (psychological)' },
    //     { value: 'advocacy', label: 'Advocacy or Legal Support' },
    //     { value: 'social', label: 'Social Assistance (Marriage, House, etc)' },
    //     { value: 'education', label: 'Education (Scholarship, Higher Studies, Admissions)' },
    //     { value: 'other', label: 'Other' }
    // ];

    // const handleSubmit = (e: { preventDefault: () => void }) => {
    //     e.preventDefault();

    // };

    // const handleChange = (e: { target: { name: any; value: any } }) => {
    //     const { name, value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // const handleSupportTypeChange = (_type: string) => {
       
    // };

    return (
        <DashboardLayout>
        <ContentLayout title="Dashboard">
            {/* <div>case Registration page is under working!</div> */}
            <LegalCaseRegistration/>
            {/* <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                                <Link to="/dashboard/community-contribution">Community Contribution</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Register case</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}
        </ContentLayout>
        </DashboardLayout>
    )
}

export default CaseRegistrationForm;