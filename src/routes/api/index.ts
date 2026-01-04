import { OpenAPIHono } from '@hono/zod-openapi';
import { type Env } from 'hono';
import authRoutes from './auth.route';
import userRoutes from './user.route';

const app = new OpenAPIHono<Env>();

app.route('/auth', authRoutes);
app.route('/users', userRoutes);

export default app;