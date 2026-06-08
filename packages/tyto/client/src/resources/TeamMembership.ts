import { Resource } from '../utils/helpers'

import { TeamMembershipPerson } from './TeamMembership.Person'

export class TeamMembership extends Resource {
  Person?: TeamMembershipPerson

  protected override addResources(): void {
    this.Person = new TeamMembershipPerson(this.axiosInstance)
  }
}
