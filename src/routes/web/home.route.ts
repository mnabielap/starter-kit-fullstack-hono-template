import { Hono } from 'hono';
import { type Env } from 'hono';
import * as homeController from '@/controllers/web/home.controller';

const app = new Hono<Env>();

app.get('/', homeController.dashboardView);

export default app;