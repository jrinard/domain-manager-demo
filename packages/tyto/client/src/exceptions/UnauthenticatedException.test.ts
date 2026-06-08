import { describe, expect, it } from 'vitest'
import {
  UnauthenticatedException,
  UnauthenticatedReason,
} from './UnauthenticatedException'

describe('UnauthenticatedException', () => {
  it('returns undefined', () => {
    expect(
      UnauthenticatedException.fromTytoError(200, {
        session: {
          sessionKey: 'valid-key',
          userID: 1,
          userName: 'Kyle Soltes',
          changePassword: false,
          termsOfServiceSignatureRequired: false,
          adminID: 0,
          teamListSyncDate: '1900-01-01T00:00:00+00:00',
          koPermissionSyncDate: '1900-01-01T00:00:00+00:00',
          domainID: 1,
          timeOutMnts: 90,
          onCourseURL: 'https://cardoneventuresceo.com',
          roleID: 432,
        },
        error: {
          sts: 0,
          msg: 'initialized',
        },
        links: [],
      })
    ).toBe(undefined)
  })
  it('returns MissingToken for when the token is missing (e.g. sessionKey)', () => {
    const result = UnauthenticatedException.fromTytoError(401, {
      error: {
        sts: -297,
        msg: 'The request failed authentication',
        logID: 225291190,
        technical: 'Session request is malformed missing',
      },
      links: [],
    })
    expect(result).toBeInstanceOf(UnauthenticatedException)
    expect(result?.code).toEqual(UnauthenticatedReason.MissingToken)
  })
  it('returns Invalid when sessionKey is not valid', () => {
    const result = UnauthenticatedException.fromTytoError(401, {
      error: {
        sts: -298,
        msg: 'The request failed authentication',
        logID: 225291286,
        technical: 'sessionKey not valid\r\n',
      },
      links: [],
    })
    expect(result).toBeInstanceOf(UnauthenticatedException)
    expect(result?.code).toEqual(UnauthenticatedReason.Invalid)
  })
  it('returns session expired', () => {
    const result = UnauthenticatedException.fromTytoError(401, {
      error: {
        sts: -299,
        msg: 'The request failed authentication',
        logID: 225279446,
        technical: 'session ended or revoked\r\n',
      },
      links: [],
    })
    expect(result).toBeInstanceOf(UnauthenticatedException)
    expect(result?.code).toEqual(UnauthenticatedReason.Expired)
  })
})
