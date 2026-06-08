import { Resource } from '../../utils/helpers'
import { PutParameters, PutResponse } from './PersonPasswordTypes'

export class PersonPassword extends Resource {
  override endpoint = '/Person/Password'

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
