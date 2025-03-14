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
} from '@tabler/icons-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'Swapnil Mahadik',
    email: 'mswapnil218@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Dashboard', url: '/dashboard/home', icon: IconLayoutDashboard },
        { title: 'Goals', url: '/dashboard/goal', icon: IconMessage },
        { title: 'Wallet', url: '/dashboard/wallet', icon: IconWallet },
        { title: 'Donate', url: '/dashboard/donate', icon: IconHeartHandshake },
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
      ],
    },
    {
      title: 'Settings & Support',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            { title: 'Account', url: '/dashboard/account', icon: IconTool },
            { title: 'Appearance', url: '/dashboard/appearance', icon: IconPalette },
            { title: 'Notifications', url: '/dashboard/notifications', icon: IconNotification },
          ],
        },
        { title: 'Help Center', url: '/dashboard/customer-support', icon: IconHelp },
      ],
    },
  ],
};