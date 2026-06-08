import { Resource } from '../../utils/helpers'
import { GetParameters } from './PersonProfilePhotoTypes'

export class PersonProfilePhoto extends Resource {
  override endpoint = '/Person/ProfilePhoto'

  get(params: GetParameters) {
    const uri = this.axiosInstance.getUri()

    const url = new URL(`${uri}${this.endpoint}`)

    url.searchParams.set('personID', params.personID.toString())
    url.searchParams.set('silhouette', params.silhouette)

    // * Admittedly funky... Just having return a `Promise` to be like every other endpoint which does so.
    return Promise.resolve({
      url: url.toString(),
    })
    // // return this.read<GetResponse>(params)
  }
}
