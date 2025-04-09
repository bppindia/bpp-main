import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useMainMenuList } from '@/data/menu/main-menu'
import { ChevronDown, MenuIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import bppLogo from '@/assets/logo/bppLogo.png'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
// Use TanStack Router
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageToggle } from './components/lang-toggle'
import QRToggle from './components/qr-toggle'
import type { Group, Menu, Submenu } from '@/data/menu/main-menu'

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { description?: string }
>(({ className, title, children, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block p-3 space-y-1 text-sm leading-none no-underline rounded-md transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-xs font-medium leading-none'>{title}</div>
          <p className='text-xs leading-snug line-clamp-2 text-muted-foreground'>
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

const MainNav = () => {
  const { t } = useTranslation(['common', 'header'])
  const location = useLocation() // TanStack Router's useLocation
  const menuList = useMainMenuList(location.pathname)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex justify-between items-center px-4 w-full max-w-full h-16 sm:justify-between md:max-w-full'>
        {/* Logo */}
        <Link to='/' className='flex gap-1 items-center max-w-7xl'>
          <img
            src={bppLogo}
            className='object-contain w-auto h-16'
            alt='BPP Logo'
          />
          <span className='text-xl font-bold font-oswald sm:text-sm md:text-xl'>
            {t('PartyName.name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden lg:flex'>
          <NavigationMenuList className='gap-2'>
            {menuList.map((group: Group, groupIndex: number) =>
              group.menus.map((menu: Menu) => (
                <NavigationMenuItem key={`${groupIndex}-${menu.href}`}>
                  {menu.submenus?.length ? (
                    <>
                      <NavigationMenuTrigger>
                        <span className='flex items-center text-xs'>
                          {menu.label}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='grid w-[300px] gap-3 p-4 md:w-[650px] md:grid-cols-2'>
                          {menu.submenus.map((submenu: Submenu) => (
                            <ListItem
                              key={submenu.href}
                              title={submenu.label}
                              description={submenu.description}
                              to={submenu.href}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        to={menu.href}
                        className='inline-flex justify-center items-center px-3 py-1 w-full h-8 text-xs font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50'
                      >
                        {menu.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className='flex lg:hidden'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' aria-label='Menu'>
                <MenuIcon className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
              <SheetHeader>
                <SheetTitle>
                  <Link
                    to='/'
                    className='flex gap-2 items-center'
                    onClick={() => setIsOpen(false)}
                  >
                    <img src={bppLogo} className='w-8 h-8' alt='BPP Logo' />
                    <span className='font-bold font-oswald'>
                      {t('PartyName.name')}
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className='mt-6 space-y-2'>
                {menuList.map((group: Group, groupIndex: number) =>
                  group.menus.map((menu: Menu) => (
                    <Collapsible key={`${groupIndex}-${menu.href}`}>
                      {menu.submenus?.length ? (
                        <>
                          <CollapsibleTrigger className='flex justify-between items-center p-2 w-full text-left rounded-md hover:bg-accent'>
                            <span className='text-sm font-medium'>
                              {menu.label}
                            </span>
                            <ChevronDown className='w-4 h-4' />
                          </CollapsibleTrigger>
                          <CollapsibleContent className='ml-4 space-y-2'>
                            {menu.submenus.map((submenu: Submenu) => (
                              <Link
                                key={submenu.href}
                                to={submenu.href}
                                onClick={() => setIsOpen(false)}
                                className='block p-2 text-sm rounded-md hover:bg-accent'
                              >
                                {submenu.label}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </>
                      ) : (
                        <Link
                          to={menu.href}
                          onClick={() => setIsOpen(false)}
                          className='block p-2 text-sm rounded-md hover:bg-accent'
                        >
                          {menu.label}
                        </Link>
                      )}
                    </Collapsible>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right Side Actions */}
        <div className='hidden gap-1 items-center lg:flex'>
          <Button className='h-8 bg-blue-600 hover:bg-blue-800'>
            <Link to='/sign-up' className='text-xs text-white'>
              {t('Join.label', { ns: 'header' })}
            </Link>
          </Button>
          <QRToggle />
          <LanguageToggle />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}

export default MainNav
