import { Data } from '../index'
import type { FunctionName } from '../../security-functions/derived-types'

export namespace TytoData {
  // * NON-INTERFACES / NAMESPACES
  import ProfileImageAsset = Data.ProfileImageAsset

  enum ActiveStatus {
    ocENABLED = 'ocENABLED',
    ocDISABLED = 'ocDISABLED',
  }

  export type AssetType =
    | 'ocASSIGNMENT'
    | 'ocProfilePhoto'
    | 'ocEvent'
    | LessonType

  type AssignTypeMember =
    | 'None'
    | 'Owner'
    | 'Marketing Stakeholder'
    | 'Key Stakeholder'
    | 'Finance Stakeholder'
    | 'Human Resources Stakeholder'
    | 'Management Stakeholder'
    | 'Leadership Team'
    | 'Other'

  type AssignTypeMentor =
    | 'None'
    | 'Human Resources Advisor'
    | 'Operations Advisor'
    | 'Professional Development Advisor'
    | 'Sales Development Advisor'
    | 'Finance Advisor'
    | 'Marketing Advisor'
    | 'Marketing Vendor'
    | 'Other'

  enum BlockType {
    ocITEM = 'ocITEM',
  }

  enum CatalogTakeableItem {
    ocBLOCK = 'ocBLOCK',
    ocDEVPLAN = 'ocDEVPLAN',
  }

  enum CatalogItemSubType {
    ocCONTAINER = 'ocCONTAINER',
    ocBLOCK = 'ocBLOCK',
    ocDEVPLAN = 'ocDEVPLAN',
  }

  enum CatalogItemType {
    ocCATALOG = 'ocCATALOG',
  }

  enum CatalogType {
    ocCURRICULUMPUB = 'ocCURRICULUMPUB',
  }

  enum CertifyType {
    ocNOCERTIFY = 'ocNOCERTIFY',
  }

  enum CompleteStatus {
    ocATRISK = 'ocATRISK',
    ocCOMPLETE = 'ocCOMPLETE',
    ocPENDINGAPPROVAL = 'ocPENDINGAPPROVAL',
    ocINCOMPLETE = 'ocINCOMPLETE',
    ocINPROGRESS = 'ocINPROGRESS',
    ocNOTATTEMPTED = 'ocNOTATTEMPTED',
    ocNOTSTARTED = 'ocNOTSTARTED',
    ocPOSTPONED = 'ocPOSTPONED',
    ocREQUESTVERIFY = 'ocREQUESTVERIFY',
    ocVACANT = 'ocVACANT',
    ocTIMEOUT = 'ocTIMEOUT',
  }

  // TODO: Finish finding enum values
  type ConstructionMode =
    | 'ocConstruction'
    | 'ocReview'
    | 'ocPublished'
    | 'ocDeprecated'

  type DevPlanMasterReminderFrequency =
    | 'ocDISABLED'
    | 'ocDAILY'
    | 'ocWEEKLYMON'
    | 'ocWEEKLYTUE'
    | 'ocWEEKLYWED'
    | 'ocWEEKLYTHU'
    | 'ocWEEKLYFRI'

  type DomainUIImageType =
    | 'backgroundImagePath'
    | 'backgroundImagePathTablet'
    | 'backgroundImagePathMobile'
    | 'homeBackgroundImagePath'
    | 'homeBackgroundImagePathTablet'
    | 'homeBackgroundImagePathMobile'
    | 'logoImagePath'
    | 'logo_link'
    | 'logo_link_DARK'
    | 'emailLogo'
    | 'emailLogo_DARK'
    | 'domainStylesheet'
    | 'favicon'
    | 'trainingLinkStepDefaultThumbnail'
    | 'trainingLinkStepDefaultThumbnail_DARK'
    | 'masteryBackgroundVideoPosterPath'
    | 'masteryBackgroundVideoPath'

  interface DomainProperties {
    taglineLabel: string
    themePrimaryColor: string
    themeSecondaryColor: string
    colorSchemes: 'light' | 'dark' | 'light,dark' | 'dark,light'
    menuType: 'top' | 'side' | 'top,side'
  }

  enum DueDateAction {
    ocVACANT = 'ocVACANT',
  }

  enum DifficultyDesc {
    ocBEGINNER = 'ocBEGINNER',
    ocMODERATE = 'ocMODERATE',
    ocINTERMEDIATE = 'ocINTERMEDIATE',
    ocADVANCED = 'ocADVANCED',
  }

  enum ElementType {
    ocEXAMTASK = 'ocEXAMTASK',
    ocBLOCK = 'ocBLOCK',
    ocDEVPLAN = 'ocDEVPLAN',
    ocPREREQUISITE = 'ocPREREQUISITE',
    ocTEAM = 'ocTEAM',
  }

  enum ElementSubType {
    ocEXAMTASK = 'ocEXAMTASK',
    ocITEM = 'ocITEM',
    ocBLOCK = 'ocBLOCK',
    ocLESSON = 'ocLESSON',
    ocTEAM = 'ocTEAM',
    ocDOMAIN = 'ocDOMAIN',
    ocPROJECT = 'ocPROJECT',
  }

  enum EmailPreference {
    ocVACANT,
    ocDISABLED,
    ocBATCHDAY,
    ocBATCHWEEK,
    ocINSTANT,
  }

  enum EncodingType {
    ocCAPTION,
    ocORIGINAL = 'ocORIGINAL',
    ocDEFAULT = 'ocDEFAULT',
    ocTHUMBNAIL = 'ocTHUMBNAIL',
    ocSMALL = 'ocSMALL',
    ocMEDIUM = 'ocMEDIUM',
    ocLARGE = 'ocLARGE',
    'ocPDFIMAGES/imgtmp' = 'ocPDFIMAGES/imgtmp',
    'ocPDFJSON/jsthumb' = 'ocPDFJSON/jsthumb',
    'ocPDFJSON/jspage' = 'ocPDFJSON/jspage',
    'ocPDFJSON/jspageimg' = 'ocPDFJSON/jspageimg',
    'ocPDFIMAGES/thumbtmp' = 'ocPDFIMAGES/thumbtmp',
  }

  enum ExamDisplayQuestionStyle {
    ocSCRIPTED = 'ocSCRIPTED',
    ocPERPAGE = 'ocPERPAGE',
  }

  enum ExamDisplayResultsAfterCompletion {
    ocSCORE = 'ocSCORE',
  }

  enum ExamDisplayResultsDuring {
    ocRESULTANDFB = 'ocRESULTANDFB',
    ocRESULT = 'ocRESULT',
    ocRESULTCORRECT = 'ocRESULTCORRECT',
    ocRESCORANDFB = 'ocRESCORANDFB',
    ocDISABLED = TytoData.ActiveStatus.ocDISABLED,
    ocVACANT = 'ocVACANT',
  }

  enum ExamMode {
    ocCONSTRUCTION = 'ocCONSTRUCTION',
  }

  enum ExamMultiplicityRestriction {
    ocSTATUS = 'ocSTATUS',
  }

  enum ExposureCalc {
    ocSHARED = 'ocSHARED',
  }

  enum EvalType {
    ocVACANT = 'ocVACANT',
  }

  type ICalRole =
    | 'REQ_PARTICIPANT'
    | 'CHAIR'
    | 'OPT_PARTICIPANT'
    | 'NON_PARTICIPANT'
    | 'X_STRATEGIC'
    | 'X_LOGISTIC'

  type ICalStatus =
    | 'NEEDS_ACTION'
    | 'ACCEPTED'
    | 'DECLINED'
    | 'TENTATIVE'
    | 'DELEGATED'
    | 'COMPLETED'
    | 'IN_PROCESS'

  type TaskMemberICalRole = 'X_STRATEGIC' | 'X_LOGISTIC' | 'NON_PARTICIPANT'

  enum ItemType {
    ocASSIGNMENT = 'ocASSIGNMENT',
    ocDOCUMENT = 'ocDOCUMENT',
    ocEXAMTASK = 'ocEXAMTASK',
    ocImage = 'ocImage',
    ocLESSON = 'ocLESSON',
    ocPDF,
    ocPhoto = 'ocPhoto',
    ocPHOTOALBUM = 'ocPHOTOALBUM',
    ocELEARNING = 'ocELEARNING',
    ocSCORM = 'ocSCORM',
    ocSpreadsheet = 'ocSpreadsheet',
    ocURL = 'ocURL',
    ocVIDEO = 'ocVIDEO',
    ocVideo = 'ocVideo',
    ocBLOCK = 'ocBLOCK',
    ocTASK = 'ocTASK', // * NOTE: No actual example of a task inside a Course
  }

  enum ItemSubType {
    ocASSIGNMENT = 'ocASSIGNMENT',
    ocLESSON = 'ocLESSON',
    ocPhoto = 'ocPhoto',
    ocSCORM = 'ocSCORM',
    ocSpreadsheet = 'ocSpreadsheet',
    ocURL = 'ocURL',
  }

  // * NOTE: 'Known' because this list will grow over time as more granular reporting is needed and supported
  enum KnownReportName {
    batchDevTaskVcep,
    NewsSerial,
    SubordTraining,
  }

