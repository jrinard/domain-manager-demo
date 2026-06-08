import type { Data, TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.MENU

export class Menu extends Resource {
  get(params: Endpoints.Tyto.Menu.GetParameters, callOpts?: CallOpts) {
    return getCall<{
      menuItems: TytoData.MenuItemUnparsed[]
      session: Data.SessionData
    }>(this.axiosInstance, endpoint, { ...params }, callOpts)
  }
}
