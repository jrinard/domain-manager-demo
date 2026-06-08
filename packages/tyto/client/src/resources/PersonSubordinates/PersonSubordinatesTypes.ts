import { TytoBaseResponse } from '@tyto/manifest'
import { Subordinate } from './types/SubordinateTypes'

export interface GetParameters {
  managerPersonID: number
}

export interface GetResponse extends TytoBaseResponse {
  subordinates: Subordinate[]
}
