export interface DiscProfile {
  permitMatrix: PermitMatrix
  personID: number
  primaryElementID: number
  teamRoot: number
  personName: string
  profileImageID: number
  d3?: number
  i3?: number
  s3?: number
  c3?: number
  d2?: number
  i2?: number
  s2?: number
  c2?: number
  d1?: number
  i1?: number
  s1?: number
  c1?: number
  styleKey3: string
  styleName3?: string
  descriptionGeneral?: string
  profileImageAsset?: ProfileImageAsset
  emails: string[]
  jobTitle: string
  phone1: string
  graphic?: string
  lastActivity: Date
  isTeamLeader: boolean
  teamToolsPermit: TeamToolsPermit
  teamToolsInviteEmail: TeamToolsInviteEmail
  discOptOut: OptOutLevel
  pdfLessonID?: number
  discStatus: Status
  domainID: number
  domainName: DomainName
  testDate?: Date
  atsInitialsNatural?: string
  atsInitialsAdaptive?: string
  discID?: number
  provider: Provider
  extUrl?: string
}

export type OptOutLevel = 'ocVACANT' | 'ocLEVEL00' | 'ocLEVEL10' | 'ocLEVEL20'

export type Status = 'ocENABLED' | 'ocDISABLED' | 'ocNOTSTARTED'

export type DomainName = 'Cardone Ventures' | '10X Certified Coaches'

export interface PermitMatrix {
  discStyle: { [key: string]: PDF }
  discStyleIntensity_: PDF
  discStyleInteraction_: PDF
  discStyleTeam_: PDF
  percentile_: PDF
  discCommTip_: PDF
  Pdf: PDF
  SCORES_: PDF
}

export interface PDF {
  reason: Reason
  HIDE: boolean
}

export type Reason = 'SHOWOTHERS' | 'OPTOUT' | 'SHOWSELF'

export interface ProfileImageAsset {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: AssetType
  orientation: Orientation
  modifiedDate: Date
  modifiedByID: number
  createdDate: Date
  createdByID: number
  createdByName: string
  sequence: number
  softwareRequirements: string
  originalMD5: string
  domainID: number
  encodings: Encoding[]
  courseItemID: number
}

export type AssetType = 'ocPhoto'

export interface Encoding {
  encodingType: EncodingType
  mimeType: MIMEType
  modifiedDate: Date
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: Status
  pathURL: string
}

export type EncodingType = 'ocDEFAULT' | 'ocORIGINAL' | 'ocTHUMBNAIL'

export type MIMEType = 'image/jpeg' | 'image/png'

export type Orientation = 'ocVOID'

export type Provider = 'Assessments247.net' | 'PeopleKeys'

export interface TeamToolsInviteEmail {
  status: OptOutLevel
  date: Date
}

export interface TeamToolsPermit {
  mayTakeDisc: boolean
  mayImportDisc: boolean
  mayTakeBasicTrain: boolean
  mayTakeAdvTrain: boolean
  hasBasicViewDisc: boolean
  hasAdvViewDisc: boolean
  hasPermitChange: boolean
  hasGrantPermitChange: boolean
}

export interface Permit {
  isSelf: boolean
  hasAdminReveal: boolean
  subjectReveal: boolean
  hasBasicView: boolean
  hasAdvanceView: boolean
  optOutLevel: OptOutLevel
  spoilerMode: OptOutLevel
}
