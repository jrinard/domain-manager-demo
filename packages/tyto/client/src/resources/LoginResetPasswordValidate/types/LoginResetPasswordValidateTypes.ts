export interface Domain {
  passwordLength: number
  loginDomainID: string
  domainID: number
  onCourseURL: string
  otherName: string
}

export interface PWSession {
  sessionKey: string
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
