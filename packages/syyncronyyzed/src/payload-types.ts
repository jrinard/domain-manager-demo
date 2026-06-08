/**
 * @description This file is meant to export means
 * of enforcing type safety on payloads passed for
 * Common Messages across Applications
 */

interface ConfigurationResponsePayload {
  apiHostname: string
  appInsightsConnectionString: string
  uploadURLs?: string[]
}

export function createConfigurationResponsePayload(
  data: Partial<ConfigurationResponsePayload>
): ConfigurationResponsePayload {
  return {
    apiHostname: '',
    appInsightsConnectionString: '',
    uploadURLs: [],
    ...data,
  }
}

interface StorePropertiesResponsePayload {
  properties: { [propertyName: string]: unknown }
}

export function createStorePropertiesResponsePayload(
  data: StorePropertiesResponsePayload
): StorePropertiesResponsePayload {
  return {
    ...{ properties: {} },
    ...data,
  }
}

interface StoredPropertiesResponsePayload {
  updatedPropertyNames: string[]
  newProperties: { [propertyName: string]: unknown }
}

export function createStoredPropertiesResponsePayload(
  data: StoredPropertiesResponsePayload
): StoredPropertiesResponsePayload {
  return {
    ...{ updatedPropertyNames: [], newProperties: {} },
    ...data,
  }
}

interface ParentSessionResponsePayload {
  sessionKey: string
  userID: number
}

export function createParentSessionResponsePayload(
  data: ParentSessionResponsePayload
): ParentSessionResponsePayload {
  return {
    ...{ sessionKey: '', userID: 0 },
    ...data,
  }
}
