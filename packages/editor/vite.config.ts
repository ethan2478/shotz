import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@shotz/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.build.json',
    }),
    react(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src'), // 入口文件
      name: 'ShotzEditor', // UMD 全局变量名
      fileName: format => `index.${format}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'index',
    },
    rollupOptions: {
      // 不打包进库的依赖
      external: ['react', 'react-dom'],
    },
  },
});
