import { TytoResponseNonGet } from '../typings'
import { Resource } from '../utils/helpers'
import { getCall, CallOpts, postUrlEncodedFormCall } from '../utils/utils'
import type { Endpoints } from '../typings'

const ASP_COMMANDS = {
  markRead: 'markRead',
  markUnread: 'markUnread',
  setStar: 'setStar',
} as const

const PATH = '/v25/nl/components/inbox/functions.vb.asp'

/**
 * Has no direct verbs
 */
export default class ASP extends Resource {
  Conversation!: ASPInboxNoticeItem
  Conversations!: ASPInboxNotices
  Badge!: Badge

  protected override addResources(): void {
    this.Conversation = new ASPInboxNoticeItem(this.axiosInstance)
    this.Badge = new Badge(this.axiosInstance)
  }
}

/**
 * SINGLE CONVERSATION NAMESPACE ----
 * Has no direct verbs
 */
export class ASPInboxNoticeItem extends Resource {
  Star!: ASPInboxStar
  ToggleReadStatus!: InboxReadStatus

  protected override addResources(): void {
    this.Star = new ASPInboxStar(this.axiosInstance)
    this.ToggleReadStatus = new InboxReadStatus(this.axiosInstance)
  }
}

/**
 * MULTIPLE CONVERSATIONS NAMESPACE ----
 * Has no direct verbs
 */
export class ASPInboxNotices extends Resource {
  ToggleReadStatus!: InboxMultipleReadStatus

  protected override addResources(): void {
    this.ToggleReadStatus = new InboxMultipleReadStatus(this.axiosInstance)
  }
}

/**
 * STARRING A CONVERSATION
 * Has no direct verbs
 */
interface InboxStarPutParameters {
  command?: typeof ASP_COMMANDS.setStar
  noticeID: number
  isCritical: boolean
}

export class ASPInboxStar extends Resource {
  override endpoint = PATH

  async put(
    params: InboxStarPutParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    // * NOTE: This .asp returns nothing on success, not even a 'recordsAffected: -1` 🤷‍♂️
    const result = await getCall<TytoResponseNonGet>(
      this.axiosInstance,
      this.endpoint,
      {
        command: ASP_COMMANDS.setStar,
        ...params,
      },
      {
        axiosConfig: {
          baseURL: this.axiosInstance.defaults.baseURL?.replace(
            '/tyto/api',
            '',
          ),
          ...callOpts?.axiosConfig,
        },
        ...callOpts,
      },
    )
    // * Mimicing Tyto where a non-0 `resp.recordsAffected` means success
    result.recordsAffected = -1
    return result
  }
}

/**
 * TOGGLING READ STATUS ON 1 CONVERSATION
 * Has no direct verbs
 */
interface InboxReadStatusPutParameters {
  command?: typeof ASP_COMMANDS.markRead | typeof ASP_COMMANDS.markUnread
  noticeID: number
  isNew: boolean
  noticeIDs?: number[]
}

interface InboxReadStatusPutResponse extends TytoResponseNonGet {
  errors: {
    noticeID: number
  }[]
  success: {
    noticeID: number
  }[]
}

export class InboxReadStatus extends Resource {
  override endpoint = PATH

  async put(
    params: InboxReadStatusPutParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ): Promise<TytoResponseNonGet> {
    const result = await getCall<InboxReadStatusPutResponse>(
      this.axiosInstance,
      this.endpoint,
      {
        command: params.isNew ? ASP_COMMANDS.markUnread : ASP_COMMANDS.markRead,
        checkedMsgs: params.noticeID,
      },
      {
        axiosConfig: {
          baseURL: this.axiosInstance.defaults.baseURL?.replace(
            '/tyto/api',
            '',
          ),
          ...callOpts?.axiosConfig,
        },
        ...callOpts,
      },
    )
    // * Mimicing Tyto where a non-0 quantity for `resp.recordsAffected` represents how many items were successfully updated as requested.
    result.recordsAffected = result.success?.length || 0
    return result
  }
}

/**
 * TOGGLING READ STATUS ON 1+ CONVERSATION(S)
 * Has no direct verbs
 */
//
interface InboxMultipleReadStatusPutParameters {
  command?: typeof ASP_COMMANDS.markRead | typeof ASP_COMMANDS.markUnread
  noticeIDs: number[]
  isNew: boolean
}

export class InboxMultipleReadStatus extends Resource {
  override endpoint = PATH

  put(
    params: InboxMultipleReadStatusPutParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    return getCall<InboxReadStatusPutResponse>(
      this.axiosInstance,
      this.endpoint,
      {
        command: params.isNew ? ASP_COMMANDS.markRead : ASP_COMMANDS.markUnread,
        checkedMsgs: params.noticeIDs.join(','),
      },
      {
        axiosConfig: {
          baseURL: this.axiosInstance.defaults.baseURL?.replace(
            '/tyto/api',
            '',
          ),
          ...callOpts?.axiosConfig,
        },
        ...callOpts,
      },
    )
  }
}

