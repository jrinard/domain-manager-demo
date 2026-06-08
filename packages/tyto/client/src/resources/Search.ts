import { ApplyAxios } from '../utils/helpers'

import { SearchKnowledgeObjects } from './SearchKnowledgeObjects'
import { PersonAdvanced } from './PersonAdvanced'
import { SearchLesson } from './Search.Lesson'
import { SearchPhraseRecent } from './SearchPhraseRecent'

export class Search extends ApplyAxios {
  People?: PersonAdvanced
  Lessons?: SearchLesson
  KnowledgeObjects?: SearchKnowledgeObjects
  PhraseRecent?: SearchPhraseRecent

  protected override _applySubRoutes(): void {
    this.KnowledgeObjects = new SearchKnowledgeObjects(this.axiosInstance)
    this.People = new PersonAdvanced(this.axiosInstance)
    this.Lessons = new SearchLesson(this.axiosInstance)
    this.PhraseRecent = new SearchPhraseRecent(this.axiosInstance)
  }
}
