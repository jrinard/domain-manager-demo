import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import {
  getCall,
  postCall,
  putCall,
  deleteCall,
  CallOpts,
} from '../utils/utils'
import { Resource } from '../utils/helpers'

import { PersonAdvanced } from './PersonAdvanced'
import { PersonMyPassword } from './Person.MyPassword'
import { PersonPassword } from './Person.Password'
import { ProfilePhoto } from './Person.ProfilePhoto'
import { TeamMembershipPerson } from './TeamMembership.Person'
import { PersonNotices } from './Person.Notices'

const endpoint = TYTO_ENDPOINT_PATHS.PERSON

export class Person extends Resource {
  AdvancedSearch?: PersonAdvanced
  /**
   * Update password for one's own, currently authenticated Account
   */
  MyPassword?: PersonMyPassword
  /**
   * Update password for a *different* users account (not the currently authenticated user)
   */
  Password?: PersonPassword
  ProfilePhoto?: ProfilePhoto
  Notices?: PersonNotices
  TeamMembership?: TeamMembershipPerson

  protected override addResources(): void {
    this.AdvancedSearch = new PersonAdvanced(this.axiosInstance)
    this.MyPassword = new PersonMyPassword(this.axiosInstance)
    this.Password = new PersonPassword(this.axiosInstance)
    this.ProfilePhoto = new ProfilePhoto(this.axiosInstance)
    this.Notices = new PersonNotices(this.axiosInstance)
    this.TeamMembership = new TeamMembershipPerson(this.axiosInstance)
  }

  get(
    params: Endpoints.Tyto.Person.Get.Parameters & Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts,
  ): Promise<Endpoints.Tyto.Person.Get.Response> {
    return getCall(this.axiosInstance, endpoint, { ...params }, callOpts)
  }
  post(
    params: Endpoints.Tyto.Person.PostParameters,
    callOpts?: CallOpts,
  ): Promise<{ personID: number; recordsAffected: number }> {
    return postCall(this.axiosInstance, endpoint, { ...params }, callOpts)
  }
  put(params: Endpoints.Tyto.Person.PutParameters, callOpts?: CallOpts) {
    return putCall(this.axiosInstance, endpoint, { ...params }, callOpts)
  }
  delete(params: Endpoints.Tyto.Person.DeleteParameters, callOpts?: CallOpts) {
    return deleteCall(
      this.axiosInstance,
      endpoint,
      { ...params },
      { paramsAsData: true, ...(callOpts || {}) },
    )
  }
}
