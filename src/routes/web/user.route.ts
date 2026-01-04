import { Hono } from 'hono';
import { type Env } from 'hono';
import * as userController from '@/controllers/web/user.controller';

const app = new Hono<Env>();

app.get('/', userController.indexView);
app.get('/create', userController.createView);
app.get('/edit', userController.editView);

export default app;