import { AppSidebar } from '@/components/layout/dashboard/app-sidebar';
import { HeaderNav } from '@/components/layout/dashboard/header-nav'; // Import HeaderNav
import { Main } from '@/components/layout/dashboard/main';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SearchProvider } from '@/context/search-context';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <SearchProvider>
      <SidebarProvider>
        <div className="flex w-full max-w-full min-h-screen">
          <AppSidebar />
          <div className="flex flex-col w-full max-w-full">
            <HeaderNav /> {/* Move HeaderNav here, fixed by default */}
            <Main fixed>
              <Outlet /> {/* Pages render here */}
            </Main>
          </div>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}

export default DashboardLayout;