//*
//* BADGE ENDPOINTS
//*

const BADGEPATH = '/mobile/badge'

interface BaseParams {
  domainID?: number
  activeStatus?: string
}

interface ListBadgesParams extends BaseParams {
  command: 'listbadges'
  domainID?: number
  activeStatus: string
}

export interface AddBadgeParams extends BaseParams {
  command: 'addbadge'
  primaryElementID: number
  badgeName: string
  badgeDesc: string
  outsideID: string
}

interface AddBadgeAssetParams extends BaseParams {
  command: 'addbadgeasset'
  tempFileName: string
  badgeID: number
  encoding?: string
}

interface UpdateBadgeParams extends BaseParams {
  command: 'updatebadge'
  badgeID: number
  badgeName: string
  badgeDesc: string
  outsideID?: string
  shareViewWithDomain?: number
}

interface DeleteBadgeParams extends BaseParams {
  command: 'deletebadge'
  badgeID: number
}

interface AwardBadgeParams extends BaseParams {
  command: 'awardbadge'
  badgeID: number
  elementID: number
}

interface DeleteAwardedBadgeParams extends BaseParams {
  command: 'deleteawardedbadge'
  badgeID: number
  elementID: number
}

interface ListBadgesAwardedParams extends BaseParams {
  command: 'listbadgesawarded'
  elementIDs: number
  sort1?: string
  sort2?: string
  sort3?: string
}

interface SetElementBadgeSequenceParams extends BaseParams {
  command: 'setelementbadgesequence'
  badgeID: number
  sequence: number
}

interface ListElementsAwardedParams extends BaseParams {
  command: 'listelementsawarded'
  badgeID: number
}

interface GetBadgeParams extends BaseParams {
  command: 'getbadge'
  badgeID: number
}

export type BadgeCommandParameters =
  | ListBadgesParams
  | AddBadgeParams
  | AddBadgeAssetParams
  | UpdateBadgeParams
  | DeleteBadgeParams
  | AwardBadgeParams
  | DeleteAwardedBadgeParams
  | ListBadgesAwardedParams
  | SetElementBadgeSequenceParams
  | ListElementsAwardedParams
  | GetBadgeParams

export interface BadgePostResponse extends TytoResponseNonGet {
  elements?: Element[]
  badgeID?: number
  asset?: BadgeAsset
  badge?: number
  badges?: BadgeType[]
  Badges?: BadgeType[]
  errors: {
    sts: number
    msg: string
  }[]
}

interface Element {
  badgeID: number
  awardedDate: string
  elementID: number
  elementName: string
  elementDesc: string
  elementType: string
  elementSubType: string
}

interface BadgeAsset {
  id: number
  name: string
  size: number
  status: string
  uploadedByName: string
  uploadedDate: string
}

interface BadgeType {
  ModifiedBy: number
  ModifiedDate: string
  activeStatus: string
  badgeDesc: string
  badgeID: number
  badgeName: string
  badgeType: string
  createdBy: number
  createdDate: string
  domainID: number
  hasAddShare: boolean
  hasChange: boolean
  hasDelete: boolean
  outsideID: string
  primaryElementID: number
  shareViewWithDomain: number
}

export class Badge extends Resource {
  override endpoint = BADGEPATH

  post(
    params: BadgeCommandParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    return getCall<BadgePostResponse>( //Get is needed for create to work.
      this.axiosInstance,
      this.endpoint,
      {
        ...params,
      },
      {
        axiosConfig: {
          baseURL: this.axiosInstance.defaults.baseURL?.replace(
            '/tyto/api',
            '',
          ),
          ...callOpts?.axiosConfig,
        },
        ...callOpts,
      },
    )
  }
  postForm(
    params: BadgeCommandParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    return postUrlEncodedFormCall<BadgePostResponse, any>(
      this.axiosInstance,
      this.endpoint + '/',
      {
        ...params,
      },
      {
        axiosConfig: {
          baseURL: this.axiosInstance.defaults.baseURL?.replace(
            '/tyto/api',
            '',
          ),
          ...callOpts?.axiosConfig,
        },
        ...callOpts,
      },
    )
  }

  get(
    params: BadgeCommandParameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ) {
    return getCall<BadgePostResponse>(
      this.axiosInstance,
      this.endpoint,
      {
        ...params,
      },
      {
        axiosConfig: {
          baseURL: this.axiosInstance.defaults.baseURL?.replace(
            '/tyto/api',
            '',
          ),
          ...callOpts?.axiosConfig,
        },
        ...callOpts,
      },
    )
  }
}
