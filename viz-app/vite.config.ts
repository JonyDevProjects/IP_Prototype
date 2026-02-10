import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  /* 
   * SECURITY WARNING: 
   * allowedHosts: true is required for Cloudflare Tunnels (Auditing).
   * DO NOT ENABLE THIS IN PRODUCTION builds if exposing to public internet directly.
   */
  server: {
    allowedHosts: true,
    host: true,
  },
} as any);
