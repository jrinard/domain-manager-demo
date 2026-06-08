import { TytoBaseResponse } from '@tyto/manifest'
import { Role } from './types/RoleTypes'

export interface GetParameters {
  roleID: number
}
export interface GetResponse extends TytoBaseResponse {
  role: Role
}

export interface PostParameters {
  teamRoot: number
  roleName: string
  roleDesc?: string
}
export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  roleID: number
}

export interface PutParameters {
  roleID: number
  teamRoot?: number
  roleName?: string
  roleDesc?: string
}
export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface DeleteParameters {
  roleID: number
}
export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
