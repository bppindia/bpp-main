// src/components/layout/dashboard/sidebar-access-control.ts
import { NavGroup, NavItem, SidebarData } from './types';

type UserType = 'MEMBER' | 'PRIMARY' | 'ACTIVE' | 'EXECUTIVE';

// Define access rules for each menu item by user type
const accessRules: Record<string, UserType[]> = {
  'Dashboard': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Goals': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Wallet': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Donate': ['PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Profile': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Professional Profile': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Membership': ['PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Community Contribution': ['PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Business Community': ['ACTIVE', 'EXECUTIVE'],
  'Settings': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Account': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Appearance': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Notifications': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Help Center': ['MEMBER', 'PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Events': ['PRIMARY', 'ACTIVE', 'EXECUTIVE'],
  'Campaigns': ['PRIMARY', 'ACTIVE', 'EXECUTIVE'],
};

// Define which items require verification
const verificationRequired: string[] = [
  'Wallet',
  'Donate',
  'Professional Profile',
  'Community Contribution',
  'Business Community',
];

export function getAccessibleSidebarData(
  baseSidebarData: SidebarData,
  access: { isVerified: boolean; membershipType: UserType | null }
): SidebarData {
  const { user, dashboard, navGroups, helpCenter } = baseSidebarData;
  const { isVerified, membershipType } = access;
  const userType = membershipType || 'MEMBER'; // Default to MEMBER if null

  // Filter Dashboard
  const hasDashboardAccess = accessRules[dashboard.title]?.includes(userType);
  const filteredDashboard = hasDashboardAccess
    ? { ...dashboard, disabled: !isVerified && verificationRequired.includes(dashboard.title) }
    : null;

  // Filter NavGroups
  const filteredNavGroups = navGroups
    .map((group) => {
      const filteredItems = group.items
        .map((item) => {
          const hasAccess = accessRules[item.title]?.includes(userType);
          if (!hasAccess) return null;

          if ('items' in item) {
            const filteredSubItems = item.items?.filter((subItem) => accessRules[subItem.title]?.includes(userType))
              .map((subItem) => ({
                ...subItem,
                disabled: !isVerified && verificationRequired.includes(subItem.title),
              })) ?? [];
            return filteredSubItems.length > 0 ? { ...item, items: filteredSubItems } : null;
          }

          return {
            ...item,
            disabled: !isVerified && verificationRequired.includes(item.title),
          };
        })
        .filter(Boolean) as NavItem[];

      return filteredItems.length > 0 ? { ...group, items: filteredItems } : null;
    })
    .filter(Boolean) as NavGroup[];

  // Filter Help Center
  const hasHelpCenterAccess = accessRules[helpCenter.title]?.includes(userType);
  const filteredHelpCenter = hasHelpCenterAccess
    ? { ...helpCenter, disabled: !isVerified && verificationRequired.includes(helpCenter.title) }
    : null;

  return {
    user,
    dashboard: filteredDashboard || { title: '', url: '', disabled: true },
    navGroups: filteredNavGroups,
    helpCenter: filteredHelpCenter || { title: '', url: '', disabled: true },
  };
}