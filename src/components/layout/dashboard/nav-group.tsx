import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavCollapsible, NavItem, NavLink, type NavGroup } from './types';

export function NavGroup({ title, items }: NavGroup) {
  const { state, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(url);
    setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url ?? 'collapsible'}`;
          if (!item.items) return <SidebarMenuLink key={key} item={item} href={pathname} onNavigate={handleNavigation} />;
          if (state === 'collapsed') return <SidebarMenuCollapsedDropdown key={key} item={item} href={pathname} onNavigate={handleNavigation} />;
          return <SidebarMenuCollapsible key={key} item={item} href={pathname} onNavigate={handleNavigation} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className="px-1 py-0 text-xs rounded-full">{children}</Badge>
);

const SidebarMenuLink = ({
  item,
  href,
  onNavigate
}: {
  item: NavLink;
  href: string;
  onNavigate: (url: string, e: React.MouseEvent) => void;
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      asChild
      isActive={checkIsActive(href, item)}
      tooltip={item.title}
      className={checkIsActive(href, item) ? 'bg-gray-200' : ''} // Add light gray background when active
    >
      <a
        href={typeof item.url === 'string' ? item.url : undefined}
        onClick={(e) => onNavigate(item.url as string, e)}
      >
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        {item.badge && <NavBadge>{item.badge}</NavBadge>}
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const SidebarMenuCollapsible = ({
  item,
  href,
  onNavigate
}: {
  item: NavCollapsible;
  href: string;
  onNavigate: (url: string, e: React.MouseEvent) => void;
}) => (
  <Collapsible
    asChild
    defaultOpen={checkIsActive(href, item, true)}
    className="group/collapsible"
  >
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton
          tooltip={item.title}
          className={checkIsActive(href, item, true) ? 'bg-gray-200' : ''} // Highlight main item if any sub-item is active
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton
                asChild
                isActive={checkIsActive(href, subItem)}
                className={checkIsActive(href, subItem) ? 'bg-gray-200' : ''} // Highlight active sub-item
              >
                <a
                  href={String(subItem.url)}
                  onClick={(e) => onNavigate(subItem.url as string, e)}
                >
                  {subItem.icon && <subItem.icon />}
                  <span>{subItem.title}</span>
                  {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
);

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
  onNavigate
}: {
  item: NavCollapsible;
  href: string;
  onNavigate: (url: string, e: React.MouseEvent) => void;
}) => (
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          tooltip={item.title}
          isActive={checkIsActive(href, item)}
          className={checkIsActive(href, item) ? 'bg-gray-200' : ''} // Highlight when collapsed
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
          <ChevronRight className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>{item.title} {item.badge && `(${item.badge})`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {item.items.map((sub) => (
          <DropdownMenuItem
            key={`${sub.title}-${sub.url}`}
            asChild
            className={checkIsActive(href, sub) ? 'bg-gray-200' : ''} // Highlight active sub-item in dropdown
          >
            <a
              href={typeof sub.url === 'string' ? sub.url : undefined}
              onClick={(e) => onNavigate(sub.url as string, e)}
            >
              {sub.icon && <sub.icon />}
              <span className="max-w-52 text-wrap">{sub.title}</span>
              {sub.badge && <span className="ml-auto text-xs">{sub.badge}</span>}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
);

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item?.items?.some((i) => i.url === href) ||
    (mainNav && typeof href === 'string' && typeof item.url === 'string' && href.split('/')[1] !== '' && href.split('/')[1] === item.url.split('/')[1])
  );
}

export default NavGroup;