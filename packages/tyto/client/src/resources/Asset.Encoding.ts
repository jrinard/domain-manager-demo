import type { Endpoints } from '../typings'
import { TYTO_ENDPOINT_PATHS } from '../constants'
import { deleteCall, postCall, CallOpts } from '../utils/utils'
import { Resource } from '../utils/helpers'

export class AssetEncoding extends Resource {
  static endpoint = TYTO_ENDPOINT_PATHS.ASSET_ENCODING
  delete(
    params: Endpoints.Tyto.Asset.Encoding.Delete.Parameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return deleteCall<Endpoints.Tyto.Asset.Encoding.Delete.Response>(
      this.axiosInstance,
      AssetEncoding.endpoint,
      params,
      callOpts
    )
  }
  post(
    params: Endpoints.Tyto.Asset.Encoding.PostParameters &
      Endpoints.Tyto.MetaArgs,
    callOpts?: CallOpts
  ) {
    return postCall<Endpoints.Tyto.Asset.Encoding.Post.Response>(
      this.axiosInstance,
      AssetEncoding.endpoint,
      params,
      callOpts
    )
  }
}
