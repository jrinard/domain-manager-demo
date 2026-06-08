import { ALL_SECURITY_FUNCTIONS } from './constants'

export type FunctionName =
  (typeof ALL_SECURITY_FUNCTIONS)[number]['functionName']
export type FunctionID = (typeof ALL_SECURITY_FUNCTIONS)[number]['functionID']
export type FunctionType =
  (typeof ALL_SECURITY_FUNCTIONS)[number]['functionType']
export type UIType = 'ocDATA' | 'ocUI' | 'ocPAGE' | 'ocPAGEMANAGE'

export interface SecurityFunction {
  functionName: FunctionName
  functionID: FunctionID
  functionDesc: string
  functionType: FunctionType
  param1Desc: string
  param2Desc: string
  param3Desc: string
  param4Desc: string
  menuDisplayName?: undefined
  uiType?: UIType
}
