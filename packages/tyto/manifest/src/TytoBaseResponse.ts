import { Data } from '@spacedock/manifest'

export interface Link {
  encType: EncType
  contentType: ContentType
  href: string
  media: string
  method: Method
  targetPref: string
  title: string
  parameters: Parameter[]
  rel: string[]
}

export type ContentType = 'application/json' | 'text/calendar' | 'image/*'

export type EncType = 'application/x-www-form-urlencoded'

export type Method = 'get' | 'put' | 'post'

export interface Parameter {
  paramName: string
  paramType: string
  functionParamMap?: string
}

export interface TytoBaseResponse {
  session?: Data.SessionData
  error: Data.TytoErrorObject
  links: Link[]
}