  type KPITarget =
    | 'Patients per Day'
    | 'Procedure per Patient'
    | 'Profitability'

  enum _LessonItemType {
    ocASSIGNMENT = 'ocASSIGNMENT',
    ocPhoto = 'ocPhoto',
    ocSCORM = 'ocSCORM',
    ocURL = 'ocURL',
  }

  type LessonType =
    | 'ocVideo'
    | 'ocPhoto'
    | 'ocFile'
    | 'ocImage'
    | 'ocURL'
    | 'ocQuickDoc'
    | 'ocSpeedSheet'
    | 'ocPDF'
    | 'ocAudio'
    | 'ocSCORM'
    | 'ocZip'
    | 'ocWord'
    | 'ocSpreadsheet'
    | 'ocPowerPoint'
    | 'ocQuickArtBdy'

  type LessonItemType =
    | 'ocVIDEO'
    | 'ocPHOTOALBUM'
    | 'ocDOCUMENT'
    | 'ocURL'
    | 'ocQUICKART'
    | 'ocELEARNING'

  enum ObservanceType {
    ocCONSTANT = 'ocCONSTANT',
    ocDAYLIGHT = 'ocDAYLIGHT',
    ocSTANDARD = 'ocSTANDARD',
  }

  type Ordinal = 'none' | 'Primary' | 'Secondary'

  type OrdinalRecurrence =
    | 'ocFIRST'
    | 'ocSECOND'
    | 'ocTHIRD'
    | 'ocFOURTH'
    | 'ocLAST'

  enum Orientation {
    ocVACANT = 'ocVACANT',
    ocVOID = 'ocVOID',
    ocLANDSCAPE = 'ocLANDSCAPE',
    ocPORTRAIT = 'ocPORTRAIT',
  }

  enum ocType {
    ocENROLLMENT = 'ocENROLLMENT',
    ocEXAMTASK = 'ocEXAMTASK',
    ocLESSON = 'ocLESSON',
    ocBLOCK = 'ocBLOCK',
    ocPERSON = 'ocPERSON',
  }

  enum PassStatus {
    ocPASS = 'ocPASS',
    ocFAIL = 'ocFAIL',
    ocVACANT = 'ocVACANT',
  }

  type PointOfIntegration = 'Operational' | 'Vacant'

  enum QuestionType {
    ocChoice = 'ocChoice',
    ocChoiceMulti = 'ocChoiceMulti',
    ocTrueFalse = 'ocTrueFalse',
    ocEssay = 'ocEssay',
    ocText = 'ocText',
    ocLikert = 'ocLikert',
    ocLikertCustom = 'ocLikertCustom',
  }

  enum PlanStepAboutType {
    ocBLOCK = 'ocBLOCK',
    ocCONTAINER = 'ocCONTAINER',
    ocDEVPLAN = 'ovDEVPLAN',
    ocEXAMTASK = 'ocEXAMTASK',
    ocLESSON = 'ocLESSON',
  }

  type TaskSetStatus = 'Unspecified' | 'Logistic' | 'Strategic' | 'TaskDescLink'

  enum TaskType {
    ocAICC = 'ocAICC',
    ocASSIGNMENT = 'ocASSIGNMENT',
    ocCourse = 'ocCourse',
    ocCONTAINER = 'ocCONTAINER',
    ocExam = 'ocExam',
    ocITEM = 'ocITEM',
    ocPDF = 'ocPDF',
    ocSCORM = 'ocSCORM',
    ocSpreadsheet = 'ocSpreadsheet',
    ocTeamToolsKO = 'ocTeamToolsKO',
    ocURL = 'ocURL',
    ocVideo = 'ocVideo',
    REQUESTVERIFY = 'ocREQUESTVERIFY',
    ocVERIFY = 'ocVERIFY',
    ocVACANT = 'ocVACANT',
  }

  enum TaskStatus {
    ocATRISK = 'ocATRISK',
    ocCOMPLETE = 'ocCOMPLETE',
    ocINCOMPLETE = 'ocINCOMPLETE',
    ocINPROGRESS = 'ocINPROGRESS',
    ocNOTSTARTED = 'ocNOTSTARTED',
    ocPOSTPONED = 'ocPOSTPONED',
    ocVACANT = 'ocVACANT',
    ocPREPUBLISH = 'ocPREPUBLISH',
  }

  type TGPTaskType = 'ocTGPLAN' | 'ocTGMILESTONE' | 'ocCONTAINER' | 'ocVACANT'

  enum TeamType {
    ocDOMAIN = 'ocDOMAIN',
    ocTEAM = 'ocTEAM',
    ocPROJECT = 'ocPROJECT',
  }

  enum DomainType {
    ocTEAMTOOLS = 'ocTEAMTOOLS',
    ocSUPPORT = 'ocSUPPORT',
    ocTEAMTOOLSCOACH = 'ocTEAMTOOLSCOACH',
    ocTRYYB = 'ocTRYYB',
  }

  enum DiscOptOut {
    ocVACANT = 'ocVACANT',
    ocLEVEL00 = 'ocLEVEL00',
    ocLEVEL10 = 'ocLEVEL10',
    ocLEVEL20 = 'ocLEVEL20',
  }

  enum DISCStatus {
    ocNOTSTARTED = 'ocNOTSTARTED',
    ocDISABlED = 'ocDISABlED',
    ocENABLED = 'ocENABLED',
    ocPENDING = 'ocPENDING',
  }

  enum PermitMatrixReason {
    WAITADMINREVEAL = 'WAITADMINREVEAL',
    SHOWSELF = 'SHOWSELF',
    SHOWOTHERS = 'SHOWOTHERS',
    NOSPOILERS = 'NOSPOILERS',
    OPTOUT = 'OPTOUT',
  }

  enum PrerequisiteType {
    ocELEARNING = 'ocELEARNING',
  }

  type SBUFunction =
    | 'Vacant'
    | 'Professional_Development'
    | 'Finance'
    | 'Operations'
    | 'Marketing'
    | 'Human_Resources'
    | 'Sales_Development'

  enum TaskOrder {
    ocSEQUENTIAL = 'ocSEQUENTIAL',
    ocANYORDER = 'ocANYORDER',
  }

  // * NOTE: On all `209` DevPlanVCEs the only saved value was `ocUNDEFINED` for Cardone Ventures domain at time of typing
  type WorkingTimeCalendar = 'ocUNDEFINED'
  // * ===========================

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

  interface AssignmentInfo {
    isReviewerChosen: boolean
    isReviewerMentor: boolean
    isVerifyRequired: boolean
    isScoredComplete: boolean
    isScoredPercent: boolean
    isScoredPoints: boolean
    isScoredPassFail: boolean
    isMarkComplete: boolean
    isCompleteAtLaunch: boolean
    isCompleteAtEnd: boolean
    isRequestingVerification: boolean
    isUploadRequired: boolean
  }

  interface AdvancedPerson {
    activeStatus: string
    createdDate: string
    createdby: number
    department: string
    domainID: number
    domainName: string
    elementSubType: string
    elementType: string
    email?: string
    familiarName: string
    familyName: string
    firstActivity: string
    givenName: string
    jobTitle: string
    lastActivity: string
    modifiedDate: string
    modifiedby: number
    outsideActiveStatus: string
    outsideID?: string
    outsideJoinDate: string
    outsideModifiedDate: string
    outsideRenewalDate: string
    outsideTerminateDate: string
    outsideType: string
    phone1?: string
    phone2?: string
    primaryElementID: number
    primaryElementName: string
    primaryElementType: string
    profileImage?: {
      assetID: number
      domainID: number
      thumbnailPath: string
    }
    roleID: number
    teamRootID: number
    telecom: {
      address: string
      label: string
      modifiedByID: number
      modifiedDateUTC: string
      seq: number
    }[]
    userID: number
  }

  interface AuthResult {
    activeStatus: keyof typeof TytoData.ActiveStatus
    authSession: SessionData
    domainID: number
    domainName: string
    loginDomainID: string
    loginUrl: string
    onCourseURL: string
    otherName: string
    outsideID: string
    profileImage?: Data.ProfileImageAsset
    terminateDate: string
    ttUrl: string
    userID: number
    sessionError?: { msg: string }
  }

  interface BillingSummaryResp {
    billingSummary: BillingSummary[]
    domainID: number
    domainName: string
  }

  interface BillingSummary {
    billingItemCategory: string
    billingDescriptionLabel: string
    itemQty: number
    billingMonth: number
    billingYear: number
    details: BillingSummaryDetail[]
  }

  interface BillingSummaryDetail {
    billingDate: string
    billingItemType: string
    billingItemCategory: string
    billingDescription: string
    billingMonth: number
    billingYear: number
    aboutID: number
    aboutType: string
    aboutName: string
    person: {
      firstActivity: string
      teamRoot: number
      city: string
      state: string
      email: string
      teamName: string
      subDomainParentNamePath: string
      givenName: string
      familyName: string
    }
  }

  namespace Configuration {
    interface Client {
      uploadServices: string[]
      chatServices: string[]
      encoderServices: string[]
      jsLogService: string
      tytoBuildTag: string
      paymentEnvironment: string
      discEnvironment: string
      onCourseConnectionHash: string
      webSocCommandChannelUri: string
      tytoBuildNumber: number
    }
  }

