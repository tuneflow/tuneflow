import { defineConfig } from 'vite';

// Config for building distribution to be used in server(nodejs) environment.
// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  root: __dirname,
  envDir: process.cwd(),
  esbuild: {
    drop: ['debugger', 'console'],
  },
  build: {
    target: `node14`,
    outDir: 'dist',
    assetsDir: '.',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].server.js',
      },
    },
    emptyOutDir: false,
  },
});
