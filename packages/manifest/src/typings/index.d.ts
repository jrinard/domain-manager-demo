import type { TytoData } from './data'

export interface TytoBaseResponse {
  session?: Data.SessionData
  error: Data.TytoErrorObject
  links: Link[]
}

export interface Session {
  adminID: number
  changePassword: boolean
  domainID: number
  koPermissionSyncDate: Date | string
  profileThumbPath?: string
  roleID: number
  // TODO: What is the rule for when it is returned and when it is not
  sessionKey?: string
  teamRootID?: number
  teamListSyncDate: Date | string
  termsOfServiceSignatureRequired: boolean
  timeOutMnts: number
  userID: number
  userName: string
  onCourseURL?: string
  onlinePreference?: 'ocAVAILABLE' | 'ocVACANT'
  // * NOTE: 'oAuthResult' NEVER comes from The back end, it is a client side
  // * NOTE: mutation of the object to include oAuthResult data.
  // * NOTE: see '/routing/special-interfaces/OAuthResult.tsx'
  oAuthResult?: TytoData.OAuthResult.ThinSkippy.Result
  oAuthState?: TytoData.OAuthResult.ThinSkippy.AuthRequestState
}

export namespace Data {
  enum LessonImageType {
    thumbnailOverride = 'thumbnailOverride',
  }

  interface Asset {
    assetDesc: string
    assetID: number
    assetName: string
    assetType: TytoData.AssetType
    courseItemID: number
    createdByID: number
    createdByName: string
    createdDate: string
    domainID: number
    encodings: Data.Encoding[]
    modifiedByID: number
    modifiedDate: string
    orientation: string
    originalMD5: string
    sequence: number
    softwareRequirements: string
  }

  interface Attachment {
    noticeAttachmentID: number
    noticeID: number
    commentID: number
    aboutID: number
    aboutType: 'ocLESSON'
    name: string
    activeStatus: 'ocENABLED'
    aboutSubType: 'ocPHOTOALBUM' | 'ocDOCUMENT' | 'ocURL' | 'ocVIDEO'
    assets: Asset[]
  }

  interface Comment {
    commentID: number
    /**
     * What notice it belongs to
     */
    noticeID: number
    commentText: string
    userID: number
    createdDate: string
    activeStatus: 'ocENABLED' | 'ocDRAFT'
    attachments?: Attachment[]
    /**
     * Rare
     */
    ratingMemberLiked?: number
    /**
     * Rare
     */
    ratingSumLiked?: number
    /**
     * Rare
     */
    ratings?: Array<{
      userID: number
      modifiedDate: string
      aboutType: string
      aboutID: number
      rating: number
      ratingType: string
    }>
    /**
     * @deprecated Tyto API has deprecated this property
     */
    userName?: string
    /**
     * Rare
     */
    modifiedDate?: string
  }

  namespace Notice {
    interface Participant {
      outsideTerminateDate: string
      isAbsent: boolean
      profileImage?: Data.ProfileImageAsset
      name: string
      locID: number
      ocType: 'ocPERSON'
      elementID: number
      elementName: string
      elementType: 'ocPERSON'
      elementSubType: 'ocITEM'
      activeStatus: keyof typeof TytoData.ActiveStatus
    }
  }

  interface NoticeMember {
    emailPreference: 'ocINSTANT' | 'ocDAILYDIGEST' | 'ocWEEKLY' | 'ocVACANT'
    lastComment: string
    lastDraft: string
    recentUnread: string
    element: {
      activeStatus: 'ocENABLED' | 'ocDISABLED'
      elementID: number
      elementName: string
      elementType: 'ocPERSON' | 'ocTEAM'
      profilePhoto?: {
        domainID: number
        thumbnailPath?: string
      }
    }
  }

