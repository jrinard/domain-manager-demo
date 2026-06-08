import { axiosInstance } from '../axios'

import { getTryybStartConfigPath } from './getTryybStartConfigPath'

import type { TryybStartConfig } from './types'

export async function readTryybStartConfig(domainID: number) {
  if (!domainID) {
    throw new Error('Domain ID is required')
  }

  const path = getTryybStartConfigPath(domainID)

  const response = await axiosInstance.get<TryybStartConfig>(path)

  return response.data
}
