import { get, omit } from 'lodash'
import { Resource } from '../../utils/helpers'
import { PostParameters, PostResponse } from './EventAgendaTypes'

export class EventAgenda extends Resource {
  override endpoint = (params: object) =>
    `/event/${get(params, 'eventID', undefined)}/agenda`

  post(data: PostParameters & { eventID: number }): Promise<PostResponse> {
    return this.create<PostResponse>(data, (data) => omit(data, 'eventID'))
  }
}
