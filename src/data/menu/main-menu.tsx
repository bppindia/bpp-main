import {
    Goal,
    LayoutGrid,
    LucideIcon
} from 'lucide-react';

type Submenu = {
    href: string;
    label: string;
    description: string;
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

export function getMainMenuList(_pathname?: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/about",
                    label: "About Us",
                    icon: Goal,
                    submenus: [
                        {
                            href: "/about/bpp-goals",
                            label: "Goals",
                            description: `Learn about the goals that drive Bharatiya Popular Party's mission and vision`
                        },
                        {
                            href: "/about/get-to-know-bpp",
                            label: "Get To Know",
                            description: 'Discover more about Bharatiya Popular Party, its values, and its journey.'
                        },
                        {
                            href: "/about/commitment-progress",
                            label: "Commitment to Progress",
                            description: `Understand Bharatiya Popular Party's dedication to sustainability and environmental responsibility.`
                        },
                        {
                            href: "/about/volunteer",
                            label: "Volunteer",
                            description: `Explore exciting career opportunities at Bharatiya Popular Party.`
                        },
                    ]
                }
            ]
        },
        {
            groupLabel: "Membership",
            menus: [
                {
                    href: "/membership",
                    label: "Membership Area",
                    icon: Goal,
                    submenus: [
                        {
                            label: "Members FAQ",
                            href: "/membership/faq",
                            description: "Find answers to common questions about membership.",
                        },
                        {
                            label: "Members Login",
                            href: "/auth/login",
                            description: "Log in to access your membership account.",
                        },
                        {
                            label: "Membership Privileges",
                            href: "/membership/privileges",
                            description: "Learn about the benefits and privileges of being a member.",
                        },
                        {
                            label: "Code of Conduct",
                            href: "/membership/code-of-conduct",
                            description: "Understand the rules and ethical guidelines for members.",
                        },
                        {
                            label: "Complaints",
                            href: "/membership/complaints",
                            description: "Submit and track your complaints related to membership.",
                        },
                        {
                            label: "Upgrade & Renewals",
                            href: "/membership/upgrade-renewals",
                            description: "Easily Upgrade & renew your membership online.",
                        },
                    ],
                },
            ],
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/membership/wings",
                    label: "Wings",
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },     
        {
            groupLabel: "",
            menus: [
                {
                    href: "/business-community",
                    label: "Business Community",
                    icon: Goal,
                    submenus: [
                        {
                            label: "Vendor & Suppliers",
                            href: "/business-community/vendor-suppliers",
                            description: "Explore vendors and suppliers within the community.",
                        },
                        {
                            label: "Business Community Join",
                            href: "/business-community/join",
                            description: "Join the business community and grow your network.",
                        },
                        {
                            label: "Business/Vendor Disclosure",
                            href: "/business-community/disclosure",
                            description: "View important business/vendor disclosure information.",
                        },
                        {
                            label: "Ethics Vendor Supplier",
                            href: "/business-community/ethics",
                            description: "Understand the ethics for vendors and suppliers.",
                        },
                        {
                            label: "Supplier Inclusion",
                            href: "/business-community/inclusion",
                            description: "Learn about supplier inclusion initiatives.",
                        }
                    ]
                }
            ]
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: "/community-contribution",
                    label: "Community Contribution",
                    icon: Goal,
                    submenus: [
                        {
                            label: "Introduction",
                            href: "/community-contribution/introduction",
                            description: "community contribution",
                        },
                        {
                            label: "How it works",
                            href: "/community-contribution/how-it-works",
                            description: "Join the business community and grow your network.",
                        },
                    ]
                }
            ]
        },
    ];
}