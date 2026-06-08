import Unfonts from 'unplugin-fonts/vite'
import { PluginOption } from 'vite'
// // import type { Plugin } from 'vite'
import createUnfontsConfig from './createUnfontsConfig'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (): PluginOption[] => {
  const config = Unfonts(createUnfontsConfig())

  return (Array.isArray(config) ? config : [config]) as PluginOption[]
}
