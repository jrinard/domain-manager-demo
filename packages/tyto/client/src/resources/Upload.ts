import type { TytoData } from '@spacedock/manifest'
import type { Endpoints } from '../typings'
import { postFormCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class Upload extends Resource {
  post(params: Endpoints.Tyto.Upload.Post.Parameters, callOpts?: CallOpts) {
    const { endpointURL, ...rest } = params || {}

    if (!endpointURL) {
      throw new Error('endpointURL is required')
    }

    if (!('files' in rest)) {
      throw new Error('No Files were Supplied to upload')
    }

    return postFormCall<TytoData.Upload, { files: (File | Blob)[] }>(
      this.axiosInstance,
      endpointURL || '',
      rest,
      {
        ...(callOpts || {}),
      }
    )
  }
}
