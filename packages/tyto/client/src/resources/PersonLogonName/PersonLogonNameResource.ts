import { Resource } from '../../utils/helpers'
import { PutParameters, PutResponse } from './PersonLogonNameTypes'

export class PersonLogonName extends Resource {
  override endpoint = '/person/logonName'

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
