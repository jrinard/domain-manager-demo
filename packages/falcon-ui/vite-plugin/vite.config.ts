/// <reference types="vitest" />
import { defineConfig } from 'vite'

// * import viteTsConfigPaths from 'vite-tsconfig-paths'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

import dts from 'vite-plugin-dts'
import * as path from 'path'

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/falcon-ui-vite-plugin',
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'falcon-ui-vite-plugin',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },
})
