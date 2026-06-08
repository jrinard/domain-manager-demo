import { Resource } from '../utils/helpers'

import { ConfigurationClient } from './Configuration.Client'

export class Configuration extends Resource {
  Client!: ConfigurationClient

  protected override addResources(): void {
    this.Client = new ConfigurationClient(this.axiosInstance)
  }
}
