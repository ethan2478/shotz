import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shotz/editor': path.resolve(__dirname, '../../editor/src'),
      '@shotz/shared': path.resolve(__dirname, '../../shared/src'),
    },
  },
});
