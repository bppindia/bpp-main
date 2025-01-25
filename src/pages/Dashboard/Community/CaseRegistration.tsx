import { ContentLayout } from '@/components/admin-panel/content-layout'
import { LegalCaseRegistration } from '@/components/form/caseRegistration/legal/index'
import DashboardLayout from '@/layout/DashboardLayout'
import { Stepper } from './contribution'

const CaseRegistrationForm = () => {
    return (
        <DashboardLayout>
        <ContentLayout title="Dashboard">
            <div className='mb-7'>
            <h2 className="text-3xl font-bold my-6">Case Registration</h2>
        <Stepper/>
            </div>
            <LegalCaseRegistration/>
        </ContentLayout>
        </DashboardLayout>
    )
}

export default CaseRegistrationForm;