import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { FaAndroid } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LoginToggle } from './login-toggle';
import { ModeToggle } from './mode-toggle';
import { LanguageToggle } from './navigation/lang-toggle';
import bppFlag from '@/assets/images/logos/bppflag.png';

const Footer = () => {
  const { t } = useTranslation('footer');

  const sections = [
    {
      title: t('Footer.aboutUs.title'),
      links: [
        { name: t('Footer.aboutUs.links.about'), href: '/about' },
        { name: t('Footer.aboutUs.links.goals'), href: '/about/bpp-goals' },
        { name: t('Footer.aboutUs.links.career'), href: '/career' },
        { name: t('Footer.aboutUs.links.getToKnow'), href: '/about/get-to-know-bpp' },
        { name: t('Footer.aboutUs.links.privacy'), href: '/download-app' },
        { name: t('Footer.aboutUs.links.download'), href: '/download-app' },
        { name: t('Footer.aboutUs.links.commitmentProgress'), href: '/about/commitment-progress' },
        { name: t('Footer.aboutUs.links.volunteer'), href: '/about/volunteer' },
      ],
    },
    {
      title: t('Footer.membershipArea.title'),
      links: [
        { name: t('Footer.membershipArea.links.membersFaq'), href: '/membership/faq' },
        { name: t('Footer.membershipArea.links.membersLogin'), href: '/auth/login' },
        { name: t('Footer.membershipArea.links.membershipPrivileges'), href: '/membership/privileges' },
        { name: t('Footer.membershipArea.links.wings'), href: '/membership/wings' },
        { name: t('Footer.membershipArea.links.codeOfConduct'), href: '/membership/code-of-conduct' },
        { name: t('Footer.membershipArea.links.complaints'), href: '/membership/complaints' },
        { name: t('Footer.membershipArea.links.membershipRenewals'), href: '/membership/renewals' },
      ],
    },
    {
      title: t('Footer.businessCommunity.title'),
      links: [
        { name: t('Footer.businessCommunity.links.vendorSuppliers'), href: '/business-community/vendor-suppliers' },
        { name: t('Footer.businessCommunity.links.businessCommunityJoin'), href: '/business-community/join' },
        { name: t('Footer.businessCommunity.links.businessVendorDisclosure'), href: '/business-community/disclosure' },
        { name: t('Footer.businessCommunity.links.ethicsVendorSupplier'), href: '/business-community/ethics' },
        { name: t('Footer.businessCommunity.links.supplierInclusion'), href: '/business-community/inclusion' },
      ],
    },
    {
      title: t('Footer.communityContributions.title'),
      links: [
        { name: t('Footer.communityContributions.links.introduction'), href: '/community-contribution/introduction' },
        { name: t('Footer.communityContributions.links.howItWorks'), href: '/community-contribution/how-it-works' },
      ],
    },
    {
      title: t('Footer.updates.title'),
      links: [
        { name: t('Footer.updates.links.updates'), href: '#' },
      ],
    },
    {
      title: t('Footer.memberSupport.title'),
      links: [
        { name: t('Footer.memberSupport.links.memberServices'), href: '/customer-suppor' },
        { name: t('Footer.memberSupport.links.appTechnicalSupport'), href: '#' },
        { name: t('Footer.memberSupport.links.accessibility'), href: '#' },
      ],
    },
    {
      title: t('Footer.others.title'),
      links: [
        { name: t('Footer.others.links.dashboard'), href: '/dashboard/home' },
        { name: t('Footer.others.links.logoMediaRequest'), href: '/about/logo-media-request' },
      ],
    },
  ];

  return (
    <section className="border-t max-w-7xl mx-auto mt-6">
      <div className="py-6 container">
        <footer>
          {/* Main Content Grid - Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 text-gray-600 gap-6 md:gap-8">
            {/* Left Column (Logo and Text) - Full width on mobile, 2 cols on larger screens */}
            <div className="md:col-span-3 lg:col-span-2 text-center md:text-left">
              <img
                src={bppFlag}
                alt="BPP Flag"
                className="mx-auto md:mr-auto md:ml-0 mb-4 h-20 w-auto"
              />
              <h3 className="mb-2 text-sm font-bold text-blue-700 dark:text-blue-400">
                {t('Footer.contactDetails.name')}
              </h3>
              <div className='my-2 text-muted-foreground font-bold text-xs text-center md:text-left'>
                {t('Footer.contactDetails.location')}
              </div>
              <div className='my-3 text-muted-foreground text-xs text-center md:text-left'>
                {t('Footer.contactDetails.description')}
              </div>
            </div>

            {/* Right Column (Sections) - Responsive Grid */}
            <div className="md:col-span-9 lg:col-span-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="mx-auto w-full">
                    <h3 className="mb-2 text-xs font-bold dark:text-white text-center md:text-left">
                      {section.title}
                    </h3>
                    <ul className="space-y-2 text-xs text-muted-foreground text-center md:text-left">
                      {section.links.map((link, linkIdx) => (
                        <li
                          key={linkIdx}
                          className="hover:text-primary font-normal hover:underline"
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
          <Separator className="my-3" />

          {/* Bottom Sections - Responsive Flex and Grid */}
          <div className='flex flex-col md:flex-row container justify-between items-center space-y-4 md:space-y-0'>
            <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
              <div className='flex items-center space-x-4'>
                <LanguageToggle />
                <ModeToggle />
                <LoginToggle />
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center gap-2">
                <a target='_blank' href="https://x.com/BharatiyaP20295" className="group">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <TwitterIcon className="h-4 w-4" />
                  </div>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61570250152842" target='_blank' className="group">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <FacebookIcon className="h-4 w-4" />
                  </div>
                </a>
                <a target='_blank' href="https://www.instagram.com/bharatiya_popular_party" className="group">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <InstagramIcon className="h-4 w-4" />
                  </div>
                </a>
                <a target='_blank' href="https://www.linkedin.com/in/bharatiya-popular-party-b28543340/" className="group">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <LinkedinIcon className="h-4 w-4" />
                  </div>
                </a>
              </div>
            </div>

            {/* App Store and Google Play Buttons - Responsive Layout */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <a
                href="https://bppdatabase.s3.ap-south-1.amazonaws.com/app/BPP.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-3 py-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <FaAndroid className="mr-2" />
                <div className="text-left">
                  <div className="text-xs">{t('Footer.downloadApp.text')}</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">{t('Footer.downloadApp.android')}</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Bottom Section - Responsive Layout */}
          <section className='grid grid-cols-1 md:grid-cols-12 my-3 text-center md:text-left'>
            <p className="text-xs text-muted-foreground md:col-span-4">
              {t('Footer.contactDetails.copyright')}
            </p>
            <div className='text-xs md:col-span-8 mt-4 md:mt-0'>
              <ul className="text-muted-foreground flex flex-wrap justify-center md:justify-around w-full md:w-3/4 mx-auto space-x-3 md:space-x-0">
                <li className="font-medium hover:text-primary"><Link to="/">{t('Footer.footerLinks.siteMap')}</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/terms-and-conditions">{t('Footer.footerLinks.termsConditions')}</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/privacy-policy">{t('Footer.footerLinks.privacyPolicy')}</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/">{t('Footer.footerLinks.cookies')}</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/">{t('Footer.footerLinks.feedback')}</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/">{t('Footer.footerLinks.disclaimer')}</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/contact">{t('Footer.footerLinks.contactUs')}</Link></li>
              </ul>
            </div>
          </section>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
