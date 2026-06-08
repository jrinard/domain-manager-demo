/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'node:path'
export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/@tyto/msw',
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      // * skipDiagnostics: true,
    }),
    react(),
    nxViteTsPaths(),
    nodePolyfills(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../../dist/packages/tyto/msw',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: '@tyto/msw',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/test-setup.ts'),
      ],
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/packages/tyto/msw',
      provider: 'v8',
    },
    globals: true,    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
