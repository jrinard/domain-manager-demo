import { TytoBaseResponse } from '@tyto/manifest'
import { MembersTab } from './types/MembersTabType'

export interface GetParameters {
  personID: number
}

export interface GetResponse extends TytoBaseResponse {
  membersTabs: MembersTab[]
}
