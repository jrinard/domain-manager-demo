export interface MembersTab {
  itemTraitID: number
  traitID: number
  aboutID: number
  aboutType: string
  traitValue: string
  activeStatus: string
  createdByID: number
  createdDate: string
  modifiedByID: number
  modifiedDate: string
  trait: Trait
}

export interface Trait {
  traitName: string
  traitDesc: string
  domainID: number
  teamRoot: number
  color: string
  aboutType: string
  traitCategory: string
  seq: number
  activeStatus: string
  createdByID: number
  createdDate: string
  modifiedByID: number
  modifiedDate: string
  iconPath: string
  ssoMethod: string
  iconPathLarge: string
  iconPathUrl: string
  iconPathLargeUrl: string
}
