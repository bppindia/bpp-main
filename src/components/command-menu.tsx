import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconArrowRightDashed,
  IconDeviceLaptop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { useSearch } from '@/context/search-context';
import { useTheme } from '@/context/theme-context';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebarData } from '@/components/layout/dashboard/data/sidebar-data';
import { NavGroup, NavItem, NavLink, NavCollapsible } from '@/components/layout/dashboard/types';

export function CommandMenu() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();
  const sidebarData = useSidebarData();
  const { dashboard, navGroups, helpCenter } = sidebarData;

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen]
  );

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="pr-1 h-72">
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Standalone Dashboard */}
          <CommandGroup heading="">
            <CommandItem
              value={dashboard.title}
              onSelect={() => runCommand(() => navigate(dashboard.url))}
            >
              <div className="flex items-center justify-center w-4 h-4 mr-2">
                <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
              </div>
              {dashboard.title}
            </CommandItem>
          </CommandGroup>

          {/* Navigation Groups */}
          {navGroups.map((group: NavGroup) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem: NavItem, i: number) => {
                if ('url' in navItem) {
                  const linkItem = navItem as NavLink; // Type assertion
                  return (
                    <CommandItem
                      key={`${linkItem.url}-${i}`}
                      value={linkItem.title}
                      onSelect={() => runCommand(() => navigate(linkItem.url))}
                    >
                      <div className="flex items-center justify-center w-4 h-4 mr-2">
                        <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                      </div>
                      {linkItem.title}
                    </CommandItem>
                  );
                }
                const collapsibleItem = navItem as NavCollapsible; // Type assertion
                return collapsibleItem.items?.map((subItem: NavLink, j: number) => (
                  <CommandItem
                    key={`${subItem.url}-${j}`}
                    value={subItem.title}
                    onSelect={() => runCommand(() => navigate(subItem.url))}
                  >
                    <div className="flex items-center justify-center w-4 h-4 mr-2">
                      <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                    </div>
                    {subItem.title}
                  </CommandItem>
                ));
              })}
            </CommandGroup>
          ))}

          {/* Standalone Help Center */}
          <CommandGroup heading="">
            <CommandItem
              value={helpCenter.title}
              onSelect={() => runCommand(() => navigate(helpCenter.url))}
            >
              <div className="flex items-center justify-center w-4 h-4 mr-2">
                <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
              </div>
              {helpCenter.title}
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <IconSun className="mr-2" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <IconMoon className="mr-2 scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <IconDeviceLaptop className="mr-2" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}

export default CommandMenu;