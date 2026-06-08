import { TytoBaseResponse } from '@tyto/manifest'
import { PlatformReviewTeam } from './types/PlatformReviewTeamType'

/**
 * Use https://app.quicktype.io/
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetParameters {
  // nothing required other than sessionKey
}

/**
 * Use https://app.quicktype.io/
 */
export interface GetResponse extends TytoBaseResponse {
  platformReviewTeams: PlatformReviewTeam[]

  /**
   * Basically this means they are an owner
   */
  hasAddTeamPlatformReview: boolean
}