  namespace Blocks {
    interface ShareListItem {
      blockID: number
      blockShareID: number
      createdByID: number
      createdBy_Name: string
      createdDate: string
      memberID: number
      member_Name: string
      securityBlockChange: boolean
      securityBlockDelete: boolean
      securityEnrollment: boolean
      securityLevel: number
      securityPrerequisite: boolean
      securityReports: boolean
      securityShare: boolean
    }

    interface ExtendedEnrollmentData {
      assets: TytoData.Asset[]
      assetDate: string
      attributeFile: string
      commandLine: string
      creditUnitDesc: string
      creditUnits: number
      certifyType: keyof typeof TytoData.CertifyType
      certifyMemberID: number
      certifyemail: string
      createdByID: number
      createdDate: string
      createdName: string
      domainID: number
      eventLocation: string
      expirationDate: string
      exposureCalc: string // "ocSHARED"
      images: Data.LessonImage[]
      isAutoRecert: boolean
      isManualRecert: boolean
      isResource: boolean
      keywordStringArray: string[]
      launchBehavior: number
      launchCount: number
      lessonPolicyID: number
      lastReviewDate: string
      masteryScore: number
      maxReview: number
      maxTimeAllowed: string
      maxToComplete: number
      maxToPass: number
      moduleID: string
      modifiedByID: number
      modifiedDate: string
      ocType: TytoData.ocType.ocLESSON
      permission: Data.LessonPermission
      policy: object
      recertificationTime: string
      reviewedByID: number
      setCompletion: number
      setStatus: 7
      teamRoot: number
      timeLimitAction: string
      timeLimitMsg: string
      restrictOriginal: keyof typeof TytoData.ActiveStatus // ? Maybe
      standardConversationStatus: keyof typeof TytoData.ActiveStatus // ? Maybe
    }

    interface CurriculumBlock {
      // * 'CurriculumBlock' refers to a PrerequisiteEnrollment item that is itself a 'Container' Block ('SubCourse')
      activeStatus: keyof typeof TytoData.ActiveStatus
      elementDesc: string
      elementID: number
      elementName: string
      elementSubType: TytoData.ElementSubType.ocITEM
      elementType: TytoData.ElementType.ocBLOCK
      locID: number
      name: string
      ocType: TytoData.ocType.ocBLOCK
    }

    interface CurriculumGeneric extends TytoData.Blocks.ExtendedEnrollmentData {
      activeStatus: keyof typeof ActiveStatus
      assetType: TytoData.AssetType
      elementDesc: keyof typeof ActiveStatus
      elementID: number
      elementName: string
      elementSubType: keyof typeof TytoData.ElementSubType
      elementType: keyof typeof TytoData.ElementType
      images: Data.LessonImage[]
      isAnswerKey: boolean
      isCredit: boolean
      itemType: keyof typeof TytoData.ItemType
      lessonDesc: string
      lessonID: number
      lessonItemType: LessonItemType
      lessonName: string
      locID: number
      masteryScore?: number
      maxBrowse: number
      name: string
      ocType: keyof typeof TytoData.ocType
      setStatus?: number
      thumbnailPathURL?: string // ! Fake propertyName I am expecting to exist soon
    }

    interface CurriculumExam {
      activeStatus: keyof typeof ActiveStatus
      elementDesc: keyof typeof ActiveStatus
      elementID: number
      elementName: string
      elementSubType: TytoData.ElementSubType
      elementType: TytoData.ElementType
      locID: number
      name: string
      ocType: TytoData.ocType.ocEXAMTASK
    }

    interface Domain {
      audienceDescLabel: string
      difficultyDescLabel: string
      expectationDescLabel: string
    }

    interface Enrollment {
      bookMark: string
      completeStatus: keyof typeof TytoData.CompleteStatus
      cummAttempts: number
      cummTime: string
      enrollmentID: number
      isLaunchable: true
      lastDate: string
      locID: number
      ocType: TytoData.ocType
      passStatus: keyof typeof TytoData.PassStatus
      score: number
      sessionTime: string
    }

    interface Prerequisite {
      assets: TytoData.Asset[]
      aboutID: number
      activeStatus: string
      courseItemStatus: string
      createdBy: number
      createdDate: string
      createdName: string
      creditUnitDesc: string
      creditUnits: number
      isCredit: boolean
      isDemo: boolean
      isOptional: boolean
      isResource: boolean
      itemDescription: string
      itemName: string
      itemSubtype: keyof typeof TytoData.ItemType
      itemType: keyof typeof TytoData.ItemType
      masteryScore: number
      parentID: number
      prerequisiteID: number
      prerequisiteName: string
      prerequisiteType: keyof typeof TytoData.PrerequisiteType
      sequence: number
      setCompletion: number
      setStatus: number
      images: Data.LessonImage[]
    }

    interface PrerequisiteEnrollment {
      blockID: number
      contentLengthDesc: string
      completeStatus: keyof typeof TytoData.CompleteStatus
      curriculum:
        | TytoData.Blocks.CurriculumGeneric
        | TytoData.Blocks.CurriculumBlock
        | TytoData.Blocks.CurriculumExam
      enrollment: TytoData.Blocks.Enrollment
      isOptional: boolean
      isResource: boolean
      name: string
      preRequisiteID: number
      sequence: number
      subRequisites?: TytoData.Blocks.PrerequisiteEnrollment[]
    }

    interface Block {
      activeStatus: keyof typeof ActiveStatus
      audienceDesc: string
      authorID: number
      blockDesc: string
      blockID: number
      blockLogic: keyof typeof TaskOrder
      blockName: string
      blockType: BlockType.ocITEM
      courseIdentifierString: string
      createdByID: number
      createdBy_Name: string
      createdDate: string
      difficultyDesc: string
      domain: TytoData.Blocks.Domain
      domainID: number
      dueDate: string
      durationEstimate: string
      durationMinutes: number
      elementType: CatalogTakeableItem.ocBLOCK
      expectationDesc: string
      expirationDate: string
      hasChange: boolean
      hasDelete: boolean
      isContinue: boolean
      isCritical: boolean
      modifiedByID: number
      modifiedBy_Name: string
      modifiedDate: string
      onDueDateAction: keyof typeof DueDateAction
      outsideID: string
      products: any[]
      profileImage: Data.ProfileImageAsset
      profileImageFeatured: Data.ProfileImageAsset
      profileImageFeaturedID: number
      profileImageID: number
      relatedFunctions: any[]
      shareList: TytoData.Blocks.ShareListItem[]
      teamRoot: number
    }
  }

  namespace Catalog {
    interface CategoryItem {
      _knownCatalogItemInstances?: TytoData.Catalog.CategoryItem[]
      _unmutatedChildItems?: TytoData.Catalog.CategoryChildItem[]
      _unmutatedChildContainers?: TytoData.Catalog.CategoryItem[]
      activeStatus: keyof typeof ActiveStatus
      catalogID: number
      catalogItemID: number
      catalogItemSubType: keyof typeof CatalogItemSubType
      catalogItemType: keyof typeof CatalogItemType
      catalogType: keyof typeof CatalogType
      createdByID: number
      createdDate: string
      description: string
      domainID: number
      hasAdd: boolean
      hasChange: boolean
      hasDelete: boolean
      images: Data.LessonImage[] // TODO Update with actual data
      locID: number
      modifiedByID: number
      modifiedDate: string
      name: string
      ocType: string
      outsideID: string
      parentCatalogID: number
      pathIDs: string
      pathName: string
      primaryElementID: number
      primaryElementTreeSerialLeft: number
      siblingSeq: number
      thumbnailPath: string
      childItems?: TytoData.Catalog.CategoryChildItem[]
    }

    interface ChildItemCurriculum {
      activeStatus: keyof typeof TytoData.ActiveStatus
      audienceDesc: string
      author: any
      blockID: number
      catalogIDs: []
      courseIdentifier: string
      createdByID: number
      createdDate: string
      difficultyDesc: keyof typeof TytoData.DifficultyDesc
      domainID: number
      durationEstimate: string
      elementDesc: string
      elementID: number
      elementName: string
      elementSubType: keyof typeof TytoData.ElementSubType
      elementType: keyof typeof TytoData.CatalogTakeableItem
      expectationDesc: string
      expirationDate: string
      locID: number
      modifiedByID: number
      modifiedDate: string
      name: string
      ocType: keyof typeof TytoData.ocType
      outsideID: string
      primaryElementID: number
      products: []
      profileImage: Data.ProfileImageAsset
      profileImageFeatured: Data.ProfileImageAsset
      shareChangedByID: number
      shareChangedDate: string
      teamRoot: number
    }

    interface ChildItemAbout {
      activeStatus: keyof typeof TytoData.ActiveStatus
      beginDate: string
      catalogIDs: number[]
      createdByID: number
      createdDate: string
      curriculum: TytoData.Catalog.ChildItemCurriculum
      curriculumID: number
      curriculumPublicationID: number
      curriculumType: keyof typeof TytoData.CatalogTakeableItem
      devplanID?: number
      domainID: number
      elementDesc: string
      elementID: number
      elementName: string // ! was "oc" in sample
      elementSubType: keyof typeof TytoData.CatalogTakeableItem
      elementType: keyof typeof TytoData.ElementType
      expiresDate: string
      locID: number
      modifiedByID: number
      modifiedDate: string
      name: string
      ocType: keyof typeof TytoData.ocType
      outsideID: string
      primaryElementID: number
      shareChangedByID: number
      shareChangedDate: string
    }

