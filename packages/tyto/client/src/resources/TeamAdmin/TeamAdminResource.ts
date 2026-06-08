import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './TeamAdminTypes'

export class TeamAdmin extends Resource {
  override endpoint = '/team/admin'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
