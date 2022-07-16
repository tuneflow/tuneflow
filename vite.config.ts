import { defineConfig } from 'vite';

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
      entry: 'src/index.ts',
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
