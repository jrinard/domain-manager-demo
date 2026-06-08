import { TytoBaseResponse } from '@tyto/manifest'

export interface GetParameters {
  functionName: string
  teamID: number
}

export interface GetResponse extends TytoBaseResponse {
  people: People[]
}

export interface People {
  userID: number
  roleID: number
  roleName: string
  givenName: string
  familyName: string
  familiarName: string
  countLookingDown: number
  countLookingUp: number
  countLookingDirect: number
  lowTeam?: LowTeam
}

export interface LowTeam {
  subDomainParentNamePath: string
  teamName: string
  teamID: number
}
