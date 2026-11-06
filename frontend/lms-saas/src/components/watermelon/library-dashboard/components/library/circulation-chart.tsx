import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type DashboardTotals = {
  totalUsers?: number;
  totalStudents?: number;
  totalInstructors?: number;
  totalCourses?: number;
  totalEnrollments?: number;
};

const chartConfig = {
  count: { label: 'Records', color: '#21664d' },
} satisfies ChartConfig;

export function CirculationChart({ dashboard }: { dashboard: DashboardTotals }) {
  const data = [
    { label: 'Learners', count: dashboard.totalStudents ?? 0 },
    { label: 'Enrollments', count: dashboard.totalEnrollments ?? 0 },
    { label: 'Courses', count: dashboard.totalCourses ?? 0 },
    { label: 'Instructors', count: dashboard.totalInstructors ?? 0 },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Learning platform totals</h2>
        <p className="mt-1 text-sm text-muted-foreground">Current records from your LMS.</p>
      </div>
      <Card className="lms-panel-card h-[calc(100%-3.5rem)]">
        <CardContent className="p-4 sm:p-6">
          <ChartContainer config={chartConfig} className="h-[290px] w-full">
            <BarChart data={data} layout="vertical" margin={{ left: 4, right: 18, top: 4, bottom: 4 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} width={96} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} barSize={24} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
}
