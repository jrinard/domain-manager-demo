export interface Role {
  roleID: number
  teamRoot: number
  roleName: string
  roleDesc: string
  teamName: string
  iPath: string
  parentNamePath: string
  domainID: number
  hasView: boolean
  hasChange: boolean
  hasDelete: boolean
}
