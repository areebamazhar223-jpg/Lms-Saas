import type { ComponentType, SVGProps } from 'react';

import {
  CatalogIcon,
  DashboardIcon,
  IntelligenceIcon,
  MembersIcon,
  ReportsIcon,
} from './components/library/icons';

export type NavigationIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  label: string;
  href: string;
  icon: NavigationIcon;
  section: string;
  subItems?: {
    label: string;
    href: string;
    icon: NavigationIcon;
  }[];
};

export const primaryNavigation: NavigationItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: DashboardIcon, section: 'dashboard' },
  { label: 'Courses', href: '/admin/courses', icon: CatalogIcon, section: 'courses' },
  { label: 'Learners', href: '/admin/users', icon: MembersIcon, section: 'users' },
  { label: 'Instructors', href: '/admin/instructors', icon: MembersIcon, section: 'instructors' },
  { label: 'Analytics', href: '/admin/analytics', icon: ReportsIcon, section: 'analytics' },
  { label: 'Enrollments', href: '/admin/enrollments', icon: IntelligenceIcon, section: 'enrollments' },
  { label: 'Settings', href: '/admin/settings', icon: ReportsIcon, section: 'settings' },
];

export const organizations = ['LearnSmart LMS'] as const;

export const topNavNotifications = [] as const;
