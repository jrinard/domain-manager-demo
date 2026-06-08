import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'node:path'

export default defineConfig({
  root: __dirname,
  base: '/',
  server: {
    port: 4400,
    host: 'localhost',
    fs: { allow: ['.'] },
  },
  preview: {
    port: 4400,
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@interfaces/team-editor': resolve(__dirname, 'src/stubs/team-editor.tsx'),
    },
  },
  plugins: [
    react(),
    viteTsConfigPaths({
      root: resolve(__dirname),
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
