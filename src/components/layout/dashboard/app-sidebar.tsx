import bppLogo from '@/assets/logo/bppLogo.svg';
import { useSidebarData } from '@/components/layout/dashboard/data/sidebar-data';
import { NavGroup } from '@/components/layout/dashboard/nav-group';
import { NavUser } from '@/components/layout/dashboard/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';
import React from 'react';
import { Link } from 'react-router-dom';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebarData = useSidebarData();
  const { user, dashboard, navGroups, helpCenter } = sidebarData;

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="z-40" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default">
              <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                <img src={bppLogo} alt="logo" className="h-9" />
              </div>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-semibold truncate">bppindia</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={dashboard.url}>
                {dashboard.icon && React.createElement(dashboard.icon, { className: "w-5 h-5 ml-2" })}
                <span>{dashboard.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {navGroups.map((group : any) => (
          <NavGroup key={group.title} {...group} />
        ))}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to={helpCenter.url}>
                {helpCenter.icon && React.createElement(helpCenter.icon, { className: "w-5 h-5 ml-2" })}
                <span>{helpCenter.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default React.memo(AppSidebar);