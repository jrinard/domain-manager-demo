import { DateISO8601 } from '@tyto/manifest'

export interface StartStats {
  memberRepresentation: MemberRepresentation[]
  memberStandings: MemberStanding[]
  teamStandings: TeamStanding[]
}

export interface MemberRepresentation {
  memberID: number
  memberName: string
  roleID: number
  roleName: string
  jobTitle: string
  email: string
  profileImage?: ProfileImage
}

export interface MemberStanding {
  memberID: number
  cvPoints: number
  givenName: string
  familyInitial: string
  profileImage?: ProfileImage
}

export interface ProfileImage {
  assetID: number
  assetName: string
  assetDesc: string
  assetType: string
  orientation: string
  modifiedDate: DateISO8601
  modifiedByID: number
  createdDate: DateISO8601
  createdByID: number
  createdByName: string
  sequence: number
  softwareRequirements: string
  originalMD5: string
  domainID: number
  encodings: Encoding[]
  courseItemID: number
}

export interface Encoding {
  encodingType:
    | 'ocORIGINAL'
    | 'ocDEFAULT'
    | 'ocTHUMBNAIL'
    | 'ocSMALL'
    | 'ocMEDIUM'
    | 'ocLARGE'
  mimeType: string
  modifiedDate: DateISO8601
  height: number
  width: number
  length: number
  sizeBytes: number
  techNote: string
  activeStatus: string
  pathURL: string
}

export interface TeamStanding {
  teamName: string
  cvPointsMeanPerMember: number
}
