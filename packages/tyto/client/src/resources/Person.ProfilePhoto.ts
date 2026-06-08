import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.PERSON_PROFILEPHOTO

interface RespType extends Endpoints.GenericRespData {
  profileImageID: number
}

export class ProfilePhoto extends Resource {
  post(
    params: Endpoints.Tyto.Person.ProfilePhoto.Post.Parameters,
    callOpts?: CallOpts
  ) {
    return postCall<RespType>(this.axiosInstance, endpoint, params, callOpts)
  }
}
