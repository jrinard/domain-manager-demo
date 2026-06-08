import _ from 'lodash'
import type { MenuConfig } from './types'

export function parseAndValidateTopMenuConfigString(
  configString: string,
): MenuConfig | null {
  try {
    const config = JSON.parse(configString)

    if (!isTopMenuConfig(config)) {
      return null
    }

    return _.pick(config, [
      'version',
      'topButtons',
      'toggleSections',
      'userMenuItems',
      'type',
    ])
  } catch (err) {
    return null
  }
}

export function isTopMenuConfig(config: unknown): config is MenuConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    'version' in config &&
    'topButtons' in config &&
    'toggleSections' in config
  )
}
