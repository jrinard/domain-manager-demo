import { TYTO_ENDPOINT_PATHS } from '../constants'
import { Endpoints } from '../typings'
import { Resource } from '../utils/helpers'
import { CallOpts, getCall } from '../utils/utils'
import * as qs from 'qs'

export class PeopleAdvancedSearch extends Resource {
  override endpoint = TYTO_ENDPOINT_PATHS.PEOPLE_ADVANCEDSEARCH
  get(
    params: Endpoints.Tyto.PeopleAdvancedSearch.Get.Parameters,
    callOpts?: CallOpts
  ) {
    const queryParams = {
      ...params,
      functionName: params.functionName.replace(/\s+/g, '%20'),
      generalName: params?.generalName
        ? `%25${params.generalName.replace(/\s+/g, '%20')}%25`
        : '',
    }
    return getCall<Endpoints.Tyto.PeopleAdvancedSearch.Get.Response>(
      this.axiosInstance,
      this.endpoint,
      queryParams,
      {
        ...callOpts,
        axiosConfig: {
          paramsSerializer: (params: Record<string, unknown>): string => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
            return qs.stringify(params, { encode: false })
          },
        },
      }
    )
  }
}
