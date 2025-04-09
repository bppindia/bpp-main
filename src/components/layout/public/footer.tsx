import { Link } from '@tanstack/react-router'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { FaAndroid } from 'react-icons/fa'
// Use TanStack Router
import bppFlag from '@/assets/images/logos/bppflag.png'
import { Separator } from '@/components/ui/separator'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageToggle } from './components/lang-toggle'
import { LoginToggle } from './components/login-toggle'

const Footer = () => {
  const { t } = useTranslation('footer')

  const sections = [
    {
      title: t('Footer.aboutUs.title'),
      links: [
        { name: t('Footer.aboutUs.links.goals'), href: '/about/bpp-goals' },
        { name: t('Footer.aboutUs.links.career'), href: '/career' },
        {
          name: t('Footer.aboutUs.links.getToKnow'),
          href: '/about/get-to-know-bpp',
        },
        { name: t('Footer.aboutUs.links.privacy'), href: '/privacy-policy' },
        { name: t('Footer.aboutUs.links.download'), href: '/download-app' },
        {
          name: t('Footer.aboutUs.links.commitmentProgress'),
          href: '/about/commitment-progress',
        },
        { name: t('Footer.aboutUs.links.volunteer'), href: '/about/volunteer' },
      ],
    },
    {
      title: t('Footer.membershipArea.title'),
      links: [
        {
          name: t('Footer.membershipArea.links.membersFaq'),
          href: '/membership/faq',
        },
        {
          name: t('Footer.membershipArea.links.membersLogin'),
          href: '/sign-in',
        },
        {
          name: t('Footer.membershipArea.links.membershipPrivileges'),
          href: '/membership/privileges',
        },
        {
          name: t('Footer.membershipArea.links.wings'),
          href: '/membership/wings',
        },
        {
          name: t('Footer.membershipArea.links.codeOfConduct'),
          href: '/membership/code-of-conduct',
        },
        {
          name: t('Footer.membershipArea.links.complaints'),
          href: '/membership/complaints',
        },
        {
          name: t('Footer.membershipArea.links.membershipRenewals'),
          href: '/membership/upgrade-renewals',
        },
      ],
    },
    {
      title: t('Footer.businessCommunity.title'),
      links: [
        {
          name: t('Footer.businessCommunity.links.vendorSuppliers'),
          href: '/business-community/vendor-suppliers',
        },
        {
          name: t('Footer.businessCommunity.links.businessCommunityJoin'),
          href: '/business-community/join',
        },
        {
          name: t('Footer.businessCommunity.links.businessVendorDisclosure'),
          href: '/business-community/disclosure',
        },
        {
          name: t('Footer.businessCommunity.links.ethicsVendorSupplier'),
          href: '/business-community/ethics',
        },
        {
          name: t('Footer.businessCommunity.links.supplierInclusion'),
          href: '/business-community/inclusion',
        },
      ],
    },
    {
      title: t('Footer.communityContributions.title'),
      links: [
        {
          name: t('Footer.communityContributions.links.introduction'),
          href: '/community-contribution/introduction',
        },
        {
          name: t('Footer.communityContributions.links.howItWorks'),
          href: '/community-contribution/how-it-works',
        },
      ],
    },
    {
      title: t('Footer.updates.title'),
      links: [{ name: t('Footer.updates.links.updates'), href: '#' }],
    },
    {
      title: t('Footer.memberSupport.title'),
      links: [
        {
          name: t('Footer.memberSupport.links.memberServices'),
          href: '/customer-support',
        },
        {
          name: t('Footer.memberSupport.links.appTechnicalSupport'),
          href: '#',
        },
        { name: t('Footer.memberSupport.links.accessibility'), href: '#' },
      ],
    },
    {
      title: t('Footer.others.title'),
      links: [
        { name: t('Footer.others.links.dashboard'), href: '/dashboard' },
        {
          name: t('Footer.others.links.logoMediaRequest'),
          href: '/about/logo-media-request',
        },
      ],
    },
  ]

  return (
    <section className='mx-auto mt-6 max-w-7xl border-t'>
      <div className='container py-6'>
        <footer>
          {/* Main Content Grid - Responsive Layout */}
          <div className='grid grid-cols-1 gap-6 text-gray-600 md:grid-cols-12 md:gap-8'>
            {/* Left Column (Logo and Text) */}
            <div className='text-center md:col-span-3 md:text-left lg:col-span-2'>
              <img
                src={bppFlag}
                alt='BPP Flag'
                className='mx-auto mb-4 h-20 w-auto md:ml-0 md:mr-auto'
              />
              <h3 className='mb-2 text-sm font-bold text-blue-700 dark:text-blue-400'>
                {t('Footer.contactDetails.name')}
              </h3>
              <div className='my-2 text-center text-xs font-bold text-muted-foreground md:text-left'>
                {t('Footer.contactDetails.location')}
              </div>
              <div className='my-3 text-center text-xs text-muted-foreground md:text-left'>
                {t('Footer.contactDetails.description')}
              </div>
            </div>

            {/* Right Column (Sections) */}
            <div className='md:col-span-9 lg:col-span-10'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5'>
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className='mx-auto w-full'>
                    <h3 className='mb-2 text-center text-xs font-bold dark:text-white md:text-left'>
                      {section.title}
                    </h3>
                    <ul className='space-y-2 text-center text-xs text-muted-foreground md:text-left'>
                      {section.links.map((link, linkIdx) => (
                        <li
                          key={linkIdx}
                          className='font-normal hover:text-primary hover:underline'
                        >
                          <Link to={link.href}>{link.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <Separator className='my-3' />

          {/* Bottom Sections */}
          <div className='container flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-8'>
              <div className='flex items-center space-x-4'>
                <LanguageToggle />
                <ThemeSwitch />
                <LoginToggle />
              </div>

              {/* Social Media Icons */}
              <div className='flex items-center justify-center gap-2'>
                <a
                  target='_blank'
                  href='https://x.com/BharatiyaP20295'
                  className='group'
                  rel='noopener noreferrer'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                    <TwitterIcon className='h-4 w-4' />
                  </div>
                </a>
                <a
                  href='https://www.facebook.com/profile.php?id=61570250152842'
                  target='_blank'
                  className='group'
                  rel='noopener noreferrer'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                    <FacebookIcon className='h-4 w-4' />
                  </div>
                </a>
                <a
                  target='_blank'
                  href='https://www.instagram.com/bharatiya_popular_party'
                  className='group'
                  rel='noopener noreferrer'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                    <InstagramIcon className='h-4 w-4' />
                  </div>
                </a>
                <a
                  target='_blank'
                  href='https://www.linkedin.com/in/bharatiya-popular-party-b28543340/'
                  className='group'
                  rel='noopener noreferrer'
                >
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                    <LinkedinIcon className='h-4 w-4' />
                  </div>
                </a>
              </div>
            </div>

            {/* App Store and Google Play Buttons */}
            <div className='flex w-full flex-col items-center justify-center space-y-2 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0'>
              <a
                href='https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk'
                target='_blank'
                rel='noopener noreferrer'
                className='flex w-full items-center justify-center rounded-lg bg-gray-800 px-3 py-2 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto'
              >
                <FaAndroid className='mr-2' />
                <div className='text-left'>
                  <div className='text-xs'>{t('Footer.downloadApp.text')}</div>
                  <div className='-mt-1 font-sans text-sm font-semibold'>
                    {t('Footer.downloadApp.android')}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <section className='my-3 grid grid-cols-1 text-center md:grid-cols-12 md:text-left'>
            <p className='text-xs text-muted-foreground md:col-span-4'>
              {t('Footer.contactDetails.copyright')}
            </p>
            <div className='mt-4 text-xs md:col-span-8 md:mt-0'>
              <ul className='mx-auto flex w-full flex-wrap justify-center space-x-3 text-muted-foreground md:w-3/4 md:justify-around md:space-x-0'>
                <li className='font-medium hover:text-primary'>
                  <Link to='/'>{t('Footer.footerLinks.siteMap')}</Link>
                </li>
                <li className='font-medium hover:text-primary'>
                  <Link to='/terms-and-conditions'>
                    {t('Footer.footerLinks.termsConditions')}
                  </Link>
                </li>
                <li className='font-medium hover:text-primary'>
                  <Link to='/privacy-policy'>
                    {t('Footer.footerLinks.privacyPolicy')}
                  </Link>
                </li>
                <li className='font-medium hover:text-primary'>
                  <Link to='/'>{t('Footer.footerLinks.cookies')}</Link>
                </li>
                <li className='font-medium hover:text-primary'>
                  <Link to='/'>{t('Footer.footerLinks.feedback')}</Link>
                </li>
                <li className='font-medium hover:text-primary'>
                  <Link to='/'>{t('Footer.footerLinks.disclaimer')}</Link>
                </li>
                <li className='font-medium hover:text-primary'>
                  <Link to='/contact'>{t('Footer.footerLinks.contactUs')}</Link>
                </li>
              </ul>
            </div>
          </section>
        </footer>
      </div>
    </section>
  )
}

export default Footer
