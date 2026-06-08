import type { HomeConfig } from './types'

export function parseAndValidateHomeConfigString(
  configString: string,
): HomeConfig | null {
  try {
    const config = JSON.parse(configString)
    return isHomeConfig(config) ? config : null
  } catch (err) {
    return null
  }
}

export function isHomeConfig(config: unknown): config is HomeConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    'config_version' in config &&
    'id' in config &&
    'layout' in config &&
    'sections' in config
  )
}
