import { set } from 'lodash'
import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './DiscProfilesMiniTypes'

export class DiscProfilesMini extends Resource {
  override endpoint = '/DiscProfiles/Mini'

  get(params: GetParameters) {
    const mappedParameters: Record<string, unknown> = {
      ...params,
    }
    if (params.emails) {
      set(mappedParameters, 'emails', params.emails.join(','))
    }
    if (params.personIDs) {
      set(mappedParameters, 'personIDs', params.personIDs.join(','))
    }
    return this.read<GetResponse>(params)
  }
}
