import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './TranscriptTypes'

export class Transcript extends Resource {
  override endpoint = '/transcript'

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
