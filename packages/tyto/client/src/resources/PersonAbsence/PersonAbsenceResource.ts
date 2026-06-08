import { Resource } from '../../utils/helpers'
import {
  GetParameters,
  GetResponse,
  PutParameters,
  PutResponse,
} from './PersonAbsenceTypes'

export class PersonAbsence extends Resource {
  override endpoint = '/PersonAbsence'

  get(params: GetParameters): Promise<GetResponse> {
    return this.read<GetResponse>(params)
  }

  put(data: PutParameters): Promise<PutResponse> {
    return this.update<PutResponse>(data)
  }
}
