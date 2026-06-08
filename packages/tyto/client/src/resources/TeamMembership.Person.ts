import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { deleteCall, postCall, putCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

const endpoint = TYTO_ENDPOINT_PATHS.TEAMMEMBERSHIP_PERSON

export class TeamMembershipPerson extends Resource {
  delete(
    params: Endpoints.Tyto.TeamMembership.Person.Delete.Parameters,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.TeamMembership.Person.Delete.Response>(
      this.axiosInstance,
      endpoint,
      { ...params },
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.TeamMembership.Person.PostParameters,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.TeamMembership.Person.Post.Response>(
      this.axiosInstance,
      endpoint,
      { ...params },
      callOpts
    )
  }
  put(
    params: Endpoints.Tyto.TeamMembership.Person.PutParameters,
    callOpts?: CallOpts
  ) {
    return putCall<Endpoints.Tyto.TeamMembership.Person.Put.Response>(
      this.axiosInstance,
      endpoint,
      { ...params },
      callOpts
    )
  }
}
