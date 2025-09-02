import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import fs from 'fs-extra';

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      outDir: 'lib/types',
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
    }),
    {
      name: 'copy-assets',
      closeBundle() {
        // styles
        fs.copySync(
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'lib/styles'),
        );
      },
    },
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src'),
      name: 'ShotzShared',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: 'src', // 从src开始保留
        dir: 'lib', // 输出到lib目录中
        exports: 'named',
      },
      // 开启会使某些纯export的index模块被移除，打包目录结构不能保留下来，故禁用
      treeshake: false,
    },
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, 'src/types.ts'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@icons': path.resolve(__dirname, 'src/icons'),
    },
  },
});
