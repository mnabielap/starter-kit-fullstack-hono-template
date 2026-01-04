import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    build({
      entry: 'src/index.ts',
    }),
    devServer({
      adapter,
      entry: 'src/index.ts',
      exclude: [
        /^\/assets\/.+/,
        /^\/js\/.+/,
        /^\/favicon\.ico$/,
        /.*\.woff2?(\?.*)?$/,
        /.*\.ttf(\?.*)?$/,
        /.*\.png$/,
        /.*\.jpg$/,
        /.*\.svg$/,
        /.*\.css$/,
        /.*\.js$/
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
})