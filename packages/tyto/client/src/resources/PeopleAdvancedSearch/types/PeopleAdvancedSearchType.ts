export interface AdvancedPerson {
  _LOCAL_isDeactivated?: boolean
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

export interface AdvancedPersonTeamMembership {
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

export interface TeamMembership {
  teamID: number
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
  parentNamePath: string
  subDomainParentNamePath: string
  domainID: number
}

export interface Distance {
  elementID: number
  elementType: string
  street1: string
  street2: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  latitude: number
  longitude: number
  distance: number
}

export interface Badge {
  elementID: number
  elementType: string
  badgeID: number
  badgeName: string
  awardedDate: string
}

export interface ItemTrait {
  aboutID: number
  aboutType: string
  itemTraitID: number
  traitValue: string
  traitID: number
}

export interface Trait {
  traitID: number
  traitName: string
  traitDesc: string
  domainID: number
  teamRoot: number
  color: string
  aboutType: string
  traitCategory: string
  seq: number
  activeStatus: string
  createdBy: number
  createdDate: string
  modifiedBy: number
  modifiedDate: string
  iconPath: string
}
