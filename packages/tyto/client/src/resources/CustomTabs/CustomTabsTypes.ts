import { TytoBaseResponse } from '@tyto/manifest'
import { Tab } from './types/TabType'

export interface GetParameters {
  domainID: number
  activeStatus?: string
}

export interface GetResponse extends TytoBaseResponse {
  tabs: Tab[]
}