    interface CategoryChildItem extends TytoData.Catalog.CategoryItem {
      about: ChildItemAbout
    }

    interface Category extends TytoData.Catalog.CategoryItem {
      activeStatus: keyof typeof ActiveStatus
      catalogID: number
      catalogItemID: number
      catalogItemSubType: keyof typeof CatalogItemSubType
      catalogItemType: keyof typeof CatalogItemType
      catalogType: keyof typeof CatalogType
      childContainers: TytoData.Catalog.CategoryItem[] // ? Maybe ?
      childItems: TytoData.Catalog.CategoryChildItem[]
    }

    interface CategorySubItem extends TytoData.Catalog.CategoryItem {
      about: TytoData.Catalog.AboutCourse | TytoData.Catalog.AboutDevPlan
    }

    interface AboutGeneric {
      activeStatus: keyof typeof ActiveStatus
      beginDate: string
      catalogIDs: number[]
      createdByID: number
      createdDate: string
      curriculum: any
      curriculumID: number
      curriculumPublicationID: number
      curriculumType: keyof typeof CatalogTakeableItem
      domainID: number
      elementDesc: ''
      elementID: number
      elementName: string
      elementSubType: keyof typeof CatalogTakeableItem
      elementType: keyof typeof CatalogType
      expiresDate: string
      locID: number
      modifiedByID: number
      modifiedDate: string
      name: string
      ocType: keyof typeof CatalogType
      outsideID: string
      primaryElementID: number
      shareChangedByID: number
      shareChangedDate: string
    }

    interface AboutCourse extends TytoData.Catalog.AboutGeneric {
      curriculum: TytoData.Curriculum.Course
      curriculumType: CatalogTakeableItem.ocBLOCK
      elementSubType: CatalogTakeableItem.ocBLOCK
    }

    interface AboutDevPlan extends TytoData.Catalog.AboutGeneric {
      curriculum: TytoData.Curriculum.DevPlan
      curriculumType: CatalogTakeableItem.ocDEVPLAN
      elementSubType: CatalogTakeableItem.ocDEVPLAN
    }

    interface DomainLabel {
      audienceDescLabel: string
      difficultyDescLabel: string
      domainID: number
      expectationDescLabel: string
    }

    interface PrimaryElement {
      iPath: string
      parentNamePath: string
      subDomainParentNamePath: string
      teamID: number
      teamName: string
    }

    interface TrendingCatalogItem {
      audienceDesc: string
      completesOverAge: number
      countCompletes: number
      countLikes: number
      countNotices: number
      countShare: number
      countViews: number
      courseIdentifier: string
      createdDate: string
      curriculumDesc: string
      curriculumID: number
      curriculumName: string
      curriculumType: keyof typeof TytoData.CatalogTakeableItem
      difficultyDesc: keyof typeof TytoData.DifficultyDesc
      durationEstimate: string
      expectationDesc: string
      expirationDate: string
      likesOverAge: number
      mostRecentComplete: string
      mostRecentShare: string
      mostRecentView: string
      noticesOverAge: number
      profileImage: Data.ProfileImageAsset
      profileImageFeatured: Data.ProfileImageAsset
      shareOverAge: number
      teamRoot: number
    }
  }

  namespace Curriculum {
    interface CurriculumItem {
      activeStatus: keyof typeof ActiveStatus
      audienceDesc: string
      catalogIDs: number[]
      createdByID: number
      createdDate: string
      difficultyDesc: string
      domainID: number
      durationEstimate: string
      elementDesc: string
      elementID: number
      elementName: string
      elementSubType: string
      elementType: keyof typeof CatalogTakeableItem
      ocType: keyof typeof CatalogTakeableItem
      expectationDesc: string
      expirationDate: string
      locID: number
      modifiedByID: number
      modifiedDate: string
      name: string
      outsideID: string
      primaryElementID: number
      shareChangedByID: number
      shareChangedDate: string
      teamRoot: number
    }

    interface Course extends TytoData.Curriculum.CurriculumItem {
      author: any
      blockID: number
      courseIdentifier: string
      elementType: CatalogTakeableItem.ocBLOCK
      ocType: CatalogTakeableItem.ocBLOCK
      products: any[]
      profileImageFeatured: Data.ProfileImageAsset
    }

    interface DevPlan extends TytoData.Curriculum.CurriculumItem {
      devplanID: number
      elementType: CatalogTakeableItem.ocDEVPLAN
      ocType: CatalogTakeableItem.ocDEVPLAN
    }
  }

  interface DomainBilling {
    teamID: number
    parentNamePath: string
    teamName: string
    billingLastDate: string
    billingModel: string
    otherName: string
    onCourseUrl: string
    domainType: string
    newUsersThirty: number
    deletedUsersThirty: number
    adminRoleID: number
  }

  interface Domain {
    achievementIconAlbumID: number
    activateAccountLabel: string
    activateAccountURI: string
    audienceDescLabel: string
    autoMailURI: string
    certificateAssetID: number
    contactEmail: string
    contactName: string
    contactPhone: string
    defaultRoleID: number
    difficultyDescLabel: string
    domainID: number
    domainType: keyof typeof TytoData.DomainType
    emailNoticeScreen: string
    expectationDescLabel: string
    forgotPWLabel: string
    forgotPWURI: string
    generalMessage: string
    generalSubject: string
    inviteMessage: string
    inviteSubject: string
    isSingleSignOn: boolean
    labelPersonal1: string
    labelPersonal2: string
    labelPersonal3: string
    labelPersonal4: string
    loginDomainID: string
    loginNameLabel: string
    loginURI: string
    logoutURI: string
    onCourseURL: string
    otherName: string
    outsideJoinDateLabel: string
    outsideTeamTypes: string
    passwordExpiresDays: number
    personEditURL: string
    pkApiAuthID: number
    portalURI: string
    showKeepMeLoggedIn: boolean
    skinPath: string
    ttAutomailUri: string
    ttChartVersion: string
    ttSpoilerMode: string
    ttUrl: string
  }

  namespace Domain {
    interface Message {
      messageType: string
      domainID: number
      headLine: string
      bodyHtml: string
      bodyPlain: string
      modifiedByID: number
      modifiedDate: string
    }
  }

  namespace DomainInvitation {
    interface Template {
      domainID: number
      onCourseURL: string
      loginDomainID: string
      otherName: string
      autoMailURI: string
      inviteMessage: string
      inviteSubject: string
      loginNameLabel: string
      isSingleSignOn: boolean
      contactName: string
      contactEmail: string
      contactPhone: string
    }
  }

  namespace DISCCompareProfile {
    interface CommTip {
      blnDo: boolean
      discCommTipID: number
      iconAwesome: string
      iconOther: string
      seq: number
      styleKey: number
      tipDescription: string
    }

    interface Intensity {
      styleKey: string
      minscore: number
      score: number
      description: string
    }

    interface Interaction {
      styleKey: string
      styleKeyInteract: string
      interactContext: string
      interactText: string
    }

    interface PersonCommTip extends CommTip {
      activeStatus: string
    }

    interface Result {
      discID: number
      firstName: string
      lastName: string
      d1: number
      i1: number
      s1: number
      c1: number
      d2: number
      i2: number
      s2: number
      c2: number
      d3: number
      i3: number
      s3: number
      c3: number
      nameStyle3: string
      testDate: string
      yearBorn: number
      createdDate: string
      lessonID: number
      d3percentile: number
      i3percentile: number
      s3percentile: number
      c3percentile: number
    }

    interface Style {
      styleKey: string
      styleName: string
      styleNamePKapi: string
      descriptionGeneral: string
      descriptionFull: string
      characterGeneral: string
      teamValues: string
      challengeAreas: string
      fear: string
      motivators: string
      environmentIdeal: string
      want: string
      communicationDo: string
      communicationDont: string
      analyticDispostion: string
      teamContributions: string
      personalGrowthAreas: string
      graphic: string
      styleHeadline: string
      styleTraits: string
      characteristic1: string
      characteristic1details: string
      characteristic2: string
      characteristic2details: string
      characteristic3: string
      characteristic3details: string
    }

    interface Token {
      idx: number
      key: string
      value: string
    }
  }

  interface DISCCompareProfile {
    result: DISCCompareProfile.Result
    style: DISCCompareProfile.Style
    communicationTips: DISCCompareProfile.CommTip[]
    personCommunicationTips: DISCCompareProfile.PersonCommTip[]
    interactions: DISCCompareProfile.Interaction[]
    intensity: DISCCompareProfile.Intensity[]
    tokens: DISCCompareProfile.Token[]
  }

  namespace DevPlanVCE {
    interface KeyPerformanceIndicator {
      name: TytoData.KPITarget
      Ordinal: TytoData.Ordinal
    }

