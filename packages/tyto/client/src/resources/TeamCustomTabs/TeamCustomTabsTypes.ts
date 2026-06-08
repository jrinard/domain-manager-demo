import { TytoBaseResponse } from '@tyto/manifest'
import { MembersTab } from './types/MembersTabType'

export interface GetParameters {
  teamID: number
  aboutID?: number
  isCascade?: boolean
}

export interface GetResponse extends TytoBaseResponse {
  membersTabs: MembersTab[]
}
