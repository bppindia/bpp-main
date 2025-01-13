import {
  Goal,
  HandCoins,
  HandHelping,
  LayoutGrid,
  LucideIcon,
  SquarePen,
  UserRoundPen,
  Users,
  Wallet,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(_pathname?: string): Group[] {
  return [
    {
      groupLabel: "Dashboard",
      menus: [
        {
          href: "/dashboard/home",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/dashboard/goal",
          label: "Goals",
          icon: Goal,
          submenus: [],
        },
        {
          href: "/dashboard/donate",
          label: "Donate",
          icon: HandHelping,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Profile",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/dashboard/account",
          label: "Account",
          icon: UserRoundPen,
          submenus: [],
        },
        {
          href: "/dashboard/wallet",
          label: "Wallet",
          icon: Wallet,
        },
      ],
    },
    {
      groupLabel: "Membership Services",
      menus: [
        {
          href: "/dashboard/membership",
          label: "Membership",
          icon: Users,
        },
        {
          href: "/dashboard/community-contribution",
          label: "Community Contribution",
          icon: HandCoins,
        },
        {
          href: "/dashboard/business-community",
          label: "Business Community",
          icon: HandCoins,
        },
      ],
    },
  ];
}