    interface VCEPlanObject {
      visionStatement: string
      commitmentStatement: string
      commitmentStatementVertical?: string
      sbuFunction: TytoData.SBUFunction
      pointOfIntegration: TytoData.PointOfIntegration
      keyPerformanceIndicators: KeyPerformanceIndicator[]
    }

    interface ReminderState {
      memberID: number
      frequency?: TytoData.DevPlanMasterReminderFrequency
      includeWillBePastDue?: boolean
      offsetDaysWillBePastDue?: number
      includePastDue?: boolean
    }

    interface DevPlanVCE {
      vceplanObject: TytoData.DevPlanVCE.VCEPlanObject
      effortMinutesMemberTotal: number
      effortMinutesMentorTotal: number
      devplanMasterID: number
      workingTimeCalendar: TytoData.WorkTimeCalendar
      limitDateRange: boolean
      forceSequential: boolean
      useSimpleDuration: boolean
      expirationDate: string
      constructionMode: TytoData.ConstructionMode
      teamRoot: number
      createdByName: string
      ocVIEW: boolean
      ocCHANGE: boolean
      ocDELETE: boolean
      extensionType: 'ocVCE'
      shareChangeByID: number
      shareChangeDate: string
      modifiedByName: string
      durationMinutesTotal: number
      daysUntilDueTotal: number
      constructionModeByName: string
      constructionModeDate: string
      daysUntilDueMin: number
      authorID: number
      expectationDesc: string
      audienceDesc: string
      durationEstimate: string
      difficultyDesc: string
      domain: {
        expectationDescLabel: string
        audienceDescLabel: string
        difficultyDescLabel: string
      }
      // * name: `(${number}) ocDEVPLAN`
      name: string
      locID: number
      ocType: 'ocELEMENT'
      // * elementName: `(${number}) ocDEVPLAN`
      elementName: string
      elementDesc: string
      elementSubType: 'ocVCE'
      domainID: number
      outsideID: string
      createdByID: number
      createdDate: string
      modifiedByID: number
      modifiedDate: string
      activeStatus: keyof typeof TytoData.ActiveStatus
      workingTimeCalendarID: TytoData.WorkingTimeCalendar
    }
  }

  namespace Exam {
    interface InviteGeneric {
      aboutID: number
      aboutType: string
      activeStatus: keyof typeof TytoData.ActiveStatus
      completeStatus: keyof typeof TytoData.CompleteStatus
      devtaskID: number
      elapsedTimeSeconds: number
      enrollmentID: number
      examTaskID: number
      examTaskInviteID: number
      initialStart: string
      inviteDate: string
      lastStart: string
      memberID: number
    }

    interface Invitation extends TytoData.Exam.InviteGeneric {
      invitedBy: number
      percentCorrectMinimum: number
      points: number
      pointsAwarded: number
    }

    interface QuestionInvite extends TytoData.Exam.InviteGeneric {
      countAskedUnanswered: number
      countExamQuestions: number
      countUnasked: number
      examContinuumID: number
      examPointsPossible: number
      examTaskName: string
      invitedByID: number
      isEarliestInvite: boolean
    }

    interface ExamTakeConfiguration {
      activeStatus: keyof typeof TytoData.ActiveStatus
      allowChangesToResponses: boolean
      allowSkippingQuestions: boolean
      countQuestions: number
      displayQuestionCountPerPage: number
      displayQuestionOrderIsRandom: boolean
      displayQuestionStyle: keyof typeof TytoData.ExamDisplayQuestionStyle
      displayResultsAfterCompletion: keyof typeof ExamDisplayResultsAfterCompletion
      displayResultsDuring: keyof typeof TytoData.ExamDisplayResultsDuring
      displayResultsMinimumCompleted: number
      displayResultsPrintable: boolean
      expiresDate: string
      failMessage: string
      instructions: string
      invitationMultiplicityRestriction: keyof typeof TytoData.ExamMultiplicityRestriction
      invitations: TytoData.Exam.Invitation[]
      isInviteDeclinable: boolean
      isResultAnonymous: boolean
      likertCustom: string
      likertReverse: boolean
      mode: keyof typeof TytoData.ExamMode
      passMessage: string
      percentCorrectMinimum: number
      questionGroupingMode: string
      timeLimitSeconds: number
    }

    interface Answer {
      aText: string
      // * In a 'ocRESULTCORRECT' exam, the following is also present, as it turns out.
      aAssetID?: number
      advice?: string
      examAnswerID?: number
      examQuestionID?: number
      isCorrect?: boolean
      nextExamQuestionID?: number
      points?: number
      sequence?: number
    }

    interface Question {
      asset?: TytoData.Asset
      answers: TytoData.Exam.Answer[]
      answersTemplate: any[]
      evalType: keyof typeof TytoData.EvalType
      points: number
      qAssetDesc: string
      qText: string
      qType: keyof typeof TytoData.QuestionType
    }

    interface AnswerEvaluation {
      advice: string
      examAnswerID: number
      isCorrect: boolean
    }

    interface EvaluatedAnswer {
      createdDate: string
      evaluation: TytoData.Exam.AnswerEvaluation
      rText: string
      sequence: number
      userID: number
    }

    interface Response {
      answers: EvaluatedAnswer[]
      examQuestionID: number
      examResponseID: number
      examTaskInviteID: number
      qType: keyof typeof TytoData.QuestionType
      question: TytoData.Exam.Question
      responseDate: string
      sequence: number
    }
  }

  interface Lesson {
    activeStatus: keyof typeof TytoData.ActiveStatus
    assetDate: string
    assetType: TytoData.AssetType
    assets: TytoData.Asset[]
    attributeFile: string
    certifyMemberID: number
    certifyType: keyof typeof TytoData.CertifyType
    certifyemail: string
    commandLine: string
    createdByID: number
    createdDate: string
    createdName: string
    creditUnitDesc: string
    creditUnits: number
    domainID: number
    eventLocation: string
    expirationDate: string
    exposureCalc: keyof typeof TytoData.ExposureCalc
    hasAddDraft: true
    hasAddShare: false
    hasChange: true
    hasDelete: true
    hasRecommitEnabledAsset: true
    hasReview: false
    hasView: true
    hasViewOriginal: true
    isAnswerKey: false
    isAutoRecert: false
    isCredit: false
    isManualRecert: false
    isResource: false
    itemType: keyof typeof TytoData.ItemType
    keywordStringArray: string[]
    lastReviewDate: string
    launchBehavior: number
    launchCount: number
    lessonDesc: string
    lessonID: number
    lessonItemType: TytoData.LessonItemType
    lessonName: string
    lessonPolicyID: number
    locID: number
    masteryScore: number
    maxBrowse: number
    maxReview: number
    maxTimeAllowed: string
    maxToComplete: number
    maxToPass: number
    modifiedByID: number
    modifiedDate: string
    moduleID: string
    name: string
    ocType: keyof typeof TytoData.ocType
    recertificationTime: string
    restrictOriginal: keyof typeof TytoData.ActiveStatus
    reviewedByID: number
    setCompletion: number
    setStatus: number
    standardConversationStatus: keyof typeof TytoData.ActiveStatus
    teamRoot: number
    timeLimitAction: string
    timeLimitMsg: string
  }

  export type MenuRelation =
    | 'http://kvau.lt/legacy/mobile/ui'
    | 'http://kvau.lt/api/MyAccount'
    | 'http://kvau.lt/mobileapp/native'
    | 'http://kvau.lt/legacy/v2/ui'
    | 'http://kvau.lt/nl'
    | 'http://kvau.lt/default'
    | 'http://kvau.lt/_beta'
    | 'http://kvau.lt/home'
    | 'http://kvau.lt/legacy/api/search+members'
    | 'http://kvau.lt/api/search+people'
    | 'http://kvau.lt/api/cvPlatformreview/tasks'
    | 'http://kvau.lt/api/inbox'
    | 'http://kvau.lt/legacy/api/getuserinbox'
    | 'http://kvau.lt/api/CatalogPlaybook'
    | 'http://kvau.lt/clientportal'
    | 'http://kvau.lt/clientportal/mobile'

  export interface MenuItemNLLinks {
    Default?: Tyto.MenuItemLink
    Beta?: Tyto.MenuItemLink
    Alpha?: Tyto.MenuItemLink
    Legacy?: Tyto.MenuItemLink
    Development?: Tyto.MenuItemLink
  }

  export type MenuItemTargetPref = '_top' | '_self' | '_blank' | 'iframe'
  type CustomMenuActionPref = '::hidemenu' | '::nomenscr' | '::noscroll'

  export interface MenuItemParsed extends MenuItemNLLinks {
    displayName: string
    functionID: number
    functionName: FunctionName
    hideMenu?: boolean
    href: string
    links?: MenuItemLink[]
    iconPath: string
    iconPathLarge?: string
    noScroll?: boolean
    subMenu?: MenuItemParsed[]
    targetPref: MenuItemTargetPref
    title: string
    description?: string
    _mobileHref?: string
    _mobileTargetPref?: MenuItemTargetPref
  }

