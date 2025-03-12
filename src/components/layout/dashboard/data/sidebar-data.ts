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
        { title: 'Dashboard', url: '/', icon: IconLayoutDashboard },
        { title: 'Goals', url: '/goals', icon: IconMessage },
        { title: 'Wallet', url: '/wallet', icon: IconWallet },
        { title: 'Donate', url: '/donate', icon: IconHeartHandshake },
      ],
    },
    {
      title: 'User Management',
      items: [
        { title: 'Profile', url: '/profile', icon: IconUser },
        { title: 'Professional Profile', url: '/professional', icon: IconBriefcase },
      ],
    },
    {
      title: 'Community & Membership',
      items: [
        { title: 'Membership', url: '/membership', icon: IconCertificate },
        { title: 'Community Contribution', url: '/community-contribution', icon: IconBuildingCommunity },
        { title: 'Business Community', url: '/business-community', icon: IconBriefcase },
      ],
    },
    {
      title: 'Settings & Support',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            { title: 'Account', url: '/settings/account', icon: IconTool },
            { title: 'Appearance', url: '/settings/appearance', icon: IconPalette },
            { title: 'Notifications', url: '/settings/notifications', icon: IconNotification },
          ],
        },
        { title: 'Help Center', url: '/help-center', icon: IconHelp },
      ],
    },
  ],
};