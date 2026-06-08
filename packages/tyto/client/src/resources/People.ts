import { Resource } from '../utils/helpers'
import { PeopleAdvancedSearch } from './People.AdvancedSearch'

export class People extends Resource {
  AdvancedSearch!: PeopleAdvancedSearch
  protected override addResources() {
    this.AdvancedSearch = new PeopleAdvancedSearch(this.axiosInstance)
  }
}
