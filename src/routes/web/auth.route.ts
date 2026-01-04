import { Hono } from 'hono';
import { type Env } from 'hono';
import * as authController from '@/controllers/web/auth.controller';

const app = new Hono<Env>();

app.get('/login', authController.loginView);
app.get('/register', authController.registerView);
app.get('/forgot-password', authController.forgotPasswordView);

export default app;