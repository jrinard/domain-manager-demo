import { Resource } from '../utils/helpers'

import { DISCProfileInteractive } from './DiscProfile.Interactive'
import { DISCProfileTeam } from './DiscProfile.Team'

export class DISCProfile extends Resource {
  interactive?: DISCProfileInteractive
  team?: DISCProfileTeam

  protected override addResources() {
    this.interactive = new DISCProfileInteractive(this.axiosInstance)
    this.team = new DISCProfileTeam(this.axiosInstance)
  }
}