  interface MenuItemUnparsed {
    functionID: number
    displayName: string
    functionName: FunctionName
    targetPref: MenuItemTargetPref
    title: string
    iconName: string
    iconPath: string
    iconPathLarge: string
    menuGroup: string
    links: MenuItemLink[]
    param4Desc: string
    param3Desc: string
    param2Desc: string
    param1Desc: string
    longName: string
    subMenu?: MenuItemUnparsed[]
  }

  interface MenuItemLink {
    encType: string
    contentType: string
    href: string
    media: string
    method: string
    targetPref: MenuItemTargetPref
    title: string
    parameters: {
      paramName: string
      paramType: string
      value: string
    }[]
    rel: string[]
    _iframeSrc?: string
  }

  namespace OAuthResult {
    namespace ThinSkippy {
      interface AuthRequestState {
        thinSkippy: {
          sub: `U-${string}`
          namespace: string
          given_name: string
          family_name: string
          updated_at: number
          created_at: number
          roles: 'partner'[]
          legacy_user_id: `UID-${string}`
          product_navbar_data_url: string
        }
        schema: 'application/json+VendastaOpenIDUser'
        app_id: string
        account_id: string
        Raw: string
        identityProviderGUID: string
        outsideUserData: {
          domainTraitList: object
          phoneAltList: object
          identityProviderGUID: string
          authOutsideID: `UID-${string}`
          logonName: `U-${string}`
          givenName: string
          familyName: string
        }
        originalCallbackUri: string
        originalReferrer: string
        personID: number
      }

      interface Result {
        outsideUser: {
          domainTraitList: object
          phoneAltList: object
          identityProviderGUID: string
          authOutsideID: `UID-${string}`
          logonName: `U-${string}`
          givenName: string
          familyName: string
          sessionKey?: string
        }
        sessionKey?: string
        authStateCSRF: string
        result: 'noMatch'
      }
    }
  }

  namespace PeopleKeys {
    interface InitializedData {
      assessmentResultID: number
      discID: number
      isClient: boolean
      isNewDiscRequired: boolean
    }

    interface Page {
      page_id: number
      sort_order: number
      type: string
      content: string
    }

    interface PageItemContentOption {
      Text: string
      Value: string
    }

    interface PageItemContent {
      Type: string
      Question: string
      Options: PageItemContentOption[]
    }

    interface PageItem {
      item_id: number
      sort_order: number
      content: PageItemContent
    }

    interface Response {
      assessmentStatus: string
      nextPageID: number
      pageItems: PageItem[]
    }
  }

  interface PermitMatrixItem {
    HIDE: boolean
    reason: keyof typeof TytoData.PermitMatrixReason
  }

  interface PermitMatrix {
    Pdf: PermitMatrixItem
    SCORES_: PermitMatrixItem
    discCommTip_: PermitMatrixItem
    discStyle: {
      analyticDispostion: PermitMatrixItem
      challengeAreas: PermitMatrixItem
      characterGeneral: PermitMatrixItem
      characteristic1: PermitMatrixItem
      characteristic1details: PermitMatrixItem
      characteristic2: PermitMatrixItem
      characteristic2details: PermitMatrixItem
      characteristic3: PermitMatrixItem
      characteristic3details: PermitMatrixItem
      descriptionFull: PermitMatrixItem
      descriptionGeneral: PermitMatrixItem
      environmentIdeal: PermitMatrixItem
      fear: PermitMatrixItem
      graphic: PermitMatrixItem
      motivators: PermitMatrixItem
      personalGrowthAreas: PermitMatrixItem
      styleHeadline: PermitMatrixItem
      styleKey: PermitMatrixItem
      styleName: PermitMatrixItem
      styleNamePKapi: PermitMatrixItem
      styleTraits: PermitMatrixItem
      teamContributions: PermitMatrixItem
      teamValues: PermitMatrixItem
      want: PermitMatrixItem
    }
    discStyleIntensity_: PermitMatrixItem
    discStyleInteraction_: PermitMatrixItem
    discStyleTeam_: PermitMatrixItem
    percentile_: PermitMatrixItem
  }

  export interface Permission {
    addAccess: boolean
    businessCardPref: string
    changeAccess: boolean
    deleteAccess: boolean
    fieldName: keyof Person | 'ClientServiceNotes[]' | ''
    functionName: string // * NOTE: Can't import this type because of circular dependency T_T
    viewAccess: boolean
  }

  export interface Person {
    teamMemberships: PersonTeamMembership[]
    permissions: Permission[]
    domain: {
      domainName: string
      domainLabelPersonal1: string
      domainLabelPersonal2: string
      domainLabelPersonal3: string
      domainLabelPersonal4: string
      domainLoginNameLabel: string
      domainIsSingleSignOn: boolean
      outsideJoinDateLabel: string
    }
    personID: number
    elementType: string
    elementSubType: string
    activeStatus: string
    modifiedDate: string
    createdDate: string
    primaryElementID: number
    domainID: number
    createdByID: number
    modifiedByID: number
    firstActivityDate: string
    languagePreference: string
    lastActivityDate: string
    lastLoginDate: string
    termsofServiceDate: string
    givenName: string
    familyName: string
    familiarName: string
    bio: string
    personal1: string
    personal2: string
    personal3: string
    personal4: string
    businessCardPreferences: string
    emailPreference: string
    onlinePreference: string
    emailDigestHourGMTPreference: number
    emailDigestNoticePreference: string
    sessionTimeoutMinutesPreference: number
    roleID: number
    teamRoot: number
    outsideType: string
    outsideJoinDate: string
    outsideTerminateDate: string
    outsideModifiedDate: string
    outsideActiveStatus: string
    outsideRenewalDate: string
    outsideID: string
    ownerUserID: 0
    languagePreference: string
    changePassword: boolean
    passwordExpiresDate: string
    logonName: string
    logonNameBinding: string
    email: string
    address1: string
    address2: string
    city: string
    state: string
    country: string
    postalCode: string
    phone1: string
    phone2: string
    timeZoneNameGeneral: string
    profileImageID: number
    birthDate: string
    website: string
    trainingClass: string
    experience: string
    yearsExperience: number
    jobTitle: string
    company: string
    industry: string
    urlFacebook: string
    urlTwitter: string
    urlLinkedIn: string
    urlSnapChat: string
    urlInstagram: string
    department: string
    profileImageAssets?: ProfileImageAsset[]
    urlYoutube: string
    otherEmail: {
      activeStatus: string
      address: string
      emailID: number
      modifiedBy: number
      modifiedDate: string
    }[]
    managerID: number
    telecom: {
      telecomGUID: Guid
      label: string
      address: string
      modifiedByID: number
      modifiedDateUTC: string
      seq: number
      hasChange: boolean
    }[]
  }

  interface PersonTeamMembership {
    preferredTeam: number
    TeamID: number
    teamName: string
    teamDesc: string
    elementType: string
    activeStatus: string
    elementSubType: 'ocTEAM' | 'ocDOMAIN' | 'ocPROJECT'
    lvl: number
    sn: number
    tPath: string
    parentID: number
    above?: boolean
    below?: boolean
    direct: boolean
    leader: boolean
    iscascade: boolean
    iscascadeinherited?: boolean
    ParentNamePath: string
    SubDomainParentNamePath: string
    domainID: number
    createByID: number
    createdByName: string
    createdDate: string
    memberTitle: string
    teamOutsideID: string
    teamBoardEMailPreference: string
  }

  interface ReportPreferenceUnsaved {
    emailPreference: keyof typeof TytoData.EmailPreference
    emailPreferencesAvailable: string // * Comma separated list of email preferences
    memberID: number
    reportName: keyof typeof TytoData.KnownReportName
    reportDesc: string
    displayName: string
  }

  interface ReportPreferenceSaved extends TytoData.ReportPreferenceUnsaved {
    createdBy: {
      memberName: string
      ocType: string
      domainID: number
      primaryElementID: number
      activeStatus: keyof typeof TytoData.ActiveStatus
    }
    createdByID: number
    createdDate: string
    modifiedBy: {
      activeStatus: string
      domainID: number
      locID: number
      memberID: number
      memberName: string
      ocType: string
      primaryElementID: number
    }
    modifiedByID: number
    modifiedDate: string
    reportPreferenceID: number
  }

  type ReportPreference =
    | TytoData.ReportPreferenceSaved
    | TytoData.ReportPreferenceUnsaved

  interface AdvancedPersonTeamMembership {
    teamID: number
    memberID: number
    createdBy: number
    createdDate: string
    roleID: number
    memberTitle: string
    isHiddenFromTeam: boolean
    isHiddenFromMember: boolean
    teamBoardEMailPreference: string
    isTeamLeader: boolean
    traitID: number
    isCascade: boolean
  }

  interface TeamMembership {
    TeamID: number
    teamName: string
    teamDesc: string
    teamType: 'ocTEAM'
    lvl: number
    sn: number
    tPath: string
    parentID: number
    above: boolean
    below: boolean
    direct: boolean
    ParentNamePath: string
    subDomainParentNamePath: string
    domainID: number
  }

