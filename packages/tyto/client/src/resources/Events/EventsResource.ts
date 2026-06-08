import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './EventsTypes'

export class Events extends Resource {
  override endpoint = '/events'

  get(params?: GetParameters): Promise<GetResponse> {
    if (params && params.filterTimeUTC_max) {
      params.filterTimeUTC_max = encodeURIComponent(
        new Date(params.filterTimeUTC_max).toUTCString()
      )
    }
    if (params && params.filterTimeUTC_min) {
      params.filterTimeUTC_min = encodeURIComponent(
        new Date(params.filterTimeUTC_min).toUTCString()
      )
    }

    return new Promise((res, rej) => {
      this.axiosInstance
        .get<GetResponse>(this.endpoint, {
          params: {
            above: false,
            below: false,
            direct: true,
            filterActiveStatus: 'ocENABLED',
            ...params,
          },
        })
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }
}
