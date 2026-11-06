import type { CSSProperties, ReactNode } from 'react';
import { DashboardSidebar } from './components/library/sidebar';
import { DashboardTopbar } from './components/library/topbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import './dashboard.css';

export default function DashboardLayout({
  children,
  adminName = 'Admin',
  onLogout,
}: {
  children: ReactNode;
  adminName?: string;
  onLogout?: () => void;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={true}
        className="library-dashboard h-svh overflow-hidden"
        style={
          {
            '--sidebar-width': '18.125rem',
            '--sidebar-width-icon': '5rem',
          } as CSSProperties
        }
      >
        <DashboardSidebar onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          <DashboardTopbar adminName={adminName} />
          <div className="px-5 md:px-6 py-6 md:py-8 max-md:mb-16">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