  interface DISCInfo {
    c1: number
    c2: number
    c3: number
    communicationTips: string
    d1: number
    d2: number
    d3: number
    discID: number
    discPersonActiveStatus: string
    i1: number
    i2: number
    i3: number
    lessonID: number
    memberships: {
      teamID: number
    }[]
    nameStyle3: string
    nameStyleDisplay: string
    peopleKeysAccountID: number
    personID: number
    personName: string
    resultID_clientSide: number
    s1: number
    s2: number
    s3: number
    teamRoot: number
    testDate: string
    useClientSideApi: boolean
    yearBorn: number
  }

  interface TeamToolsInviteEmail {
    date: string
    status: string
  }

  interface TeamToolsPermissions {
    mayTakeDisc: boolean
    mayImportDisc: boolean
    mayTakeBasicTrain: boolean
    mayTakeAdvTrain: boolean
    hasBasicViewDisc: boolean
    hasAdvViewDisc: boolean
    hasPermitChange: boolean
    hasGrantPermitChange: boolean
  }

  interface TeamToolsTeamConfig {
    advTrainingID: number
    basicTrainingID: number
    modifiedByID: number
    modifiedDate: string
    onAdvTrainingComplete: TytoData.TeamToolsPermissions
    onBasicTrainingComplete: TytoData.TeamToolsPermissions
    onDiscComplete: TytoData.TeamToolsPermissions
    onInitialize: TytoData.TeamToolsPermissions
    teamName: string
    teamRoot: nuimber
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
    graphic: iconType
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
    teamToolsInviteEmail?: TeamToolsInviteEmail
    teamToolsPermit: TeamToolsPermissions
  }

  interface DISCTeamProfile {
    styleKey: string
    notes: string
    teamDescription: string
    meetingTips: string
    emailTips: string
    decisionMaking: string
    conflictSources: string
    strengthAreas: string
    challengeAreas: string
    styleName: string
  }

  namespace Tasks {
    interface Mentor {
      mentor: {
        activeStatus: keyof typeof ActiveStatus
        locID: number
        memberID: number
        memberName: string
        ocType: string
        primaryElementID: number
      }
      mentorDesc: string
    }

    type MemberType = 'ocPERSON' | 'ocTEAM'
    interface MemberGeneric<Type extends MemberType> {
      activeStatus: keyof typeof ActiveStatus
      domainID: number
      locID: number
      memberID: number
      memberName: string
      mentors: TytoData.Tasks.Mentor[]
      ocType: Type
      photoAsset: Data.ProfileImageAsset
      primaryElementID: number
    }

    type MemberTeam = MemberGeneric<'ocTEAM'>
    type MemberPerson = MemberGeneric<'ocPERSON'>

    type Member = MemberTeam | MemberPerson
    type VCEPTaskMember = {
      createdByID: number
      createdDateUTC: string
      delgatedFromID: number
      emailPreference: keyof typeof TytoData.EmailPreference
      icalPartRole: TaskMemberICalRole
      icalPartStatus: 'NEEDS_ACTION' | string
      isRsvpExpected: boolean
      member: MemberPerson
      memberID: number
      modifiedByID: number
      modifiedDateUTC: string
      taskID: number
      taskMemberID: number
    }

    interface Milestone {
      keyPerformanceIndicatorTargets: TytoData.DevPlanVCE.KeyPerformanceIndicator[]
      pointOfIntegration: TytoData.PointOfIntegration
      targetQuarter: 1 | 2 | 3 | 4
      targetYear: number
    }

    interface TaskRelation {
      childTaskID: number
      parentTaskID: number
      rootTaskID: number
      seq: number
    }

    interface StepRelation {
      parentDevplanStepID: number
      childDevplanStepID: number
      seq: number
    }

    interface TaskAbout {
      activeStatus: keyof typeof ActiveStatus
      assets: Data.Asset[]
      createdByID: number
      createdDate: string
      devplanMasterID: number
      domainID: number
      elementDesc: string
      elementName: string
      elementSubType: string
      elementType: CatalogTakeableItem.ocDEVPLAN
      libraryItemCount: number
      locID: number
      masteryScore?: number
      modifiedByID: number
      modifiedDate: string
      name: string
      ocType: CatalogTakeableItem.ocDEVPLAN
      outsideID: string
      primaryElementID: number
      profileImageFeaturedID?: number
      profileImageID?: number
    }

    interface VCEPAbout {
      vceplanObject: VCEPlanObject
      devplanMasterID: number
      extensionType: 'ocVCE'
      name: string
      locID: number
      ocType: 'ocDEVPLAN'
      elementName: string
      elementDesc: string
      elementType: 'ocDEVPLAN'
      elementSubType: 'ocVCE'
      domainID: number
      outsideID: string
      createdByID: number
      createdDate: string
      primaryElementID: number
      modifiedByID: number
      modifiedDate: string
      libraryItemCount: number
      assets: Data.Asset[]
      activeStatus: keyof typeof ActiveStatus
    }

    interface VCEPStep {
      about: TytoData.Tasks.VCEPStepAbout
      aboutID: number
      aboutType: 'ocVCEPITEM'
      areChildrenSequential: boolean
      attemptCount: number
      attemptCountMax: number
      createdByID: number
      createdDate: string
      daysUntilDueFromSiblingCompletion: number
      devPlanStepID: number
      absoluteDueDate: string
      durationMinutes: number
      isCompletionOptional: boolean
      modifiedByID: number
      modifiedDate: string
      stepName: string
      setStatus: number
      stepDesc: string
      devPlanID: number
      isMentorOnlyCompletion: boolean
      isRecurrenceScheduledPriorToCompletion: boolean
      stepType: 'ocVACANT'
    }

    interface VCEPTaskAbout {
      name: string
      vcepItemID: number
      descExt: string
      assignTypeMember: TytoData.AssignTypeMember
      assignTypeMentor: TytoData.AssignTypeMentor
      effortMinutesMember: number
      effortMinutesMentor: number
      locID: number
      ocType: 'ocVCEPITEM'
      elementID: number
      elementName: string
      elementDesc: string
      elementType: 'ocVCEPITEM'
      elementSubType: 'ocITEM'
      domainID: number
      outsideID: ''
      createdByID: number
      createdDate: string
      primaryElementID: number
      modifiedByID: number
      modifiedDate: string
      libraryItemCount: number
      assets: Data.Asset[]
      activeStatus: keyof typeof ActiveStatus
      setStatus: TytoData.TaskSetStatus
    }

    interface VCEPStepAbout extends Omit<VCEPTaskAbout, 'assets'> {
      catalogIDs: number[]
      shareChangedByID: number
      shareChangedDate: string
    }

    // * NOTE: Intentional VCEPlan and not VCEPPlan because that is property name from Tyto
    interface VCEPlanObject {
      visionStatement: string
      commitmentStatement: string
      commitmentStatementVertical: string
      sbuFunction: TytoData.SBUFunction
      pointOfIntegration: string
      keyPerformanceIndicators: string[]
    }

    interface TaskGeneric<TType, AboutType, MemType> {
      about: AboutType
      aboutID: number
      aboutType: keyof typeof PlanStepAboutType | ''
      areChildrenSequential: boolean
      attemptCount: number
      attemptCountMax: number
      attemptLastStatus: string
      completedAsOfDate: string
      completedByID: number
      completionNote: string
      countallchildren: number
      countcompletechildren: number
      createdByID: number
      createdDate: string
      daysUntilDueFromSiblingCompletion: number
      devplanStepID: number
      dueDate: string
      durationMinutes: number
      initialStartDate: string
      isCompletionOptional: boolean
      isConfidential: boolean
      locID: number
      memberID: number
      members: MemType[]
      mentorID: number
      modifiedByID: number
      modifiedDate: string
      name: string
      ocType: string
      percentComplete: number
      permission: Data.Permission
      recurrenceID: number
      rootTaskID: number
      setStatus: number
      startDate: string
      taskDesc: string
      taskID: number
      taskName: string
      taskStatus: keyof typeof TytoData.TaskStatus
      taskStatusByID: number
      taskStatusDate: string
      taskType: TType
      verifierTasks: number[]
    }

    type Task = TaskGeneric<
      keyof typeof TytoData.TaskType,
      TytoData.Tasks.TaskAbout
    >
    // 'ocTGPLAN' | 'ocTGMILESTONE' | 'ocCONTAINER' | 'ocVACANT'
    type TGPMilestoneTask = TaskGeneric<'ocTGMILESTONE', never, never> & {
      milestone: TytoData.Tasks.Milestone
    }
    type TGPMainTask = TaskGeneric<'ocTGPLAN', never, never>
    type VCEP = TaskGeneric<'ocCONTAINER', TytoData.Tasks.VCEPAbout, never>
    type VCEPTask = TaskGeneric<
      'ocVACANT',
      TytoData.Tasks.VCEPTaskAbout,
      TytoData.Tasks.VCEPTaskMember
    >

    type TGPTask = TGPMilestoneTask | TGPMainTask | VCEP | VCEPTask
  }

