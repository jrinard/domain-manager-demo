import { SessionHandling } from '@spacedock/cargo-bay'
import { set, get } from 'lodash'
import { RequestInterceptor } from '../../typings'
import * as Helpers from '../../utils/helpers'
import { InternalAxiosRequestConfig } from 'axios'

const SessionInjectionInterceptor: RequestInterceptor = {
  name: 'SessionInjection',
  onFulfilled: async (
    config: InternalAxiosRequestConfig<
      { sessionKey?: string | null } | FormData
    >,
  ): Promise<
    InternalAxiosRequestConfig<{ sessionKey?: string | null } | FormData>
  > => {
    if (!Helpers.shouldOmitSessionKey(config)) {
      // * Very specific use case for FormData which is only used in the Upload resource where it needs to be seperately supplied via Search Parameters to the BackEnd

      const data = config.data
      const isFormData = dataIsFormData(data)

      if (!isFormData && typeof data === 'object') {
        data.sessionKey = SessionHandling.getActiveSessionKey()
      } else {
        if (isFormData && data.has('command')) {
          data.append('sessionKey', SessionHandling.getActiveSessionKey() || '')
        } else {
          set(
            config,
            'params.sessionKey',
            SessionHandling.getActiveSessionKey(),
          )
        }
      }

      if (
        !get(config, 'params.sessionKey', undefined) &&
        ((!isFormData && !data?.sessionKey) ||
          (isFormData && !data.has('sessionKey')))
      ) {
        console.error(
          'no session key found in callWrapper function when expected.',
        )
        throw new Error('No session key found')
      }
    }

    return config
  },
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  onError: (error) => {
    return Promise.reject(error)
  },
}

function dataIsFormData(
  data: InternalAxiosRequestConfig<
    { sessionKey?: string | null } | FormData
  >['data'],
): data is FormData {
  return data instanceof FormData
}

export default SessionInjectionInterceptor
export { SessionInjectionInterceptor }
