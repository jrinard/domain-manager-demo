import { Resource } from '../../utils/helpers'
import { TYTO_ENDPOINT_PATHS } from '../../constants'
import { getCall, CallOpts } from '../../utils/utils'

const endpoint = TYTO_ENDPOINT_PATHS.SEARCHPHRASERECENT

export interface SearchPhrase {
  searchQuery: string
}

export class SearchPhraseRecent extends Resource {
  /**
   * Get recent search phrases that match the search string
   * Returns an array of search phrase objects based on recent searches in the domain
   */
  get(
    params: {
      searchString: string
      domainID: number
    },
    callOpts?: CallOpts,
  ) {
    return getCall<SearchPhrase[]>(
      this.axiosInstance,
      endpoint,
      params,
      callOpts,
    )
  }
}
