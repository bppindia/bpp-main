import { useAuth } from '@/context/AuthContext';
import { getAccessibleSidebarData } from '@/lib/access-control';
import {
  IconBriefcase,
  IconBuildingCommunity,
  IconCalendar,
  IconCertificate,
  IconFileText,
  IconHeartHandshake,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconMessage,
  IconNotification,
  IconPalette,
  IconSettings,
  IconShare3,
  IconShield,
  IconTool,
  IconUser,
  IconWallet,
} from '@tabler/icons-react';
import { type SidebarData } from '@/components/layout/dashboard/types';

const baseSidebarData: SidebarData = {
  user: {
    name: 'Swapnil Mahadik',
    email: 'mswapnil218@gmail.com',
    avatar: '/avatars/shadcn.jpg',
    role: ''
  },
  dashboard: {
    title: 'Dashboard',
    url: '/dashboard',
    icon: IconLayoutDashboard,
  },
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Goals', url: '/dashboard/goal', icon: IconMessage },
        { title: 'Donate', url: '/dashboard/donate', icon: IconHeartHandshake },
        { title: 'Referral', url: '/dashboard/referral', icon: IconShare3 },
      ],
    },
    {
      title: 'User Management',
      items: [
        { title: 'Profile', url: '/dashboard/profile', icon: IconUser },
        { title: 'Professional Profile', url: '/dashboard/professional-profile', icon: IconBriefcase },
        { title: 'Wallet', url: '/dashboard/wallet', icon: IconWallet },
      ],
    },
    {
      title: 'Membership',
      items: [
        { title: 'Membership', url: '/dashboard/membership', icon: IconCertificate },
      ],
    },
    {
      title: 'Services',
      items: [
        { title: 'Community Contribution', url: '/dashboard/community-contribution', icon: IconBuildingCommunity },
        { title: 'Business Community', url: '/dashboard/business-community-join', icon: IconBriefcase },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            { title: 'Account', url: '/dashboard/settings/account', icon: IconTool },
            { title: 'Appearance', url: '/dashboard/settings/appearance', icon: IconPalette },
            { title: 'Notifications', url: '/dashboard/settings/notifications', icon: IconNotification },
            { title: 'Security', url: '/dashboard/settings/security', icon: IconShield },
            { title: 'Terms & Conditions', url: '/dashboard/settings/terms-and-conditions', icon: IconFileText },
            { title: 'Privacy Policy', url: '/dashboard/settings/privacy-policy', icon: IconLock },
          ],
        },
      ],
    },
    {
      title: 'Events & Campaigns',
      items: [
        { title: 'Events', url: '/dashboard/events', icon: IconCalendar },
        { title: 'Campaigns', url: '/dashboard/campaigns', icon: IconCalendar },
      ],
    },
  ],
  helpCenter: {
    title: 'Help Center',
    url: '/dashboard/customer-support',
    icon: IconHelp,
  },
};

export const useSidebarData = () => {
  const { user } = useAuth();
  const access = {
    isVerified: user?.isVerified ?? false,
    membershipType: user?.membershipType ?? null,
  };
  return getAccessibleSidebarData(baseSidebarData, access);
};