  /**
   * When this the signature (type) of the `about` property for a Notice then this is the shared properties.
   */
  interface ConversationNoticeAbout {
    aboutID: number
    aboutType: string
    actionType: 'ocNewThread' | string
    activeStatus: 'ocENABLED' | 'ocDISABLED' | 'ocARCHIVE' | 'ocDRAFT'
    attachmentCount: number
    commentCount: number
    commentCountNew: number
    isCritical: false
    locID: number
    members: Data.NoticeMember[]
    name: string
    noticeDate: string
    noticeID: number
    noticeText: string
    noticeType: 'ocPrivateThread' | string
    ocType: 'ocNOTICE' | string
  }

  /**
   * The properties at this level should be considered as the session user's view.
   * For instance, activeStatus at this level (vs in the sibling property `about`)
   *   is the current user's activeStatus.
   */
  export interface ConversationsNotice {
    hasDraft?: boolean
    /**
     * The property where Conversation properties shared by all users is found.
     */
    about: ConversationNoticeAbout
    /**
     * Public ID
     */
    aboutID: number
    aboutType: 'ocNOTICE' | string
    actionType: 'ocReply' | string
    activeStatus: 'ocENABLED' | 'ocDISABLED' | 'ocARCHIVE'
    catalogIDs?: number[]
    fromElementID: number
    functionID: number
    isCascade: boolean
    isCritical: boolean
    isNew: boolean
    lastCommentDate?: string
    locID: number
    name: string
    noticeDate: string
    /**
     * Private ID
     */
    noticeID: number
    noticeText: string
    noticeType: 'ocPrivateIN' | string
    ocType: 'ocNOTICE'
    param1: string
    param2: string
    param3: string
    param4: string
    sortDate?: string
    toElementID: number
    toElementType?: 'ocPERSON' | 'ocTEAM'
  }

  interface ConversationNotice extends Data.ConversationsNotice {
    comments: Data.Comment[]
  }

  interface PersonNotice {
    noticeID: number
    noticeType: string
    actionType: string
    toElementID: number
    fromElementID: number
    noticeDate: string
    isNew: boolean
    isCritical: boolean
    isCascade: boolean
    aboutType: string
    aboutID: number
    functionID: number
    param1: string
    param2: string
    param3: string
    param4: string
    lastCommentDate: string
    sortDate: string
    activeStatus: string
    toElementType: string
    changeAccess: boolean
    deleteAccess: boolean
    from: {
      userID: number
      personName: string
      profileImageAsset: Data.ProfileImageAsset
    }
    presentationText: string
  }

  export interface InboxCategoryChildItem {
    about: Data.ConversationsNotice
    activeStatus: 'ocENABLED' | 'ocDISABLED'
    catalogID: number
    catalogItemID: number
    catalogItemSubType: 'ocPrivateIN' | string
    catalogItemType: 'ocNOTICE' | string
    catalogType: 'ocINBOX'
    createdByID: number
    createdDate: string
    description: ''
    domainID: number
    hasAdd: boolean
    hasChange: boolean
    hasDelete: boolean
    locID: number
    modifiedByID: number
    modifiedDate: string
    name: string
    ocType: 'ocELEMENT'
    outsideID: string
    parentCatalogID: number
    pathIDs: string
    pathName: string
    primaryElementID: number
    primaryElementTreeSerialLeft: number
    siblingSeq: number
    thumbnailPath: ''
    sortDate?: string
  }

  export interface InboxCategory {
    childContainers: Data.InboxCategory[] // TODO
    childItems: InboxCategoryChildItem[] // TODO
    images: TytoData.LessonImage[]
    catalogID: number
    description: string
    catalogType: 'ocINBOX'
    parentCatalogID: number
    primaryElementTreeSerialLeft: number
    pathName: string
    pathIDs: string
    thumbnailPath: string
    catalogItemID: number
    catalogItemType: 'ocCATALOG'
    catalogItemSubType: 'ocCONTAINER'
    hasChange: boolean
    hasAdd: boolean
    hasDelete: boolean
    siblingSeq: number
    name: string
    locID: number
    ocType: string
    domainID: number
    outsideID: string
    createdByID: number
    createdDate: string
    primaryElementID: number
    modifiedByID: number
    modifiedDate: string
    activeStatus: 'ocENABLED' | 'ocDISABLED'
  }

