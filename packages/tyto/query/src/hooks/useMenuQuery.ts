import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, Menu } from '@tyto/client'
import { Data, TytoData } from '@spacedock/manifest'

import { parseMenu } from '../utils/parse-menu/parseMenu'

type EndpointArgs = Parameters<typeof Menu.prototype.get>[0]

export interface UseMenuQueryProps extends EndpointArgs {
  disabled?: boolean
}

// type ResponseProps = Awaited<ReturnType<typeof Menu.prototype.get>> & {
type ResponseProps = {
  menuItems: TytoData.MenuItemParsed[]
  session: Data.SessionData
}

type UseUseMenuQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useMenuQuery = ({
  disabled,
  ...args
}: UseMenuQueryProps): UseUseMenuQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.Menu.endpoint, params]

  const query = useQuery<ResponseProps, Error>({
    enabled: !disabled,
    queryKey,
    queryFn: async () => {
      const resp = await tytoClient.Menu.get({ ...params })

      return {
        menuItems: parseMenu(resp.session, resp.menuItems),
        session: resp.session,
      }
    },
  })

  return {
    ...query,
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useMenuQuery
