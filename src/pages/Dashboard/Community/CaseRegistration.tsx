import { LegalCaseRegistration } from '@/components/form/caseRegistration/legal/index'
import { Stepper } from './contribution'

const CaseRegistrationForm = () => {
    return (
                <div className='mb-7'>
                    <h2 className="text-3xl font-bold my-6">Case Registration</h2>
                    <Stepper />
                <LegalCaseRegistration />
                </div>
    )
}

export default CaseRegistrationForm;