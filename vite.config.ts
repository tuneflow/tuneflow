import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  root: __dirname,
  envDir: process.cwd(),
  esbuild: {
    drop: ['debugger', 'console'],
  },
  build: {
    target: `chrome100`,
    outDir: 'dist',
    assetsDir: '.',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
    emptyOutDir: false,
  },
});
