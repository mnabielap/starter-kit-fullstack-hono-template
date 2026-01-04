import { Context } from 'hono';
import { DashboardView } from '@/views/pages/dashboard/index';

export const dashboardView = (c: Context) => {
  return c.html(<DashboardView />);
};