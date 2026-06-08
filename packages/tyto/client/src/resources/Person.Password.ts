import type { Data } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { putCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.PERSON_PASSWORD

export class PersonPassword extends ApplyAxios {
  put(
    params: Endpoints.Tyto.Person.Password.PutParameters,
    callOpts?: CallOpts
  ) {
    return putCall<{
      recordsAffected: number
      session: Data.SessionData
    }>(
      this.axiosInstance,
      endpoint,
      { ...params },
      { circumventChangePasswordCheck: true, ...(callOpts || {}) }
    )
  }
}
