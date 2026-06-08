import { Dialog, TextBody, ComboBox, Switch, ColorPicker } from '@spacedock/falcon-ui'
import { TextInput } from '@falcon/inputs'
import { Button } from '@falcon/buttons'
import { useState, useEffect, useCallback, useMemo } from 'react'
import _ from 'lodash'
import { getEncoding } from '@tyto/assets'

import { useTopMenuConfig } from '../../../data/hooks/useTopMenuConfig'
import { DomainImageChooserDialog } from '../domainImageChooserDialog'
import { ConfigLessonsChooserDialog } from '../configLessonsChooserDialog'
import { createFileURL } from '../../../data/utils/file-path'

export interface DomainManagerConfigDialogSubSectionProps {
  id: number
  domainID?: number
  configID?: string
  open: boolean
  onOpenChange: (val: boolean) => void
  onSuccess: (newSubSection: any) => void
  initialData?: any
}

const layoutOptions = [
  { value: 'default', item: 'Default' },
  { value: 'featured', item: 'Featured (highlighted row with background)' },
  { value: 'compact', item: 'Compact (smaller items)' },
]

const featuredContentTypeOptions = [
  { value: 'image', item: 'Image' },
  { value: 'lesson', item: 'Lesson' },
]

const DomainManagerConfigDialogSubSection = ({
  id,
  domainID,
  configID,
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: DomainManagerConfigDialogSubSectionProps) => {
  const [title, setTitle] = useState<string>(initialData?.title || '')
  const [description, setDescription] = useState<string>(
    initialData?.description || '',
  )
  const [layout, setLayout] = useState<'default' | 'featured' | 'compact'>(
    initialData?._layout || 'default',
  )
  const [backgroundColor, setBackgroundColor] = useState<string>(
    initialData?.backgroundColor || '',
  )
  const [hasFeaturedContent, setHasFeaturedContent] = useState<boolean>(
    !!initialData?.featuredContent,
  )
  const [featuredContentType, setFeaturedContentType] = useState<
    'image' | 'lesson'
  >(initialData?.featuredContent?.type || 'image')
  const [featuredCourseItemID, setFeaturedCourseItemID] = useState<
    number | null
  >(initialData?.featuredContent?.courseItemID ?? null)

  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false)

  const {
    data: remoteUIConfig,
    addElementsAsAttachmentToConfig,
  } = useTopMenuConfig({ configID: configID || '' })

  const libraryItems = useMemo(() => {
    const items: {
      id: number
      name: string
      pathURL: string
      type: 'image' | 'lesson'
    }[] = []

    remoteUIConfig?.libraryImages?.forEach((image) => {
      items.push({
        id: image.courseItemID,
        name: image.tag ?? '',
        pathURL: createFileURL(image.item.pathURL),
        type: 'image',
      })
    })

    remoteUIConfig?.libraryLessons?.forEach((lesson) => {
      const pathURL =
        getEncoding(_.get(lesson, 'item.assets[0].encodings'), 'ocTHUMBNAIL')
          ?.pathURL ?? ''
      items.push({
        id: lesson.courseItemID,
        name: lesson.tag ?? '',
        pathURL: createFileURL(pathURL),
        type: 'lesson',
      })
    })

    return items
  }, [remoteUIConfig])

  const selectedItem = useMemo(() => {
    if (!featuredCourseItemID) return null
    return libraryItems.find((item) => item.id === featuredCourseItemID) ?? null
  }, [libraryItems, featuredCourseItemID])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLayout('default')
    setBackgroundColor('')
    setHasFeaturedContent(false)
    setFeaturedContentType('image')
    setFeaturedCourseItemID(null)
  }

  useEffect(() => {
    if (initialData) {
      setTitle(initialData?.title || '')
      setDescription(initialData?.description || '')
      setLayout(initialData?._layout || 'default')
      setBackgroundColor(initialData?.backgroundColor || '')
      setHasFeaturedContent(!!initialData?.featuredContent)
      setFeaturedContentType(initialData?.featuredContent?.type || 'image')
      setFeaturedCourseItemID(
        initialData?.featuredContent?.courseItemID ?? null,
      )
    } else {
      resetForm()
    }
  }, [initialData])

  const handleSelectItem = useCallback(
    async (itemID: number) => {
      if (!itemID) return

      const alreadyInLibrary = libraryItems.some((item) => item.id === itemID)

      if (!alreadyInLibrary) {
        await addElementsAsAttachmentToConfig([{ lessonID: itemID }])
      }

      setFeaturedCourseItemID(itemID)
      setImageDialogOpen(false)
      setLessonDialogOpen(false)
    },
    [libraryItems, addElementsAsAttachmentToConfig],
  )

  const handleSave = () => {
    const result: any = {
      _id: initialData?._id || '',
      title: title || 'Sub Section',
      description: description || '',
      buttons: initialData?.buttons || [],
    }

    if (layout !== 'default') {
      result._layout = layout
    }

    if (layout === 'featured' && backgroundColor) {
      result.backgroundColor = backgroundColor
    }

    if (hasFeaturedContent && featuredCourseItemID) {
      result.featuredContent = {
        type: featuredContentType,
        courseItemID: featuredCourseItemID,
      }
    }

    onSuccess(result)
    onOpenChange(false)
    resetForm()
  }

  return (
    <>
      <Dialog
        maxWidth="lg"
        maxHeight="screen"
        open={open}
        onOpenChange={onOpenChange}
        title={initialData ? 'Edit Sub Section' : 'Add Sub Section'}
        destructiveLabel="Save"
        action={{ onClick: handleSave }}
      >
        <div className="flex flex-col gap-2 rounded px-4">
          {/* Label */}
          <div className="flex flex-col gap-1">
            <TextBody className="text-sm opacity-70">Label</TextBody>
            <TextInput
              placeholder="Enter label"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <TextBody className="text-sm opacity-70">Description</TextBody>
            <TextInput
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <hr className="border-grayscale-600 my-2" />

          <TextBody className="text-sm font-semibold opacity-70">
            Layout & Appearance
          </TextBody>

          {/* Layout selector */}
          <div className="flex flex-col gap-1">
            <TextBody className="text-sm opacity-70">Layout</TextBody>
            <ComboBox
              items={layoutOptions}
              value={layout}
              onChange={(value) =>
                setLayout(value as 'default' | 'featured' | 'compact')
              }
            />
          </div>

          {/* Background Color */}
          {layout === 'featured' && (
            <div className="flex flex-col gap-1">
              <TextBody className="text-sm opacity-70">
                Background Color
              </TextBody>
              <div className="flex flex-row items-center gap-2">
                <TextInput
                  placeholder="#4A90D9 or rgba(74,144,217,0.2)"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
                <ColorPicker
                  value={backgroundColor || '#000000'}
                  onChange={(value) => {
                    const hex =
                      typeof value === 'string'
                        ? value
                        : typeof value?.toString === 'function'
                          ? value.toString('hex')
                          : String(value)
                    setBackgroundColor(hex)
                  }}
                  eyeDropper
                />
              </div>
            </div>
          )}

          <hr className="border-grayscale-600 my-2" />

          <TextBody className="text-sm font-semibold opacity-70">
            Featured Content
          </TextBody>

          <div className="flex items-center gap-2">
            <TextBody className="text-sm opacity-70">
              Enable Featured Content
            </TextBody>
            <Switch
              checked={hasFeaturedContent}
              onCheckedChange={(checked) => {
                setHasFeaturedContent(checked)
                if (!checked) {
                  setFeaturedCourseItemID(null)
                }
              }}
            />
          </div>

          {hasFeaturedContent && (
            <>
              <div className="flex flex-col gap-1">
                <TextBody className="text-sm opacity-70">
                  Content Type
                </TextBody>
                <ComboBox
                  items={featuredContentTypeOptions}
                  value={featuredContentType}
                  onChange={(value) => {
                    setFeaturedContentType(value as 'image' | 'lesson')
                    setFeaturedCourseItemID(null)
                  }}
                />
              </div>

              {/* Preview + Chooser */}
              <div className="flex w-full flex-col items-center gap-2 rounded border p-3">
                {selectedItem ? (
                  <div className="flex flex-col items-center gap-1">
                    {selectedItem.pathURL && (
                      <div className="flex max-h-28 justify-center">
                        <img
                          src={selectedItem.pathURL}
                          alt={selectedItem.name}
                          className="max-h-28 rounded object-contain"
                        />
                      </div>
                    )}
                    <span className="text-muted text-xs">
                      {selectedItem.name || '(Unnamed)'}
                    </span>
                  </div>
                ) : (
                  <p className="text-muted py-2 text-xs">
                    No {featuredContentType === 'image' ? 'image' : 'file'}{' '}
                    selected
                  </p>
                )}

                <div className="flex flex-row flex-wrap items-center gap-2">
                  {featuredContentType === 'image' && (
                    <Button
                      variant="outline"
                      size="tiny"
                      className="m-0 text-xs"
                      onClick={() => setImageDialogOpen(true)}
                    >
                      Select Image
                    </Button>
                  )}

                  {featuredContentType === 'lesson' && (
                    <Button
                      variant="outline"
                      size="tiny"
                      className="m-0 text-xs"
                      onClick={() => setLessonDialogOpen(true)}
                    >
                      Select File
                    </Button>
                  )}

                  {selectedItem && (
                    <Button
                      variant="ghost-danger"
                      size="tiny"
                      onClick={() => setFeaturedCourseItemID(null)}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Dialog>

      <DomainImageChooserDialog
        domainID={domainID ?? 0}
        configID={configID || ''}
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        onSelect={handleSelectItem}
      />
      <ConfigLessonsChooserDialog
        domainID={domainID ?? 0}
        configID={configID || ''}
        open={lessonDialogOpen}
        onOpenChange={setLessonDialogOpen}
        onSelect={handleSelectItem}
      />
    </>
  )
}

DomainManagerConfigDialogSubSection.displayName =
  'DomainManagerConfigDialogSubSection'

export { DomainManagerConfigDialogSubSection }
