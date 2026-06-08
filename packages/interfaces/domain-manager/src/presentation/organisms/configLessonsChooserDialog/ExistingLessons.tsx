import _ from 'lodash'
import { useEffect, useState } from 'react'
import { getEncoding } from '@tyto/assets'

import type { DomainUI } from '@spacedock/manifest'

import { createFileURL } from '../../../data/utils/file-path'

interface LessonOption {
  lessonID: number
  name: string
  lessonType: DomainUI.UIConfigLibraryLessonItem['item']['lessonItemType']
  pathURL: string
}

interface ExistingLessonsProps {
  domainID: number
  configID: string
  configLessons: DomainUI.UIConfigLibraryLessonItem[]
  onSelect: (imageID: number) => void
}

const ExistingLessons = (props: ExistingLessonsProps) => {
  const [imageOptions, setImageOptions] = useState<LessonOption[]>(() => {
    return configLessonsToImageOptions(props.configLessons)
  })

  useEffect(() => {
    setImageOptions(configLessonsToImageOptions(props.configLessons))
  }, [props.configLessons])

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-4 gap-y-6">
      {imageOptions.map((lesson) => (
        <button
          key={lesson.name}
          className="focus:bg-bg-contrast-low hover:bg-bg-contrast-low flex cursor-pointer flex-col items-center justify-center gap-2 rounded p-2"
          onClick={() => props.onSelect(lesson.lessonID)}
        >
          <div className="aspect-square max-h-full w-full max-w-32">
            <img
              src={lesson.pathURL}
              alt={lesson.name}
              className="max-h-full w-full object-contain"
            />
          </div>
          <span className="text-center text-sm capitalize">{lesson.name}</span>
        </button>
      ))}
    </div>
  )
}

function configLessonsToImageOptions(
  configLessons: DomainUI.UIConfigLibraryLessonItem[],
): LessonOption[] {
  return configLessons.map((lesson) => {
    const pathURL =
      getEncoding(_.get(lesson, 'item.assets[0].encodings'), 'ocTHUMBNAIL')
        ?.pathURL ?? ''

    return {
      lessonID: lesson.courseItemID,
      name: lesson.tag ?? '',
      lessonType: lesson.item.lessonItemType,
      pathURL: createFileURL(pathURL),
    }
  })
}

function splitCamelcaseWord(word: string): string {
  return word
    .replace(/([A-Z]|_)/g, ' $1')
    .trim()
    .replace(/_/gi, '')
}

export { ExistingLessons }
