import { AxiosInstance } from 'axios'
import { RegisteredInterceptor } from '../../typings'

/**
 * TODO: https://cv-tech.atlassian.net/browse/TT-2957
 */
const PasswordCheckInterceptor = {
  name: 'PasswordCheck',
  create: (axios: AxiosInstance): RegisteredInterceptor => {
    return {
      name: PasswordCheckInterceptor.name,
      id: axios.interceptors.response.use((successfulResponse) => {
        // eslint-disable-next-line etc/no-commented-out-code
        // TODO: https://cv-tech.atlassian.net/browse/TT-2721
        //   if (
        //     !_.get(
        //       successfulResponse.config?.opts,
        //       'opts.circumventChangePasswordCheck',
        //       false
        //     )
        //   ) {
        //     checkIfPasswordChangeIsTrueOnSession(
        //       successfulResponse.config.url || '',
        //       _.get(successfulResponse, 'data.session', undefined)
        //     )
        //   }
        // updateSessionActivity()

        return successfulResponse
      }),
    }
  },
}

export { PasswordCheckInterceptor }
