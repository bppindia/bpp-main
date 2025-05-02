import ContentSection from '@/features/profile/components/content-section'
import PersonalForm from '@/features/profile/personal/personal-form'

export default function PersonalDetails() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <PersonalForm />
    </ContentSection>
  )
}
