import { LinkProps } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

interface NavLink extends BaseNavItem {
  url: LinkProps['to'];
  items?: never;
}

interface NavCollapsible extends BaseNavItem {
  items: NavLink[];
  url?: never;
}

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: User;
  dashboard: NavLink;
  navGroups: NavGroup[];
  helpCenter: NavLink;
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink, User };