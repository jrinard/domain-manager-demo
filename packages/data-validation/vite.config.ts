/// <reference types='vitest' />
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/data-validation',

  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    nxViteTsPaths(),
  ],

  // Configuration for building your library.
  build: {
    outDir: '../../dist/packages/data-validation',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: '@spacedock/data-validation',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled
      external: ['zod'],
    },
  },

  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/data-validation',
      provider: 'v8',
    },
  },
})
