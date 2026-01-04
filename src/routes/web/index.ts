import { Hono } from 'hono';
import { type Env } from 'hono';
import authRoutes from './auth.route';
import homeRoutes from './home.route';
import userRoutes from './user.route';

const app = new Hono<Env>();

// Mount Web Routes
app.route('/', homeRoutes);
app.route('/', authRoutes);
app.route('/users', userRoutes);

export default app;