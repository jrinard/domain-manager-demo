import { TytoBaseResponse } from '@tyto/manifest'
import { Team, ProfileImage } from './types/TeamType'

export interface GetParameters {
  /**
   * @description Show me this team and who is in it
   * @example 551
   */
  teamID: number
}
export interface GetResponse extends TytoBaseResponse {
  profileImages: ProfileImage[]
  team: Team
}

export interface PostParameters {
  /**
   * @description add a subteam of a specific primaryElementID(Domain/Team)
   * @example 551
   */
  address1?: string
  address2?: string
  city?: string
  country?: string
  dateFounded?: string | Date
  email?: string
  fax?: string
  outsideExpirationDate?: string | Date
  outsideType?: string
  phone1?: string
  phone2?: string
  postalCode?: string
  primaryElementID: number
  profileImageID?: number
  state?: string
  teamDesc?: string
  teamLeaderID?: number
  teamLeaderName?: string
  teamLeaderOutsideID?: string
  teamName?: string
  website?: string
}
export interface PostResponse extends TytoBaseResponse {
  recordsAffected: number
  teamID: number
}

export interface PutParameters {
  teamID: number
  teamName?: string
  teamDesc?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  phone1?: string
  phone2?: string
  email?: string
  fax?: string
  profileImageID?: number
  dateFounded?: string
  outsideType?: string
  website?: string
  outsideExpirationDate?: string
  lastRefreshWithOutside?: string
  achievementIconID?: number
  outsideID?: string
}

export interface PutResponse extends TytoBaseResponse {
  recordsAffected: number
}

export interface DeleteParameters {
  teamID: number
  reason?: string
}

export interface DeleteResponse extends TytoBaseResponse {
  recordsAffected: number
}
