import { TytoData } from '@spacedock/manifest'

export interface Team {
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
  elementType: 'ocTEAM' //TytoData.ElementType.ocTEAM - Does not work in Test
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
  rosterView: boolean
  state: string
  teamDesc: string
  teamID: number
  teamLeaderID: number
  teamLeaderName: string
  teamLeaderOutsideID: string
  teamName: string
  teamToolsConfig: TytoData.TeamToolsTeamConfig
  teamType: keyof typeof TytoData.TeamType
  website: string
}

export interface ProfileImage {
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
