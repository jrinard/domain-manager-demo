import { TytoBaseResponse } from '@tyto/manifest'
import { TytoData } from '@spacedock/manifest'

/**
 * Use https://app.quicktype.io/
 */
export type GetParameters = Record<string, never>

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  menuItems: TytoData.MenuItemUnparsed[]
}
