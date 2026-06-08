import { useMemo } from 'react'
import axios from 'axios'
import { useBaseOrigins } from '@spacedock/origins'
import { getTryybTopMenuPath, type MenuConfig } from '@domain/configs'

export function useGetDomainTopMenuConfig() {
  const { assetsBaseOrigin } = useBaseOrigins()

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: assetsBaseOrigin,
      }),
    [assetsBaseOrigin],
  )

  return async (domainID: number): Promise<MenuConfig> => {
    if (!domainID) {
      throw new Error('Domain ID is required')
    }

    const path = getTryybTopMenuPath(domainID)

    const response = await axiosInstance.get<MenuConfig>(path)

    return response.data
  }
}
