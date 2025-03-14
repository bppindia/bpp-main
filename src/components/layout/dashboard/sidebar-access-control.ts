// src/components/layout/dashboard/sidebar-access-control.ts
import { NavGroup, NavItem } from './types';

type UserType = 'MEMBER' | 'PRIMARY MEMBER' | 'ACTIVE MEMBER' | 'BUSINESS COMMUNITY';

// Define access rules for each menu item by user type
const accessRules: Record<string, UserType[]> = {
    // General
    'Dashboard': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Goals': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Wallet': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Donate': ['PRIMARY MEMBER', 'ACTIVE MEMBER'],

    // User Management
    'Profile': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Professional Profile': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],

    // Community & Membership
    'Membership': ['PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Community Contribution':  ['PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Business Community': ['BUSINESS COMMUNITY'],

    // Settings & Support
    'Settings': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Account': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Appearance': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Notifications': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
    'Help Center': ['MEMBER', 'PRIMARY MEMBER', 'ACTIVE MEMBER'],
};

// Define which items require verification
const verificationRequired: string[] = [
    'Wallet',
    'Donate',
    'Professional Profile',
    'Community Contribution',
    'Business Community',
];

export function filterSidebarItems(
    navGroups: NavGroup[],
    userType: UserType,
    isVerified: boolean
): NavGroup[] {
    return navGroups.map((group) => ({
        ...group,
        items: group.items
            .map((item) => {
                // Check access based on user type
                const hasAccess = accessRules[item.title]?.includes(userType);
                if (!hasAccess) return null;

                // Handle collapsible items
                if ('items' in item) {
                    const filteredSubItems = item.items
                        .filter((subItem) => accessRules[subItem.title]?.includes(userType))
                        .map((subItem) => ({
                            ...subItem,
                            disabled: !isVerified && verificationRequired.includes(subItem.title),
                        }));
                    return filteredSubItems.length > 0
                        ? { ...item, items: filteredSubItems }
                        : null;
                }

                // Handle single items
                return {
                    ...item,
                    disabled: !isVerified && verificationRequired.includes(item.title),
                };
            })
            .filter(Boolean) as NavItem[],
    }));
}