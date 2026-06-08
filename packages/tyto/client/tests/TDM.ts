import { defaultsDeep } from 'lodash'
import { TytoBaseResponse } from '@tyto/manifest'

import { faker } from '@faker-js/faker/locale/en_US'
import { Data } from '@spacedock/manifest'

export const createSession = (
  scenario: 'authenticated-online' = 'authenticated-online'
): Data.SessionData => {
  return {
    userID: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
    userName: faker.person.fullName(),
    changePassword: false,
    termsOfServiceSignatureRequired: false,
    adminID: 0,
    teamListSyncDate: '1900-01-01T00:00:00+00:00',
    koPermissionSyncDate: '2023-06-21T19:29:34.66+00:00',
    domainID: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
    timeOutMnts: 2160,
    onCourseURL: 'https://cardoneventuresceo.com',
    profileThumbPath:
      '/v2/domains/1698652/assets/2209853_kvemjhrbf1w_200px.jpg',
    teamRootID: faker.helpers.rangeToNumber({ min: 10000, max: 100000 }),
    roleID: faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
    onlinePreference: 'ocAVAILABLE',
  }
}

export const createTytoResponseBase = (
  overrides?: Partial<TytoBaseResponse>
): TytoBaseResponse => {
  return defaultsDeep(
    {
      session: createSession(),
      error: { logID: 0, msg: '', sts: 0, technical: '' },
    },
    overrides
  ) as TytoBaseResponse
}
