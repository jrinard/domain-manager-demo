import { TytoBaseResponse } from '@tyto/manifest'
import { StartStats } from './entityTypes'

export interface GetResponse extends TytoBaseResponse {
  startStats: StartStats
  cacheDate: string
}

export interface GetRequest {
  teamID?: number
}
