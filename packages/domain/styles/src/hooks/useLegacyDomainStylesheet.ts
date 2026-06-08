import { useQuery } from '@tyto/query'
import { useAxiosInstance } from '@spacedock/comlink'
import { getLegacyStylesheetFilePath } from '../file-path/getStylesheetFilePath'

export function useLegacyDomainStylesheet(domainID: number) {
  const axiosInstance = useAxiosInstance()

  return useQuery({
    queryKey: ['domain-stylesheet-legacy', domainID],
    queryFn: async () => {
      // * Path is to a `.css` file.
      const response = await axiosInstance.get(
        getLegacyStylesheetFilePath(domainID),
      )

      // * Take the response and return the text content of the StyleSheet
      return response.data.text()
    },
  })
}
