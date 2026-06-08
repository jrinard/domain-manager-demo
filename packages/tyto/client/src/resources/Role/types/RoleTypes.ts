export interface Role {
  roleID: number
  teamRoot: number
  roleName: string
  roleDesc: string
  teamName: string
  iPath: string
  parentNamePath: string
  domainID: number
  roleFunctionScopes: RoleFunctionScope[]
}

export interface RoleFunctionScope {
  roleID: number
  functionID: number
  scopeAdd: string
  scopeView: string
  scopeChange: string
  scopeDelete: string
  modifiedDate: string
  modifiedByID: number
  createdByID: number
  createdDate: string
  note: string
  ocfunction: string
  availableScopeAdd: AvailableScope[]
  availableScopeView: AvailableScope[]
  availableScopeChange: AvailableScope[]
  availableScopeDelete: AvailableScope[]
}

export interface AvailableScope {
  roleID: number
  functionOperationScopeDesc: string
  scopeDesc: string
  scope: string
}
