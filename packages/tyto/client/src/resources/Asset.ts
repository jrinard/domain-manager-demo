import { Resource } from '../utils/helpers'

import { AssetEncoding } from './Asset.Encoding'

/**
 * Has no direct verbs
 */
export class Asset extends Resource {
  Encoding?: AssetEncoding

  protected override addResources(): void {
    this.Encoding = new AssetEncoding(this.axiosInstance)
  }
}
