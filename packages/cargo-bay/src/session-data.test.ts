import { describe, it, expect } from 'vitest'
import { getActiveSession, setActiveSession } from './session-data'
import { LOC_STOR } from './browser-storage'

describe('Session', () => {
  describe('setActiveSession()', () => {
    it('returns SessionData', () => {
      setActiveSession('sgsdfgdfgs')
      vi.spyOn(LOC_STOR, 'get').mockImplementation(() => {
        return '[{"userID":2209853,"userName":"John Bailey","changePassword":false,"termsOfServiceSignatureRequired":false,"adminID":0,"teamListSyncDate":"1900-01-01T00:00:00+00:00","koPermissionSyncDate":"2023-10-23T17:49:53.013+00:00","domainID":1698652,"timeOutMnts":2160,"onCourseURL":"https://cardoneventuresceo.com","profileThumbPath":"/tyto/api/person/profilephoto?assetID=2218073&encoding=ocDEFAULT","teamRootID":1763850,"roleID":432,"onlinePreference":"ocAVAILABLE","sessionKey":"7TSCJ6Q982JFB7TV29JFCR1VJ2LXV3H288DR90QLYRHZHVXLYYS4F5Z3N394K0BR"}]'
      })
      expect(getActiveSession()).toBeUndefined()
    })
  })
})
