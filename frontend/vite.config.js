import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Proxy API requests to backend server
    },
    historyApiFallback: true, // Enable fallback for SPA routing
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Avoid multiple chunks for simplicity
      },
    },
  },
});

