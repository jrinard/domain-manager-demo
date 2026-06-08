import { TytoBaseResponse } from '@tyto/manifest'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { isFunction } from 'lodash'

export interface IResource {
  new (axiosInstance: AxiosInstance): Resource
}

export class Resource {
  endpoint?: string | ((params: object) => string)
  protected axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
    this.addResources()
  }

  /**
   * For any sub-resources
   */
  protected addResources() {
    //
  }

  protected getEndpointURL(params: object): string {
    if (this.endpoint == null) {
      throw new Error('Resource endpoint is not defined')
    }
    return isFunction(this.endpoint) ? this.endpoint(params) : this.endpoint
  }

  protected read<R extends TytoBaseResponse>(params: object): Promise<R> {
    return this.request<R>({
      method: 'GET',
      params,
      url: this.getEndpointURL(params),
    })
  }

  protected create<R extends TytoBaseResponse>(
    data: object,
    dataParser?: null | ((data: object) => object),
    opts?: Omit<AxiosRequestConfig, 'data' | 'url'>,
  ): Promise<R> {
    return this.request<R>({
      method: 'POST',
      data:
        dataParser !== undefined && dataParser !== null
          ? dataParser(data)
          : data,
      url: this.getEndpointURL(data),
      ...(opts || {}),
    })
  }

  protected update<R extends TytoBaseResponse>(data: object): Promise<R> {
    return this.request<R>({
      method: 'PUT',
      data,
      url: this.getEndpointURL(data),
    })
  }

  protected remove<R extends TytoBaseResponse>(
    data: object,
    dataAsParams = false,
  ): Promise<R> {
    if (this.endpoint === undefined) {
      throw new Error('Resource endpoint is not defined')
    }
    const config: AxiosRequestConfig<object> = {}

    // * Some Tyto DELETE endpoints expect params to be passed in as data, not as params.
    // * "That's just the way it is"
    // * - Tupac Shakur
    if (dataAsParams) {
      config.data = data
    } else {
      config.params = data
    }
    return this.request<R>({
      method: 'DELETE',
      url: this.getEndpointURL(data),
      ...config,
    })
  }

  protected request<R extends TytoBaseResponse>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return new Promise((res, rej) => {
      this.axiosInstance
        .request<R>(config)
        .then((resp) => {
          res(resp.data)
        })
        .catch(rej)
    })
  }
}