  namespace AdvancedPersonSearch {
    interface Person {
      activeStatus: keyof typeof TytoData.ActiveStatus
      createdDate: string
      createdby: number
      department: string
      domainID: number
      domainName: string
      elementSubType: keyof typeof TytoData.ElementSubType
      elementType: 'ocPERSON'
      email: string
      familiarName: string
      familyName: string
      firstActivity: string
      givenName: string
      jobTitle: string
      lastActivity: string
      modifiedDate: string
      modifiedby: number
      outsideActiveStatus: string
      outsideID: string
      outsideJoinDate: string
      outsideModifiedDate: string
      outsideRenewalDate: string
      outsideTerminateDate: string
      outsideType: string
      phone1: string
      phone2: string
      primaryElementID: number
      primaryElementName: string
      primaryElementType: keyof typeof TytoData.TeamType
      roleID: number
      teamRootID: number
      telecom: any[]
      userID: number
    }
  }

  interface DISCProfileMini {
    d3: number
    i3: number
    s3: number
    c3: number
    d2: number
    i2: number
    s2: number
    c2: number
    d1: number
    i1: number
    s1: number
    c1: number
    discOptOut: keyof typeof TytoData.DiscOptOut
    discStatus: keyof typeof TytoData.DISCStatus
    domainID: number
    domainName: string
    emails: string[]
    descriptionGeneral: string
    graphic: string // TODO
    isTeamLeader?: boolean
    jobTitle: string
    lastActivity?: string
    pdfLessonID: number
    personID: number
    personName: string
    permitMatrix: TytoData.PermitMatrix
    phone1: string
    primaryElementID: number
    profileImageAsset: Asset
    profileImageID: number
    styleKey3: string
    styleName3: string
    teamRoot: number
    teamToolsInviteEmail?: any // TODO
    teamToolsPermit: any // TODO
  }

  interface Encoding {
    activeStatus: 'ocENABLED' | 'ocDISABLED' | 'ocTRANSCODE99'
    encodingType: keyof typeof TytoData.EncodingType
    height: number
    length: number
    mimeType: string
    modifiedDate: string
    pathURL: string
    sizeBytes: number
    techNote?: string
    width: number
  }

  interface Permission {
    hasChangeDelegate: boolean
    hasChangeExpectation: boolean
    hasChangeStatus: boolean
    hasChangeStructure: boolean
    hasConfidentialView: boolean
    hasView: boolean
  }

  interface LessonImage {
    aboutID: number
    aboutType: string
    height: number
    pathURL: string
    width: number
    imageName: keyof typeof Data.LessonImageType

    createdDate: string
    createdByID: number
    createdByName: string
    domainID: number
    modifiedDate: string
    modifiedByID: number
    modifiedByName: string
    originalMD5: string
    originalMimeType: string
    orientation: keyof typeof TytoData.Orientation
    imageType?: 'ocProfilePhoto'
    originalMimeType: string
    userDescription: string
  }

  interface LessonPermission {
    hasView: boolean
    hasChange: boolean
    hasDelete: boolean
    hasViewOriginal: boolean
  }

  interface LibCatIcon {
    pathURL: string
    height: number
    width: number
    imageID: number
  }

  interface LibraryCategory {
    libCatIcon: Data.LibCatIcon
    categoryName: string
    createdByID: number
    createdDate: string
    isFeatured: boolean
    libraryCategoryID: number
    memberID: number
    modifiedByID: number
    modifiedDate: string
    parentLibraryCategoryID: number
    sequence: number
    thumbnailPath: string
    hasView: boolean
    hasAdd: boolean
    hasChange: boolean
    hasDelete: boolean
    backgroundURL: string
    cssStyle: string
    description: string
  }

