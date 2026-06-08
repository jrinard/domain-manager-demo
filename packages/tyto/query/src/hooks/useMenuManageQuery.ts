import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, MenuManage } from '@tyto/client'
import { Data, TytoData } from '@spacedock/manifest'
import { parseMenu } from '../utils/parse-menu/parseMenu'

type EndpointArgs = Parameters<typeof MenuManage.prototype.get>[0]

export type UseMenuManageQueryProps = {
  disabled?: boolean
}

type UnparsedResponseProps = {
  menuItems: TytoData.MenuItemUnparsed[]
  session: Data.SessionData
}

type ResponseProps = {
  menuItems: TytoData.MenuItemParsed[]
  session: Data.SessionData
}

type UseUseMenuManageQueryQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useMenuManageQuery = ({
  disabled,
  ...args
}: UseMenuManageQueryProps): UseUseMenuManageQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [tytoClient.MenuManage.endpoint, params]

  const query = useQuery<ResponseProps, Error>({
    enabled: !disabled,
    queryKey,
    queryFn: async () => {
      const resp = (await tytoClient.MenuManage.get({
        ...params,
      })) as unknown as UnparsedResponseProps

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

export default useMenuManageQuery
