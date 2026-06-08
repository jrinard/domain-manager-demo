import { HttpStatusCode } from 'axios'
import { get } from 'lodash'
import { TytoBaseResponse } from '@tyto/manifest'

export enum UnauthenticatedReason {
  Expired = 'Session key expired',
  Invalid = 'Session not valid or not present',
  MissingToken = 'Session Key is missing from the request',
  NotSpecified = 'Non-authentication reason unspecified',
}
export class UnauthenticatedException extends Error {
  code: UnauthenticatedReason
  constructor(code: UnauthenticatedReason) {
    super(code)
    this.code = code

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, UnauthenticatedException.prototype)
  }

  /**
   * If the return is undefined then the error is not an UnauthenticatedException
   * @param status
   * @param body
   */
  static fromTytoError(
    status: HttpStatusCode,
    body: TytoBaseResponse
  ): UnauthenticatedException | undefined {
    const sts: number = get(body, 'error.sts', -1)
    if (sts === -297) {
      return new UnauthenticatedException(UnauthenticatedReason.MissingToken)
    } else if (sts === -298) {
      return new UnauthenticatedException(UnauthenticatedReason.Invalid)
    } else if (sts === -299) {
      return new UnauthenticatedException(UnauthenticatedReason.Expired)
    }
    if (status === HttpStatusCode.Unauthorized) {
      return new UnauthenticatedException(UnauthenticatedReason.NotSpecified)
    }
    return undefined
  }
}
