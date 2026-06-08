import type { AxiosRequestConfig, AxiosError } from 'axios'
import { AxiosInstance, HttpStatusCode } from 'axios'
import { TytoBaseResponse } from '@tyto/manifest'
import {
  UnauthenticatedException,
  UnauthenticatedReason,
} from '../../exceptions'
import { RegisteredInterceptor } from '../../typings'
import { get, set } from 'lodash'

const ReAuthenticateInterceptor = {
  name: 'AuthenticateViaParentCheck',
  create: (
    axios: AxiosInstance,
    refreshToken?: () => Promise<{ sessionKey: string } | undefined>,
  ): RegisteredInterceptor => {
    return {
      id: axios.interceptors.response.use(
        (successfulResponse) => {
          return successfulResponse
        },
        async (error: AxiosError<{ [propertyName: string]: unknown }>) => {
          const tytoAuthException = UnauthenticatedException.fromTytoError(
            get(error, 'response.status', 0) as HttpStatusCode,
            get(error, 'response.data', {}) as TytoBaseResponse,
          )
          if (tytoAuthException) {
            if (refreshToken) {
              const authResponse = await refreshToken()
              if (authResponse && !!authResponse.sessionKey) {
                const originalRequest:
                  | AxiosRequestConfig<{ [propertyName: string]: unknown }>
                  | undefined = error.config

                if (
                  originalRequest?.data &&
                  'sessionKey' in originalRequest.data
                ) {
                  return axios.request({
                    ...originalRequest,
                    data: {
                      ...originalRequest.data,
                      sessionKey: authResponse.sessionKey,
                    },
                  })
                } else if (
                  originalRequest?.params &&
                  'sessionKey' in originalRequest.params
                ) {
                  const configMutated = { ...originalRequest }

                  set(
                    configMutated,
                    'params.sessionKey',
                    authResponse.sessionKey,
                  )

                  return axios.request(configMutated)
                }

                throw new UnauthenticatedException(
                  UnauthenticatedReason.MissingToken,
                )
              } else {
                throw new UnauthenticatedException(
                  UnauthenticatedReason.Invalid,
                )
              }
            } else {
              throw tytoAuthException
            }
          }
          return Promise.reject(tytoAuthException || error)
        },
      ),
      name: ReAuthenticateInterceptor.name,
    }
  },
}

export { ReAuthenticateInterceptor }
