import { Context } from 'hono';

/**
 * Helper to get Base URL for assets or links.
 * In Hono/Vite, assets in 'public' are served at root '/'.
 */
export const baseUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
};