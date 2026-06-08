import type { ReactElement } from 'react'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@spacedock/falcon-ui'
import { Button, DecoyButton } from '@falcon/buttons'
import { getEncoding } from '@tyto/assets'
import { useTryybServices } from '@spacedock/tryyb-services'
import { TytoData } from '@spacedock/manifest'
import type { DomainUI } from '@spacedock/manifest'

import { useHomeConfig } from '../../../../data/hooks/useHomeConfig'
import { DomainImageChooserDialog } from '../../../organisms/domainImageChooserDialog'
import { ConfigLessonsChooserDialog } from '../../../organisms/configLessonsChooserDialog'
import { createFileURL } from '../../../../data/utils/file-path'
interface ItemProperties {
  pathURL: string
  name: string
  imageID?: number
  lessonID?: number
}

interface AttachmentPickerProps {
  configID: string
  domainID?: number
  value: number
  onChange: (value: number) => void
  onAttachmentsChange: (
    attachments: DomainUI.UIConfigurationRequestAttachment[],
    lastModifiedOfstDate?: string,
  ) => void
  permitImages?: boolean
  permitLessons?: boolean
}

export const AttachmentPicker = (props: AttachmentPickerProps) => {
  const [imageDialogIsOpen, setImageDialogIsOpen] = useState(false)
  const [lessonDialogIsOpen, setLessonDialogIsOpen] = useState(false)
  const { data: remoteUIConfig, addElementsAsAttachmentToConfig } =
    useHomeConfig({ configID: props.configID })
  const services = useTryybServices()

  const items = useMemo(() => {
    const _items: {
      value: string
      item: string | ReactElement
      id?: number
      properties?: ItemProperties
    }[] = []

    if (props.permitImages && remoteUIConfig?.libraryImages?.length) {
      remoteUIConfig.libraryImages.forEach((image) => {
        _items.push({
          value: image.courseItemID?.toString?.() ?? '',
          item: <div>{image.tag}</div>,
          id: image.courseItemID,
          properties: {
            imageID: image.courseItemID,
            name: image.tag,
            pathURL: createFileURL(image.item.pathURL),
          },
        })
      })
    }

    if (props.permitLessons) {
      if (remoteUIConfig?.libraryLessons?.length) {
        remoteUIConfig.libraryLessons.forEach((lesson) => {
          const pathURL = getEncoding(
            _.get(lesson, 'item.assets[0].encodings'),
            'ocTHUMBNAIL',
          )?.pathURL

          _items.push({
            value: lesson.courseItemID?.toString?.() ?? '',
            item: <div>{lesson.tag}</div>,
            id: lesson.courseItemID,
            properties: {
              lessonID: lesson.courseItemID,
              name: lesson.tag,
              pathURL: createFileURL(pathURL ?? ''),
            },
          })
        })
      }
    }

    return _items
  }, [remoteUIConfig ?? null, props.permitImages ?? null, props.permitLessons])

  const matchingImageOrLesson = useMemo(() => {
    return items?.find((item) => item.id === props.value)
  }, [items, props.value])

  const handleSelectImageOrLesson = useCallback(
    async (imageOrLessonID: number) => {
      if (!imageOrLessonID) return

      const matchesExistingImage = items?.find(
        (item) => item.id === imageOrLessonID,
      )

      if (!matchesExistingImage) {
        const result = await addElementsAsAttachmentToConfig([
          {
            lessonID: imageOrLessonID,
          },
        ])

        props.onChange(imageOrLessonID)

        if (result && Array.isArray(result?.newAttachmentsList)) {
          props.onAttachmentsChange(
            result?.newAttachmentsList,
            result?.lastModifiedOfstDate,
          )
        }
      } else {
        props.onChange(imageOrLessonID)
      }
      setImageDialogIsOpen(false)
      setLessonDialogIsOpen(false)
    },
    [props.onChange ?? null, items],
  )

  return (
    <div className="flex w-full flex-col items-center justify-center p-1">
      {matchingImageOrLesson ? (
        <div className="flex flex-col items-center justify-center gap-1 px-2 py-1">
          <div
            className={
              'flex aspect-square max-h-24 w-full flex-col justify-center justify-center'
            }
          >
            <img
              className="max-h-full w-full object-contain"
              src={matchingImageOrLesson.properties?.pathURL ?? ''}
              alt={matchingImageOrLesson.properties?.name}
            />
          </div>

          <button
            disabled={!matchingImageOrLesson.properties?.lessonID}
            onClick={() => {
              if (!matchingImageOrLesson.properties?.lessonID) {
                return
              }

              services.launchLessonViewer(
                matchingImageOrLesson.properties.lessonID,
              )
            }}
            className="text-xs"
          >
            {matchingImageOrLesson?.properties?.name ?? '(Unnamed)'}
          </button>
        </div>
      ) : (
        <p className="text-muted px-2 py-1 text-xs">
          No {props.permitLessons ? 'Attachment' : 'image'} selected
        </p>
      )}

      <div className="flex w-full flex-row flex-wrap items-center gap-2">
        {props.permitImages && (
          <Button
            className="m-0 text-xs"
            variant="outline"
            size="tiny"
            onClick={() => setImageDialogIsOpen(true)}
          >
            <span>Select Image</span>
          </Button>
        )}
        {props.permitLessons && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DecoyButton
                variant="outline"
                size="tiny"
                className="m-0 text-xs hover:cursor-pointer"
              >
                <span>Select File</span>
              </DecoyButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <button
                  className="w-full text-left"
                  onClick={() => setLessonDialogIsOpen(true)}
                >
                  Previously Attached Files
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  className="w-full text-left"
                  onClick={async () => {
                    const { lessons } = await services.chooseFile([
                      'New',
                      'Library',
                    ])

                    const lesson = lessons?.[0] as unknown as
                      | TytoData.Lesson
                      | undefined

                    if (lesson?.lessonID) {
                      const result = await addElementsAsAttachmentToConfig([
                        { lessonID: lesson.lessonID, tag: lesson.lessonName },
                      ])

                      props.onChange(lesson.lessonID)

                      if (result && Array.isArray(result.newAttachmentsList)) {
                        props.onAttachmentsChange(
                          result.newAttachmentsList,
                          result.lastModifiedOfstDate,
                        )
                      }
                    }
                  }}
                >
                  Open File Chooser
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {matchingImageOrLesson && (
          <Button
            variant="ghost-danger"
            size="tiny"
            onClick={() => props.onChange(0)}
          >
            Clear
          </Button>
        )}
      </div>

      <ConfigLessonsChooserDialog
        domainID={props.domainID ?? 0}
        configID={props.configID}
        open={lessonDialogIsOpen}
        onOpenChange={setLessonDialogIsOpen}
        onSelect={handleSelectImageOrLesson}
      />
      <DomainImageChooserDialog
        domainID={props.domainID ?? 0}
        configID={props.configID}
        open={imageDialogIsOpen}
        onOpenChange={setImageDialogIsOpen}
        onSelect={handleSelectImageOrLesson}
      />
    </div>
  )
}