  interface LibraryCourseItem {
    activeStatus: keyof typeof TytoData.ActiveStatus
    elementType: string
  }

  interface LibraryMember {
    activeStatus: keyof typeof TytoData.ActiveStatus
    elementType: string
  }

  interface LibraryItem {
    categoryName: string
    sequence: number
    libraryID: number
    memberID: number
    courseItemID: number
    createdDate: string
    createdBy: number
    description: string
    activeStatus: string
    libraryCategoryID: number
    isBackroom: boolean
    isFeatured: boolean
    thumbNailPath: string
    courseItem: Data.LibraryCourseItem
    member: Data.LibraryMember
    lesson: TytoData.Lesson
  }

  export interface ProfileImageAsset {
    assetDesc: string
    assetID: number
    assetName: string
    assetType: string
    courseItemID: number
    createdByID: number
    createdByName: string
    createdDate: string
    domainID: number
    encodings: Data.Encoding[]
    modifiedByID: number
    modifiedDate: string
    orientation: keyof typeof TytoData.Orientation
    originalMD5: string
    sequence: number
    softwareRequirements: string

    ocType?: string
    assetPath?: string
    sizeBytes?: number
    mimeType?: string
    thumbnailPath?: string
    thumbnailMimeType?: string
    height?: number
    width?: number
    length?: number
    isFixedThumbnailPath?: number
    isFixedAssetPath?: number
    locID?: number
  }

  interface TeamProfileImage {
    aboutID: number
    aboutType: 'ocTEAM'
    activeStatus: keyof typeof TytoData.ActiveStatus
    createdByID: number
    createdDate: string
    domainID: number
    elementType: 'ocIMAGE'
    height: number
    imageID: number
    imageName: 'Default Image'
    imageType: 'ocProfilePhoto'
    length: number
    modifiedByID: number
    modifiedDate: string
    orientation: keyof typeof TytoData.Orientation
    originalMD5: string
    originalMimeType: string
    originalName: string
    originalSizeBytes: number
    outsideID: string
    pathURL: string
    primaryElementID: number
    sequence: number
    techNote: string
    userDescription: string
    width: number
  }

  export type SessionData = Session

  export interface TytoErrorNoError {
    msg: 'initialized'
    sts: 0
  }

  export interface TytoError {
    logID: number
    msg: string
    sts: number
    technical: string
  }

  export type TytoErrorObject = TytoError | TytoErrorNoError

  type TytoResponse = TytoBaseResponse

  export interface NonGetTytoResponse extends TytoBaseResponse {
    recordsAffected: number
  }

  namespace ClosedCaptioning {
    interface ParsedSubtitleSection {
      idx: number
      startTime: {
        display: string
        seconds: number
      }
      endTime: {
        display: string
        seconds: number
      }
      captionText: string
      sectionRaw: string
      sectionConverted: string
    }
    interface ParsedSubtitles {
      parsedText: string
      parsedSections: ParsedSubtitleSection[]
    }
  }

  // CommandChannel namespace for real-time data updates
  export namespace CommandChannel {
    type UpdateType = 'DEFAULT' | 'SILENT' | 'NONE'

    interface _Update {
      dataType?: string
      id: DB_ID
      relatedEvent?: { id: DB_ID; tableName: string }
    }

    interface AboutInfo {
      id: DB_ID
      dataType: string
      event?: { item: any; type: string }
    }

    interface ActionAboutInfo {
      id: DB_ID
      dataType: string
      event?: string
    }

    interface DataUpdate extends _Update {
      aboutInfo?: AboutInfo[]
      event: {
        id: DB_ID
        item?: any
        type: string
      }
    }

