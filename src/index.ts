import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { swaggerUI } from '@hono/swagger-ui';
import { logger as honoLogger } from 'hono/logger';

import { errorHandler } from '@/middlewares/errorHandler';
import apiRoutes from '@/routes/api';
import webRoutes from '@/routes/web';

// Create instance
const app = new OpenAPIHono();

// --- Global Middlewares ---
app.use('*', honoLogger());
app.use('*', secureHeaders());

// CORS for API only
app.use('/v1/*', cors({
  origin: '*', 
  allowHeaders: ['Content-Type', 'Authorization', 'X-CSRF-TOKEN'],
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  maxAge: 600,
}));

// --- API Routing ---
// All API endpoints are prefixed with /v1
app.route('/v1', apiRoutes);

// --- Web Routing (Frontend) ---
// Root and other UI routes
app.route('/', webRoutes);

// --- OpenAPI Documentation ---
app.doc('/v1/openapi.json', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Hono Fullstack Velzon API',
    description: 'Fullstack Starter Kit with Hono and Velzon UI.',
  },
});

app.get('/ui', swaggerUI({ url: '/v1/openapi.json' }));

// --- Error Handling ---
app.notFound((c) => {
  // If request is for API, return JSON
  if (c.req.path.startsWith('/v1')) {
    return c.json({ code: 404, message: 'Not Found' }, 404);
  }
  // If request is for Web, render 404 Page
  // You can create a specialized 404 view later, for now simple HTML:
  return c.html(`
    <div style="text-align:center; padding: 50px; font-family: sans-serif;">
      <h1 style="color: #405189;">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go to Dashboard</a>
    </div>
  `, 404);
});

app.onError(errorHandler);

export default app;