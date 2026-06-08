import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  catalogID: number
}

export interface GetResponse extends TytoBaseResponse {
  catalogPermisssions: CatalogPermission[]
}

export interface CatalogPermission {
  catalogID: number
  catalogName: string
  catalogType: string
  CatalogItemType: string
  CatalogPathIDs: string
  CatalogPathName: string
  personID: number
  personName: string
  outsideTerminateDate: string
  outsideType: string
  hasView: boolean
  hasAdd: boolean
  hasChange: boolean
  hasDelete: boolean
  hasShare: boolean
  modifiedByID: number
  modifiedBy?: { memberName: string }
  modifiedDate: string
}

export interface PutParameters {
  catalogID: number
  virtualUnnested?: boolean
  strikeName?: boolean
  restrictedView?: boolean
  restrictedAdd?: boolean
  restrictedChange?: boolean
  restrictedDelete?: boolean
  restrictedShare?: boolean
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: -1
}