    interface CommandAction extends _Update {
      aboutInfo?: ActionAboutInfo[]
      event: string
      updateType: UpdateType
    }

    interface Subscription {
      onMessage: (
        onMessage: (action: {
          data: Data.CommandChannel.CommandAction
        }) => void,
      ) => void
    }

    interface UpdatableItem {
      ccInsertedDate?: string
      ccUpdatedDate?: string
    }
  }

  // DB namespace for database operations
  export namespace DB {
    interface UpdateOpts {
      addCCModificationDates?: boolean | void
      ccUpdateType?: Data.CommandChannel.UpdateType
      channels?: string[]
      disableCCUpdate?: boolean | void
    }

    interface OptimisticUpdateMethods {
      commit?: (
        update?: object | ((o: object) => object),
        opts?: UpdateOpts,
      ) => Promise<void>
      revert?: () => Promise<void>
    }
  }

  // DB_ID type for database identifiers
  export type DB_ID = number | string

  // Network namespace for API/HTTP types
  export namespace Network {
    interface GenericTytoResponse<
      EndpointSpecificData = object,
    > extends EndpointSpecificData {
      links: any[]
      error: TytoErrorObject
      session: {
        userID: number
        userName: string
        changePassword: boolean
        termsOfServiceSignatureRequired: boolean
        adminID: number
        teamListSyncDate: string
        koPermissionSyncDate: string
        domainID: number
        timeOutMnts: number
        onCourseURL: string
        profileThumbPath: string
        teamRootID: number
        roleID: number
        onlinePreference: string
      }
    }

    interface TytoErrorObject {
      sts: number
      msg: string
      logID?: number
      technical?: string
    }

    interface CallOpts {
      cache?: boolean
      contentType?: string
      data?: any
      dataType?: string
      headers?: Record<string, string>
      method?: string
      timeout?: number
      url?: string
      withCredentials?: boolean
      parseStrategy?: string
      priority?: string | number
      relTags?: string[] | void
      useBetaLinks?: boolean
      combineRecurring?: boolean
    }
  }
}

declare namespace Mastery {
  enum SiteTheme {
    dark = 'dark',
    light = 'light',
    system = 'system',
  }

  enum Theme {
    alert = 'alert',
    success = 'success',
    action = 'action',
    warning = 'warning',
  }

  enum PointsTheme {
    alert = 'good',
    success = 'great',
    action = 'amazing',
  }

  enum CustomEvent {
    'storagevaluechanged' = 'storagevaluechanged',
    'clearsession' = 'clearsession',
  }

  interface CommonProps {
    className?: string
    style?: React.CSSProperties
  }

  interface QueryProp<T> {
    isFetching: boolean
    status: string
    data: T | undefined
    storedValueQuery: {
      isFetching: boolean
      status: 'idle' | 'error' | 'loading' | 'success'
      data: T
    }
    eagerData: T | undefined
  }
}

export type Und<T> = T | undefined

// TryybEnv - Environment variables for Tryyb applications
declare global {
  // Alias for backwards compatibility
  type TryybEnvironment = TryybEnv

  interface TryybEnv extends NodeJS.ProcessEnv {
    AUDIO_PLAYER_HEIGHT?: number
    AUDIO_PLAYER_WIDTH?: number
    BUILD_NUMBER_?: number
    DATABASE_?: string
    DEV_?: boolean
    DEV_ONLY?: boolean
    HAS_CHAT?: boolean
    HMR?: boolean
    IS_APP?: boolean
    IS_LEGACY?: boolean
    IS_MOBILE_DEVICE?: boolean
    IS_PHONE_DEVICE?: boolean
    KVAULT_DEVICE_APP?: boolean
    LOCAL_DEV?: boolean
    LOCAL_DEV_?: boolean
    LOG_BEHAVIOR?: boolean
    PERFORM_SANITY_CHECK?: boolean
    SHOW_DEBUG?: boolean
    TEST?: boolean
  }
}
