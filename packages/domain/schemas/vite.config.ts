/// <reference types='vitest' />
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/@domain/schemas',

  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    nxViteTsPaths(),
  ],

  // Configuration for building your library.
  build: {
    outDir: '../../../dist/packages/domain/schemas',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: '@domain/schemas',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled
      external: ['zod', '@spacedock/data-validation'],
    },
  },

  // @ts-expect-error - Vitest config is valid but types don't recognize it in Vite 6
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/packages/domain/schemas',
      provider: 'v8',
    },
  },
})
