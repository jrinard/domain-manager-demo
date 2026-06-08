import { Resource } from '../../utils/helpers'
import { GetParameters, GetResponse } from './CatalogCurriculumPublicationTypes'

import { SearchLessonContent } from '../CatalogCurriculumPublication.SearchLessonContent'
import { CurriculumPubCatalogItemsTrending } from '../CurriculumPubCatalogItemsTrending'

export class CatalogCurriculumPublication extends Resource {
  override endpoint = '/CatalogCurriculumPublication'

  SearchLessonContent?: SearchLessonContent
  ItemsTrending?: CurriculumPubCatalogItemsTrending

  protected override addResources(): void {
    this.SearchLessonContent = new SearchLessonContent(this.axiosInstance)
    this.ItemsTrending = new CurriculumPubCatalogItemsTrending(
      this.axiosInstance,
    )
  }

  get(params: GetParameters) {
    return this.read<GetResponse>(params)
  }
}
