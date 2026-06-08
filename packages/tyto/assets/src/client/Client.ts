import { SessionHandling } from '@spacedock/cargo-bay'
import { Data } from '@spacedock/manifest'
import { UnauthenticatedException } from '@tyto/client'
import {
  AxiosInstance,
  AxiosResponse,
  AxiosStatic,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios'
import fileDownload from 'js-file-download'
import { set } from 'lodash'

type Config = InternalAxiosRequestConfig<{ sessionKey?: string | null }>

export type TytoAssetsClientProps = {
  axiosStatic: AxiosStatic
  baseURL?: string
}

export class TytoAssetsClient {
  protected axiosInstance: AxiosInstance
  constructor({ axiosStatic, baseURL }: TytoAssetsClientProps) {
    this.axiosInstance = axiosStatic.create({
      baseURL,
    })
    this.axiosInstance.interceptors.request.use(
      (config: Config): Config => {
        const sessionKey = SessionHandling.getActiveSessionKey()
        if (!sessionKey) {
          throw UnauthenticatedException.fromTytoError(
            HttpStatusCode.Unauthorized,
            {
              error: {
                logID: 0,
                msg: 'The request failed authentication',
                sts: -297,
                technical: 'No session key',
              },
              links: [],
            }
          )
        }
        set(config, 'params.sessionKey', sessionKey)
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<Blob, Config>) => {
        if (res.data.type === 'text/html') {
          throw UnauthenticatedException.fromTytoError(
            HttpStatusCode.Unauthorized,
            {
              error: {
                logID: 0,
                msg: 'The request failed authentication',
                sts: -297,
                technical: 'No session key',
              },
              links: [],
            }
          )
        }
        return res
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  public getOrigin() {
    return this.axiosInstance.getUri()
  }

  async downloadEncoding(props: {
    encoding: Data.Encoding
    onSuccess: () => void
    filename: string
  }) {
    return new Promise<void>((accepted, reject) => {
      this.axiosInstance
        .get(props.encoding.pathURL, {
          responseType: 'blob',
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('not 200')
          }
          fileDownload(res.data, props.filename || 'filename')
          props.onSuccess()
          accepted()
        })
        .catch(reject)
    })
  }
}
