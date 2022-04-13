import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  root: __dirname,
  envDir: process.cwd(),
  build: {
    target: `chrome100`,
    outDir: 'dist',
    assetsDir: '.',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
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
    brotliSize: false,
  },
});
