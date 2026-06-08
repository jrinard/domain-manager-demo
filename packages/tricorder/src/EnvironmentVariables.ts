/// <reference types="vite/client" />
const getValueForKey = (
  key: string,
  options?: { shouldWarn?: boolean; shouldThrow?: boolean },
): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const fromEnv: string | undefined = import.meta.env?.[key]
  if (
    options?.shouldWarn &&
    (fromEnv === undefined || fromEnv?.length < 1) &&
    import.meta.env?.['VITEST'] !== 'true' &&
    import.meta.env?.['TEST'] !== 'true'
  ) {
    // eslint-disable-next-line no-console,no-restricted-syntax
    console.warn(`Missing Environment Variable ${key}`)
  }
  if (options?.shouldThrow && (fromEnv === undefined || fromEnv?.length < 1)) {
    throw new Error(`Missing Required Environment Variable ${key}`)
  }
  return fromEnv
}
export class EnvironmentVariables {
  static get ASP_BASE_URL(): string | undefined {
    return getValueForKey('VITE_ASP_BASE_URL', { shouldWarn: true })
  }
  static get ASSETS_BASE_URL(): string {
    return getValueForKey('VITE_ASSETS_BASE_URL', { shouldWarn: true }) ?? '/'
  }
  static get TYTO_BASE_URL(): string | undefined {
    return getValueForKey('VITE_TYTO_BASE_URL', { shouldWarn: true })
  }

  static get TRYYB_BASE_URL(): string | undefined {
    return getValueForKey('VITE_TRYYB_BASE_URL', { shouldWarn: true })
  }

  static get BASE_URL(): string | undefined {
    return getValueForKey('BASE_URL', { shouldWarn: true })
  }

  static get APP_NAME(): string {
    return getValueForKey('APP_NAME') || ''
  }

  static get VERSION(): string {
    return getValueForKey('APP_VERSION') || 'No.Version'
  }

  static get MASTERY_RUNNING_LOCALLY(): boolean {
    return getValueForKey('MASTERY_RUNNING_LOCALLY') === 'true'
  }

  static get APP_INSIGHTS_CONNECTION_STRING(): string {
    return (
      getValueForKey('VITE_APP_INSIGHTS_CONNECTION_STRING', {
        shouldWarn: true,
      }) || '---'
    )
  }

  static get APP_INSIGHTS_INSTRUMENTATION_KEY(): string {
    return (
      getValueForKey('VITE_APP_INSIGHTS_INSTRUMENTATION_KEY', {
        shouldWarn: true,
      }) || '123'
    )
  }

  static get BUILD_NUMBER(): string {
    return getValueForKey('VITE_BUILD_NUMBER') || 'local'
  }

  static get SPACEDOCK_VERSION(): string {
    return getValueForKey('VITE_SPACEDOCK_VERSION') || '0.0.0'
  }

  static get IS_LOCAL_HOST(): boolean {
    return /^(localhost|192\.168\.(\d)+\.(\d)+)/i.test(window.location.host || '')
  }
}
