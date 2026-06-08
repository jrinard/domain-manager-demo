import { Resource } from '../../utils/helpers'
import { PutParameters, PutResponse } from './TeamMembershipTeamTypes'

export class TeamMembershipTeam extends Resource {
  override endpoint = '/TeamMembership/Team'

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
