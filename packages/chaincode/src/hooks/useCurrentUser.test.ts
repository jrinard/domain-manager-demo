import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useCurrentUser } from './useCurrentUser'
import { LOC_STOR, SES_STOR } from '@spacedock/cargo-bay'

describe('useCurrentUser', () => {
  afterEach(() => {
    LOC_STOR.clear()
  })
  it('returns user when session user is set', async () => {
    SES_STOR.set('active-session-key', '1234')
    LOC_STOR.set(
      'stored-sessions',
      JSON.stringify([
        {
          profileThumbPath:
            '/tyto/api/person/profilephoto?assetID=2218073&encoding=ocDEFAULT',
          sessionKey: '1234',
          userID: 1239853,
          userName: 'John Bailey',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '2023-06-26T19:58:04.62+00:00',
          domainID: 1698652,
          timeOutMnts: 2160,
          onCourseURL: 'https://cardoneventuresceo.com',
          roleID: 432,
        },
      ])
    )
    const { result } = renderHook(() => useCurrentUser(), {})
    expect(result.current).toHaveProperty('userID', 1239853)
  })
})
