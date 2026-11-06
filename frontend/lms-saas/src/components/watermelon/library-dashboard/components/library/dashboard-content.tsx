import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDown01Icon,
  BookPlusIcon,
  CatalogIcon,
  DashboardIcon,
  MembersIcon,
  ReportsIcon,
} from './icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CirculationChart } from './circulation-chart';
import { CollectionDonutChart } from './collection-donut-chart';

type DashboardData = {
  totalUsers?: number;
  totalStudents?: number;
  totalInstructors?: number;
  totalAdmins?: number;
  totalCourses?: number;
  totalEnrollments?: number;
};

type DashboardContentProps = {
  dashboard: DashboardData;
  adminName: string;
};

const numberFormatter = new Intl.NumberFormat();

const shortcuts = [
  { label: 'Create a course', detail: 'Add a new learning experience to your catalog.', path: '/admin/create-course', icon: BookPlusIcon },
  { label: 'Manage learners', detail: 'Review accounts and keep your community organized.', path: '/admin/users', icon: MembersIcon },
  { label: 'View analytics', detail: 'Explore performance across your learning platform.', path: '/admin/analytics', icon: ReportsIcon },
];

export function DashboardContent({ dashboard, adminName }: DashboardContentProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const roleSegments = useMemo(() => [
    { label: 'Learners', count: dashboard.totalStudents ?? 0, color: '#21664d' },
    { label: 'Instructors', count: dashboard.totalInstructors ?? 0, color: '#bf7544' },
    { label: 'Admins', count: dashboard.totalAdmins ?? 0, color: '#8c9389' },
  ], [dashboard]);
  const roleTotal = roleSegments.reduce((sum, segment) => sum + segment.count, 0);
  const stats = [
    { label: 'Total learners', value: dashboard.totalStudents ?? 0, note: 'Active student accounts', icon: MembersIcon, tone: 'green' },
    { label: 'Published courses', value: dashboard.totalCourses ?? 0, note: 'Across your catalog', icon: CatalogIcon, tone: 'clay' },
    { label: 'Enrollments', value: dashboard.totalEnrollments ?? 0, note: 'Learner course registrations', icon: DashboardIcon, tone: 'olive' },
    { label: 'Instructors', value: dashboard.totalInstructors ?? 0, note: 'Teaching team members', icon: ReportsIcon, tone: 'stone' },
  ];

  return (
    <div className="lms-dashboard-content">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">LearnSmart overview</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back, {adminName}</h1>
          <p className="mt-2 text-sm text-muted-foreground">A clear view of your courses, learners, and teaching community.</p>
        </div>
        <Button className="w-fit gap-2" onClick={() => navigate('/admin/create-course')}>
          <BookPlusIcon className="size-4" /> Create a course
        </Button>
      </div>

      <div className="space-y-8">
        <section aria-labelledby="dashboard-metrics-title">
          <SectionTitle id="dashboard-metrics-title">Platform at a glance</SectionTitle>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, note, icon: Icon, tone }) => (
              <Card key={label} className="lms-metric-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{label}</p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{numberFormatter.format(value)}</p>
                    </div>
                    <span className={`lms-metric-icon lms-metric-icon--${tone}`}><Icon className="size-5" /></span>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">{note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
          <CirculationChart dashboard={dashboard} />
          <section>
            <SectionTitle id="dashboard-community-title">Community mix</SectionTitle>
            <Card className="lms-panel-card mt-4 h-[calc(100%-2.25rem)]">
              <CardContent className="flex h-full flex-col items-center justify-center gap-6 p-5 sm:flex-row xl:flex-col">
                <CollectionDonutChart
                  data={roleSegments.map((segment) => ({ name: segment.label, value: segment.count, fill: segment.color }))}
                  total={roleTotal}
                  label="People"
                  size={170}
                  activeIndex={activeIndex}
                  onActiveIndexChange={setActiveIndex}
                />
                <div className="w-full space-y-3">
                  {roleSegments.map((segment, index) => (
                    <div key={segment.label} className={`flex items-center justify-between gap-3 text-sm ${activeIndex !== null && activeIndex !== index ? 'opacity-45' : ''}`}>
                      <span className="flex min-w-0 items-center gap-2 text-muted-foreground"><span className="size-2.5 rounded-full" style={{ backgroundColor: segment.color }} />{segment.label}</span>
                      <strong className="tabular-nums">{numberFormatter.format(segment.count)}</strong>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </section>

        <section aria-labelledby="dashboard-shortcuts-title">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <SectionTitle id="dashboard-shortcuts-title">Keep your LMS moving</SectionTitle>
              <p className="mt-1 text-sm text-muted-foreground">The tools you need to manage learning day to day.</p>
            </div>
            <Button variant="ghost" className="hidden gap-1 text-primary sm:inline-flex" onClick={() => navigate('/admin/courses')}>
              Course catalog <ArrowDown01Icon className="size-4 -rotate-90" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {shortcuts.map(({ label, detail, path, icon: Icon }) => (
              <Card key={label} className="lms-shortcut-card" role="button" tabIndex={0} onClick={() => navigate(path)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') navigate(path); }}>
                <CardContent className="flex h-full items-start gap-4 p-5">
                  <span className="lms-shortcut-icon"><Icon className="size-5" /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                  </div>
                  <ArrowDown01Icon className="mt-1 size-4 -rotate-90 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 id={id} className="text-lg font-semibold tracking-tight">{children}</h2>;
}
