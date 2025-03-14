import { NavItem, NavCollapsible, NavLink } from '@/components/layout/dashboard/types';

type MembershipType = 'primary' | 'business' | null;

interface AccessControl {
    isVerified: boolean;
    membershipType: MembershipType;
}

const unverifiedAccessibleRoutes = [
    '/dashboard',
    '/dashboard/wallet',
    '/dashboard/goal',
    '/dashboard/profile',
];

const primaryRestrictedRoutes = ['/dashboard/business-community-join'];
const businessRestrictedRoutes = ['/dashboard/community-contribution'];

export const filterNavItems = (
    items: NavItem[],
    access: AccessControl
): NavItem[] => {
    return items.map((item) => {
        if ('items' in item) {
            const collapsible = item as NavCollapsible;
            const filteredSubItems = filterNavItems(collapsible.items, access);
            return { ...collapsible, items: filteredSubItems };
        }

        const link = item as NavLink;
        const url = String(link.url);

        if (!access.isVerified && !unverifiedAccessibleRoutes.includes(url)) {
            return { ...link, disabled: true };
        }

        if (access.isVerified) {
            if (access.membershipType === 'primary' && primaryRestrictedRoutes.includes(url)) {
                return { ...link, disabled: true };
            }
            if (access.membershipType === 'business' && businessRestrictedRoutes.includes(url)) {
                return { ...link, disabled: true };
            }
        }

        return link;
    });
};

export const getAccessibleSidebarData = (sidebarData: SidebarData, access: AccessControl) => {
    return {
        ...sidebarData,
        navGroups: sidebarData.navGroups.map((group) => ({
            ...group,
            items: filterNavItems(group.items, access),
        })),
    };
};