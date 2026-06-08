import type { HomeSection } from '@domain/configs'
import type { LessonSectionData } from '@domain/schemas'
import { useSyync } from '@spacedock/syyncronyyzed'

export interface LessonProps {
  section?: HomeSection<LessonSectionData>
  sectionData: LessonSectionData
  lessonTitle?: string
  thumbnailUrl?: string
  lessonType?: string
  isLoading?: boolean
}

export const Lesson = ({
  section,
  sectionData,
  lessonTitle,
  thumbnailUrl,
  isLoading = false,
}: LessonProps) => {
  const syync = useSyync()

  if (!section) {
    return null
  }

  const { display_variant } = sectionData

  // Currently only 'library-card' variant is supported
  if (display_variant === 'library-card') {
    return (
      <button
        className="flex h-full flex-col hover:cursor-pointer"
        onClick={() => {
          if (!syync?.isConnected) return
          void syync?.sendMessage('launch-lesson-viewer', {
            lessonID: sectionData.lessonID,
          })
        }}
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        ) : (
          <>
            {thumbnailUrl && (
              <div className="mb-3 aspect-square w-full overflow-hidden">
                <img
                  src={thumbnailUrl}
                  alt={lessonTitle || 'Lesson thumbnail'}
                  className="max-h-full w-full rounded-sm object-contain"
                />
              </div>
            )}
            {!(
              (section?.section_data as any)?.hideLessonTitle ||
              (section?.metadata as any)?.hideLessonTitle
            ) && (
              <div className="flex flex-1 flex-col">
                {lessonTitle && (
                  <span
                    className="text-foreground text-md font-medium"
                    color="inherit"
                  >
                    {lessonTitle}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </button>
    )
  }

  return null
}
