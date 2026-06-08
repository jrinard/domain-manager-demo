import { keyBy } from 'lodash'
import { ALL_SECURITY_FUNCTIONS } from './constants'
import type { SecurityFunction, FunctionName } from './derived-types'

// * NOTE: Not using `FunctionID` because the code elsewhere where we use this will always complain about trying to access it with `type number`. Which is annoying.
export const FUNCTIONS_BY_ID = keyBy(
  ALL_SECURITY_FUNCTIONS,
  'functionID',
) as Record<number, SecurityFunction>

export const FUNCTIONS_BY_NAME = keyBy(
  ALL_SECURITY_FUNCTIONS,
  'functionName',
) as Record<FunctionName, SecurityFunction>

export const MENU_ITEMS = ALL_SECURITY_FUNCTIONS.filter(
  (func) =>
    (func as SecurityFunction).uiType === 'ocPAGE' ||
    func.functionName === 'Page TeamEditor', // * NOTE: Is a MANAGE Item, but also shows up in normal Menu
) as SecurityFunction[]
export const MANAGE_MENU_ITEMS = ALL_SECURITY_FUNCTIONS.filter(
  (func) => (func as SecurityFunction).uiType === 'ocPAGEMANAGE',
) as SecurityFunction[]
