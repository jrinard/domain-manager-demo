import { AxiosInstance, HttpStatusCode } from 'axios'
import { TytoBaseResponse } from '@tyto/manifest'
import {
  UnauthenticatedException,
  UnauthenticatedReason,
} from '../../exceptions'
import { RegisteredInterceptor } from '../../typings'
import { get } from 'lodash'

const AuthCheckInterceptor = {
  name: 'AuthCheck',
  create: (
    axios: AxiosInstance,
    onUnauthenticated?: (code: UnauthenticatedReason) => void,
  ): RegisteredInterceptor => {
    return {
      id: axios.interceptors.response.use(
        (successfulResponse) => {
          return successfulResponse
        },
        (error) => {
          const exception = UnauthenticatedException.fromTytoError(
            get(error, 'response.status', 0) as HttpStatusCode,
            get(error, 'response.data', {}) as TytoBaseResponse,
          )
          if (exception) {
            if (onUnauthenticated) onUnauthenticated(exception.code)
            else throw exception
          }
          return Promise.reject(exception || error)
        },
      ),
      name: AuthCheckInterceptor.name,
    }
  },
}

export { AuthCheckInterceptor }
