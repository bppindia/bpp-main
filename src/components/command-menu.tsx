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
import { ScrollArea } from './ui/scroll-area';
import { useSidebarData } from './layout/dashboard/data/sidebar-data'; // Import the hook

export function CommandMenu() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { open, setOpen } = useSearch();
  const sidebarData = useSidebarData(); // Use the hook to get filtered sidebar data

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
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                // Skip disabled items
                if (navItem.disabled) return null;

                if (navItem.url) {
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate(navItem.url));
                      }}
                    >
                      <div className="flex items-center justify-center w-4 h-4 mr-2">
                        <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  );
                }

                return navItem.items?.map((subItem, j) => {
                  // Skip disabled sub-items
                  if (subItem.disabled) return null;

                  return (
                    <CommandItem
                      key={`${subItem.url}-${j}`}
                      value={subItem.title}
                      onSelect={() => {
                        runCommand(() => navigate(subItem.url));
                      }}
                    >
                      <div className="flex items-center justify-center w-4 h-4 mr-2">
                        <IconArrowRightDashed className="size-2 text-muted-foreground/80" />
                      </div>
                      {subItem.title}
                    </CommandItem>
                  );
                });
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <IconMoon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}

export default CommandMenu;