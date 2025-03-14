import { getAccessibleSidebarData } from '@/lib/access-control';
import { useAuth } from '@/context/AuthContext';
import {
  IconBriefcase,
  IconBuildingCommunity,
  IconCertificate,
  IconHeartHandshake,
  IconHelp,
  IconLayoutDashboard,
  IconMessage,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUser,
  IconWallet,
  IconFileText, // Added for Terms & Conditions
  IconLock,
  IconShare3,
  IconCalendar,
  IconMessageCircle,
  IconCreditCard,
  IconShield,
  IconDownload,     // Added for Privacy Policy
} from '@tabler/icons-react';
import { type SidebarData } from '../types';

const baseSidebarData: SidebarData = {
  user: {
    name: 'Swapnil Mahadik',
    email: 'mswapnil218@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: IconLayoutDashboard },
        { title: 'Goals', url: '/dashboard/goal', icon: IconMessage },
        { title: 'Wallet', url: '/dashboard/wallet', icon: IconWallet },
        { title: 'Donate', url: '/dashboard/donate', icon: IconHeartHandshake },
        { title: 'Referral', url: '/dashboard/referral', icon: IconShare3 },
        { title: 'Events', url: '/dashboard/events', icon: IconCalendar },
      ],
    },
    {
      title: 'User Management',
      items: [
        { title: 'Profile', url: '/dashboard/profile', icon: IconUser },
        { title: 'Professional Profile', url: '/dashboard/professional-profile', icon: IconBriefcase },
      ],
    },
    {
      title: 'Community & Membership',
      items: [
        { title: 'Membership', url: '/dashboard/membership', icon: IconCertificate },
        { title: 'Community Contribution', url: '/dashboard/community-contribution', icon: IconBuildingCommunity },
        { title: 'Business Community', url: '/dashboard/business-community-join', icon: IconBriefcase },
        { title: 'Feedback', url: '/dashboard/feedback', icon: IconMessageCircle }
      ],
    },
    {
      title: 'Settings & Support',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            { title: 'Account', url: '/dashboard/settings/account', icon: IconTool },
            { title: 'Appearance', url: '/dashboard/settings/appearance', icon: IconPalette },
            { title: 'Notifications', url: '/dashboard/settings/notifications', icon: IconNotification },
            { title: 'Billing', url: '/dashboard/settings/billing', icon: IconCreditCard },          // New: Payment history, subscriptions
            { title: 'Security', url: '/dashboard/settings/security', icon: IconShield },           // New: 2FA, password management
            { title: 'Terms & Conditions', url: '/dashboard/settings/terms-and-conditions', icon: IconFileText },
            { title: 'Privacy Policy', url: '/dashboard/settings/privacy-policy', icon: IconLock },
          ],
        },
        { title: 'Help Center', url: '/dashboard/customer-support', icon: IconHelp },
        { title: 'Downloads', url: '/dashboard/downloads', icon: IconDownload },
      ],
    },
  ],
};

export const useSidebarData = () => {
  const { user } = useAuth();
  const access = {
    isVerified: user?.isVerified ?? false,
    membershipType: user?.membershipType ?? null,
  };
  return getAccessibleSidebarData(baseSidebarData, access);
};