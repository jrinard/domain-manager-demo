import { Resource } from '../../utils/helpers'
import { PutParameters, PutResponse } from './DomaintermsTypes'

export class Domainterms extends Resource {
  override endpoint = '/domain/terms'

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
