import { omit } from 'lodash'
import { Endpoints } from '@tyto/client'

import { createAsset } from './Asset'
import { createLesson } from './Lesson'

export const saveForLessonPost =
  (): Endpoints.Tyto.SaveForLesson.Post.Response => {
    const asset = createAsset()
    const lesson = createLesson()

    return {
      error: { logID: 0, msg: '', sts: 0, technical: '' },
      links: [],
      asset,
      lesson: omit(lesson, 'assets'),
      recordsAffected: 1,
    }
  }
