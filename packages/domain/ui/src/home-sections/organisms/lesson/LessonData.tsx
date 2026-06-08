import { useMemo } from 'react'
import { orderBy } from 'lodash'

import type { HomeSection } from '@domain/configs'
import type { LessonSectionData } from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'
import { getEncoding } from '@tyto/assets'
import { createFileURL } from '../../../utils/file-path'

import { Lesson } from './Lesson'

export interface LessonDataProps {
  section?: HomeSection<LessonSectionData>
  sectionData: LessonSectionData
  attachments?: DomainUI.Attachment[]
}

export const LessonDataComponent = ({
  section,
  sectionData,
  attachments,
}: LessonDataProps) => {
  // TODO: Implement actual data fetching for the lesson based on lessonID
  // For now, we'll show a placeholder state
  const { lessonID } = sectionData

  const lesson = useMemo(() => {
    const matchingAttachment = attachments?.find(
      (attachment) => attachment.courseItemID === lessonID,
    )

    if (!matchingAttachment || !attachmentIsLesson(matchingAttachment)) {
      return null
    }

    return {
      lessonItemType: matchingAttachment.item.lessonItemType,
      lessonTitle: matchingAttachment.tag,
      thumbnailUrl: createFileURL(
        pullLessonThumbnailPathURL(matchingAttachment) ?? '',
      ),
    }
  }, [attachments ?? null, lessonID])

  // When we have the API integration, this would use a query hook like:
  // const { data: lesson, isLoading } = useLessonQuery({ lessonID })

  let title = lesson?.lessonTitle

  if (!title) {
    title = lessonID ? `Lesson #${lessonID}` : ''
  }

  return (
    <Lesson
      section={section}
      sectionData={sectionData}
      lessonTitle={title}
      lessonType={lesson?.lessonItemType}
      thumbnailUrl={lesson?.thumbnailUrl}
      isLoading={false}
    />
  )
}

function pullLessonThumbnailPathURL(attachment: DomainUI.Attachment) {
  if (!attachmentIsLesson(attachment)) {
    return null
  }

  if (attachment.item.images?.length) {
    const overrides = orderBy(
      attachment.item.images.filter(
        (img) =>
          img.aboutID === attachment.courseItemID &&
          img.imageName === 'thumbnailOverride',
      ),
      'createdDate',
      'desc',
    )

    if (overrides.length) {
      return overrides[0].pathURL
    }
  }

  return (
    getEncoding(attachment.item.assets?.[0].encodings, 'ocTHUMBNAIL')
      ?.pathURL ?? null
  )
}

function attachmentIsLesson(
  attachment: DomainUI.Attachment,
): attachment is DomainUI.UIConfigLibraryLessonItem {
  return 'lessonItemType' in attachment.item
}
