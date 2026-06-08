import { TytoBaseResponse } from '@tyto/manifest'
import { PWSession, Domain } from './types/LoginResetPasswordValidateTypes'

export interface GetResponse extends TytoBaseResponse {
  domain: Domain
  pwSession: PWSession
  logonName: string
}
