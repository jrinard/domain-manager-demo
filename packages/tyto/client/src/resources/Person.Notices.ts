import type { AxiosInstance } from 'axios'
import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { getCall, CallOpts } from '../utils/utils'
import { ApplyAxios } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.PERSON_NOTICES

export class PersonNotices extends ApplyAxios {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance)
  }

  get(
    params: Endpoints.Tyto.Person.Notices.Get.Parameters,
    callOpts?: CallOpts
  ) {
    return getCall<Endpoints.Tyto.Person.Notices.Get.Response>(
      this.axiosInstance,
      endpoint,
      params || {},
      callOpts
    )
  }
}
