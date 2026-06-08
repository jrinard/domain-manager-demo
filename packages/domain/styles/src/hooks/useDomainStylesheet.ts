import { useMemo } from 'react'
import { useDomainUIQuery, useQuery } from '@tyto/query'
import { useAxiosInstance } from '@spacedock/comlink'
import { EnvironmentVariables } from '@spacedock/tricorder'
import { getTopOrigin } from '@spacedock/origins'
import { ActiveSession } from '@spacedock/cargo-bay'


export function getSafeOrigin() {
  const onCourseURL = ActiveSession.onCourseURL() || ''
  const topOrigin = getTopOrigin()

  const origin =
    !topOrigin || topOrigin === window.location.origin ? onCourseURL : topOrigin

  return origin
}

// // import { getStylesheetFilePath } from '../file-path/getStylesheetFilePath'

export function useDomainStylesheet(domainID: number) {
  const axiosInstance = useAxiosInstance()
  const domainUIQuery = useDomainUIQuery({ domainID, disabled: !domainID })

  const stylesheetPath = useMemo(() => {
    if (!domainUIQuery.data?.domainUI?.images?.length) {
      return undefined
    }

    return domainUIQuery.data?.domainUI?.images.find(
      (img) => img.imageName === 'domainStylesheet',
    )?.pathURL
  }, [domainUIQuery.data])

  return useQuery({
    queryKey: ['domain-stylesheet', { stylesheetPath }],
    enabled: !!stylesheetPath,
    queryFn: async () => {
      const safeOrigin = getSafeOrigin()
      // * Path is to a `.css` file.
      const response = await axiosInstance.get<string>(`${safeOrigin}${stylesheetPath || ''}`, {
        baseURL: EnvironmentVariables.ASSETS_BASE_URL,
      })

      // * Take the response and return the text content of the StyleSheet
      return response.data
    },
  })
}
