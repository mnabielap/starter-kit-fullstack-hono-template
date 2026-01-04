import { Context } from 'hono';
import { LoginView } from '@/views/pages/auth/login';
import { RegisterView } from '@/views/pages/auth/register';

export const loginView = (c: Context) => {
  return c.html(<LoginView />);
};

export const registerView = (c: Context) => {
  return c.html(<RegisterView />);
};

export const forgotPasswordView = (c: Context) => {
  return c.text('Forgot Password View - To be implemented');
};