import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardIcon } from './icons';

export function DashboardTopbar({ adminName }: { adminName: string }) {
  const initials = adminName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <header className="lms-dashboard-topbar">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger size="icon-lg" className="size-10 md:hidden" />
        <span className="lms-dashboard-topbar__mark"><DashboardIcon className="size-4" /></span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">LearnSmart Academy</p>
          <h2 className="truncate text-sm font-semibold sm:text-base">Admin workspace</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-muted-foreground sm:block">{adminName}</span>
        <span className="lms-dashboard-avatar" aria-label={`${adminName} profile`}>{initials || 'A'}</span>
      </div>
    </header>
  );
}
