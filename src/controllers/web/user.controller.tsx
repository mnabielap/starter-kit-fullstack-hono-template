import { Context } from 'hono';
import { UserListView } from '@/views/pages/users/index';
import { UserCreateView } from '@/views/pages/users/create';
import { UserEditView } from '@/views/pages/users/edit';

export const indexView = (c: Context) => {
  return c.html(<UserListView />);
};

export const createView = (c: Context) => {
  return c.html(<UserCreateView />);
};

export const editView = (c: Context) => {
  return c.html(<UserEditView />);
};