import bppFlag from '@/assets/images/logos/bppflag.png';

import { Separator } from '@/components/ui/separator';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageToggle } from './lang-toggle';
import { ModeToggle } from './mode-toggle';
import { LoginToggle } from './login-toggle';

const sections = [
  {
    title: 'About Us',
    links: [
      { name: 'Goals', href: '/about/bpp-goals' },
      { name: 'Get To Know', href: '/about/get-to-know-bpp' },
      { name: 'Commitment to Progress', href: '/about/commitment-progress' },
      { name: 'Volunteer', href: '/about/volunteer' },
    ],
  },
  {
    title: "Membership Area",
    links: [
      { name: "Members Faq", href: "/membership/faq" },
      { name: "Members Login", href: "/auth/login" },
      { name: "Membership Privileges", href: "/membership/privileges" },
      { name: "Wings", href: "/membership/wings" },
      { name: "Code of Conduct", href: "/membership/code-of-conduct" },
      { name: "Complaints", href: "/membership/complaints" },
      { name: "Membership Renewals", href: "/membership/renewals" },
    ],
  },
  {
    title: 'Business Community',
    links: [
      { name: 'Vendor & Suppliers', href: '/business-community/vendor-suppliers' },
      { name: 'Business Community Join', href: '/business-community/join' },
      { name: 'Business/Vendor Disclosure', href: '/business-community/disclosure' },
      { name: 'Ethics Vendor Supplier', href: '/business-community/ethics' },
      { name: 'Supplier Inclusion', href: '/business-community/inclusion' },
    ],
  },
  {
    title: 'Community Contributions',
    links: [
      { name: 'Introduction', href: '/community-contribution/introduction' },
      { name: 'How it Works', href: '/community-contribution/how-it-works' },
    ],
  },
  {
    title: 'Updates',
    links: [
      { name: 'Updates', href: '#' },
    ],
  },
  {
    title: 'Others',
    links: [
      { name: 'Dashboard', href: '/dashboard/home' },
      { name: 'Logo & Media Request', href: '/about/logo-media-request' },
    ],
  }
];

const Footer = () => {
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
                Bharatiya Popular Party
              </h3>
              <div className='my-2 text-muted-foreground font-bold text-xs text-center md:text-left'>
                Navi Mumbai, Maharashtra India
              </div>
              <div className='my-3 text-muted-foreground text-xs text-center md:text-left'>
                Join the Bharatiya Popular Party Platform and be a part of a dynamic and transparent community. Your voice matters, and together, we can drive meaningful change.
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

                {/* Member Support Section */}
                <div className="mx-auto w-full">
                  <h3 className="mb-2 text-xs font-bold dark:text-white text-center md:text-left">
                    Member Support
                  </h3>
                  <ul className="space-y-2 text-xs text-muted-foreground text-center md:text-left">
                    <li className="font-normal hover:text-primary hover:underline">
                      <Link to="/customer-support">Member Services</Link>
                    </li>
                    <li className="font-normal hover:text-primary hover:underline">
                      <a href="#">APP Technical Support</a>
                    </li>
                    <li className="font-normal hover:text-primary hover:underline">
                      <a href="#">Accessibility</a>
                    </li>
                  </ul>
                </div>
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
              <a href="#"
                className="w-full sm:w-auto flex bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-3 py-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                <svg className="mr-3 w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play"
                  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                  </path>
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Get in on</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Section - Responsive Layout */}
          <section className='grid grid-cols-1 md:grid-cols-12 my-3 text-center md:text-left'>
            <p className="text-xs text-muted-foreground md:col-span-4">
              © 2024 Bharatiya Popular Party. All rights reserved.
            </p>
            <div className='text-xs md:col-span-8 mt-4 md:mt-0'>
              <ul className="text-muted-foreground flex flex-wrap justify-center md:justify-around w-full md:w-3/4 mx-auto space-x-3 md:space-x-0">
                <li className="font-medium hover:text-primary"><Link to="/">Site Map</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/">Cookies</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/">Feedback</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/">Disclaimer</Link></li>
                <li className="font-medium hover:text-primary"><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </section>
        </footer>
      </div>
    </section>
  );
};

export default Footer;