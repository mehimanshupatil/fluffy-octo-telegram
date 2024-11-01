import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import progress from 'vite-plugin-progress';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import dns from 'node:dns';
dns.setDefaultResultOrder('verbatim');

const isDev = process.env.NODE_ENV === 'development';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    progress(),
    checker({
      typescript: true,
    }),
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    visualizer({
      open: true,
      gzipSize: true,
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    open: !true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,

  },
  css: {
    modules: {
      generateScopedName: isDev
        ? '[name]__[local]___[hash:base64:5]'
        : '[local]_[hash:base64:5]',
    },
  },
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ],
  },
});
