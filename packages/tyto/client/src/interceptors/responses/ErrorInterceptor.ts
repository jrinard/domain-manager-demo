import type { AxiosError as AxiosErrorType } from 'axios'
import { AxiosInstance, AxiosError } from 'axios'

import { RegisteredInterceptor } from '../../typings'
import { get } from 'lodash'

const ErrorInterceptor = {
  name: 'ErrorInterceptor',
  create: (axios: AxiosInstance): RegisteredInterceptor => {
    return {
      id: axios.interceptors.response.use(
        (successfulResponse) => {
          if (get(successfulResponse.data, 'error.msg') === 'cmdGetEvent') {
            const error = new AxiosError(
              'Not found',
              '400',
              successfulResponse.config,
              successfulResponse.request,
              successfulResponse,
            )
            return Promise.reject(error)
          }
          return successfulResponse
        },
        async (error: AxiosErrorType<{ [propertyName: string]: unknown }>) => {
          return Promise.reject(error)
        },
      ),
      name: ErrorInterceptor.name,
    }
  },
}

export { ErrorInterceptor }
