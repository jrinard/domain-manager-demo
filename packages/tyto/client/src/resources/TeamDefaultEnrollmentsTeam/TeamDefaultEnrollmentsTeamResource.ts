import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TeamDefaultEnrollmentsTeamTypes'

export class TeamDefaultEnrollmentsTeam extends Resource {
  override endpoint = '/teamDefaultEnrollments/Team'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
