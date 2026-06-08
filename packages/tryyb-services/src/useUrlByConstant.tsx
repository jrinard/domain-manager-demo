import { useQuery } from '@tyto/query'

import { TryybServices } from './types'

export const useUrlByConstantQuery = ({
  services,
  functionID,
  params = {},
  addBaseUrl = true,
}: {
  services: TryybServices
  functionID: string | number
  params?: { [argumentName: string]: string | number | undefined }
  addBaseUrl?: boolean
}) => {
  const query = useQuery({
    queryKey: [
      'tryyb-services-url-by-constant',
      { ...params, constantName: `${functionID || ''}` },
    ],
    queryFn: () =>
      services.getUrlByConstant(`${functionID || ''}`, params, addBaseUrl),
  })

  return query
}
