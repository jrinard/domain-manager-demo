import { TytoBaseResponse } from '@tyto/manifest'
import { DiscProfile, Permit } from './entities'

/**
 * Use https://app.quicktype.io/
 */
export interface GetParameters {
  teamID?: number
  emails?: string[]
  personIDs?: number[]
  isCascade?: boolean
}

/**
 * Use https://app.quicktype.io/
 */
export type GetResponse = TytoBaseResponse & {
  discProfiles: DiscProfile[]
  permit: Permit
}