  interface TeamGet {
    teamID: number
    teamName: string
    elementType: string
    teamDesc: string
    teamType: keyof typeof TytoData.TeamType
    domainID: number
    activeStatus: keyof typeof TytoData.ActiveStatus
    address1: string
    address2: string
    city: string
    state: string
    country: string
    postalCode: string
    phone1: string
    phone2: string
    email: string
    fax: string
    teamLeaderID: number
    teamLeaderOutsideID: string
    teamLeaderName: string
    profileImageID: number
    dateFounded: string
    outsideType: string
    teamToolsConfig?: {
      advTrainingID: number
      basicTrainingID: number
      modifiedByID: number
      modifiedDate: string
      onInitialize?: TeamToolsPermissions
      onDiscComplete?: TeamToolsPermissions
      onBasicTrainingComplete?: TeamToolsPermissions
      onAdvTrainingComplete?: TeamToolsPermissions
      teamName: string
      teamRoot: number
    }
    website: string
    outsideExpirationDate: string
    outsideID: string
    lastRefreshWithOutside: string
    achievementIconID: number
    rosterView: boolean
    geographyPostalCode: string
    createdByID: number
    modifiedByID: number
    createdDate: string
    modifiedDate: string
    primaryElementID: number
  }

  // * In Response from api/Team (GET)
  interface TeamInfo {
    achievementIconID: number
    activeStatus: keyof typeof TytoData.ActiveStatus
    address1: string
    address2: string
    city: string
    country: string
    createdByID: number
    createdDate: string
    dateFounded: string
    domainID: number
    elementType: 'ocTEAM'
    email: string
    fax: string
    geographyPostalCode: string
    lastRefreshWithOutside: string
    modifiedByID: number
    modifiedDate: string
    outsideExpirationDate: string
    outsideID: string
    outsideType: string
    phone1: string
    phone2: string
    postalCode: string
    primaryElementID: number
    profileImageID: number
    rosterView: true
    state: string
    teamDesc: string
    teamID: number
    teamLeaderID: number
    teamLeaderName: string
    teamLeaderOutsideID: string
    teamName: string
    teamToolsConfig: TytoData.TeamToolsTeamConfig
    teamType: 'ocTEAM'
    website: string
  }

  interface Team {
    level: number
    iPath: string
    parentID: number
    isAbove: boolean
    isBelow: boolean
    isDirect: boolean
    isLeader: boolean
    isCascade: boolean
    isCascadeInherited: boolean
    isTeamToolsConfig: boolean
    onInitialize?: TeamToolsPermissions
    onDiscComplete?: TeamToolsPermissions
    onBasicTrainingComplete?: TeamToolsPermissions
    onAdvTrainingComplete?: TeamToolsPermissions
    parentNamePath: string
    teamDesc: string
    teamType: keyof typeof TytoData.TeamType
    teamID: number
    profileImageID: number
    outsideType: string
    outsideExpirationDate: string
    name: string
    ocType: keyof typeof TytoData.TeamType
    domainID: number
    subDomainParentNamePath: string
    activeStatus: keyof typeof TytoData.ActiveStatus
  }

  namespace TimeZones {
    interface TimeZone {
      iCalRRule: string
      iCalTZID: string
      iCalTZURL: string
      modifiedDateUTC: string
      nameGeneral: string
      nameObserved: string
      observanceType: keyof typeof TytoData.ObservanceType
      offSetFromMinutes: number
      offSetToMinutes: number
      startDate: string
      timeZoneID: number
    }
  }

  namespace Training {
    interface SubBlockParentBlock {
      blockID: number
      enrollmentID: number
    }

    interface SubBlockParentTask {
      taskID: number
      rootTaskID: number
    }

    interface Summary {
      memberID: number
      blockID: number
      blockName: string
      preReqID: number
      curriculumID: number
      cType: string
      cSubType: string
      stepName: string
      cntAttempts: number
      minutesVidPlayThrough: number
      passStatus: string
      completeStatus: string
      completedDate: string
      lastDate: string
    }

    namespace Summary {
      interface InnerSummaryItem {
        dteRstart: string
        dteRend: string
        countLessonsCompleted: number
        countExamsPassed: number
        countExamsAttempted: number
        minutesVidPlayThrough: number
      }
      interface Item {
        personID: number
        personName: string
        lastActivity: string
        trainingSummary: InnerSummaryItem[]
      }
    }

    interface TrainingItemGeneric {
      audienceDesc: string
      authorID: number
      completePercent: number
      completeStatus: keyof typeof TytoData.CompleteStatus
      courseIdentifier: string
      curriculumDescription: string
      curriculumID: number
      curriculumName: string
      curriculumType: keyof typeof TytoData.CatalogTakeableItem
      curriculumSubType: string
      difficultyDesc: keyof typeof TytoData.DifficultyDesc
      dueDate: string
      durationEstimate: string
      expectationDesc: string
      expirationDate: string
      modifiedDate: string
      onDueDateAction: string
      profileImage: Data.ProfileImageAsset
      profileImageFeatured: Data.ProfileImageAsset
      recertDate: string
      registeredByID: number
      registeredDate: string
      startedDate: string
      statusDate: string
      subTaskRequiredCompleteCount: number
      subTaskRequiredCount: number
      subTaskCompleteCount: number
      subTaskCount: number
    }

    interface Enrollment extends TytoData.Training.TrainingItemGeneric {
      curriculumType: TytoData.CatalogTakeableItem.ocBLOCK
      enrollmentID: number
    }

    interface SubBlock extends TytoData.Training.Enrollment {
      parentBlocks?: SubBlockParentBlock[]
      parentTasks?: SubBlockParentTask[]
    }

    interface Task extends TytoData.Training.TrainingItemGeneric {
      curriculumType: TytoData.CatalogTakeableItem.ocDEVPLAN
      taskID: number
    }
  }

  interface UploadedFile {
    Name: string
    fieldName: string
    fileUploadKey: string
    folderPath: string
    length: number
    md5: string
    mimeType: string
    originalFileName: string
    sessionUploadKey: string
    sizeBytes: number
    uploadTimeSeconds: number
  }

  interface Upload {
    uploadFiles: TytoData.UploadedFile[]
    uploadKey: string
  }
}

export namespace DomainUI {
  type UIConfigType = 'ocTRYYBSTART' | 'ocTRYYBTOPMENU' | 'ocMASTERYSTART'
  type UIConfigActiveStatus =
    | 'ocDRAFT'
    | 'ocENABLED'
    | 'ocDISABLED'
    | 'ocDRAFTABANDON'

  type ListUIConfiguration = Omit<
    UIConfig,
    'libraryLessons' | 'libraryImages'
  > & {
    authorNote: string
    configName: string
    configDescription: string
  }

  interface UIKeyValue {
    teamID: number
    uiKey: string
    uiValue: string
  }

  type Attachment = UIConfigLibraryImageItem | UIConfigLibraryLessonItem

  interface DomainUI {
    domainID: number
    onCourseURL: string
    loginDomainID: string
    otherName: string
    loginURI: string
    showKeepMeLoggedIn: boolean
    forgotPWLabel: string
    forgotPwURI: string
    activateAccountLabel: string
    activateAccountURI: string
    loginNameLabel: string
    isSingleSignOn: boolean
    contactName: string
    contactEmail: string
    contactPhone: string
    taglineLabel: string
    images: DomainUI.Image[]
    keyValues: UIKeyValue[]
  }

  interface Image {
    imageID: number
    aboutID: number
    aboutType: string
    originalMimeType: string
    height: number
    width: number
    length: number
    originalSizeBytes: number
    sequence: number
    orientation: string
    originalMD5: string
    userDescription: string
    pathURL: string
    imageName: string
    originalName: string
    elementType: string
    imageType: string
    activeStatus: string
  }

  interface UIConfigurationRequestAttachment {
    elementID: number
    tag: string
  }

  interface UIConfigMember {
    memberID: number
    memberName: string
  }

  interface UIConfigLesson {
    lessonItemType: string
    lessonType: TytoData.LessonType
    lessonName: string
    assets: Data.Asset[]
    images: Data.LessonImage[]
  }

  interface UIConfigLibraryImageItem {
    item: UIConfigImage
    libraryID: number
    courseItemID: number
    createdDate: string
    tag: string
    activeStatus: string
    modifiedDate: string
    modifiedBy: UIConfigMember
    createdBy: UIConfigMember
  }

  interface UIConfigImage {
    imageID: number
    originalMimeType: string
    height: number
    width: number
    length: number
    pathURL: string
    imageType: string
  }

  interface UIConfigLibraryLessonItem {
    item: UIConfigLesson
    libraryID: number
    courseItemID: number
    createdDate: string
    tag: string
    activeStatus: string
    modifiedDate: string
    modifiedBy: UIConfigMember
    createdBy: UIConfigMember
  }

  interface UIConfig {
    elementType: string
    configType: UIConfigType
    activeStatus: UIConfigActiveStatus
    domainID: number
    outsideID: string
    createdByID: number
    createdDate: string
    primaryElementID: number
    modifiedByID: number
    modifiedDate: string
    shareChangedDate: string
    shareChangedByID: number
    UIconfigGUID: string
    mimeType: string
    mainBody: string
    UIschema: string
    mainBodyIsValid: boolean
    UIschemaValidatorAgent: string
    libraryLessons: UIConfigLibraryLessonItem[]
    libraryImages: UIConfigLibraryImageItem[]
    modifiedBy: UIConfigMember
    createdBy: UIConfigMember
    shareChangedBy: UIConfigMember
  }
}
