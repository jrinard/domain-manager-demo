import { useState, useEffect } from 'react'
import { useQueryClient } from '@tyto/query'

import {
  serializeStylesheet,
  useEditableStylesheet,
  useParsedDomainStylesheet,
  useStylesFromStylesheet,
} from '@domain/styles'
import { useUploadFileMutation } from '@tyto/query'
import { useTryybServices } from '@spacedock/tryyb-services'
import type { UploadAssetResult } from '@spacedock/tryyb-services'
import type { TytoData } from '@spacedock/manifest'

import ThemeEditorSidebar from './Sidebar'
import { PreviewWrapper } from './PreviewWrapper'
import { ThemeControlBar } from './ThemeControlBar'
import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'
import { useToast } from '@spacedock/falcon-ui'

interface Props {
  domainID: number
}

const ThemeEditor = (props: Props) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { parsed, isMissingDomainStylesheet, isError, isFetching } =
    useParsedDomainStylesheet(props.domainID)

  const domainUIMutator = useUpdateDomainUIMutation({
    domainID: props.domainID,
  })

  const uploadFileMutator = useUploadFileMutation({
    onSuccess: (_responseData, _args) => {
      // TODO
    },
    onUploadProgress(progressEvent) {
      //TODO
    },
  })
  const services = useTryybServices()

  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [showGreyscaleDialog, setShowGreyscaleDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const editableStylesheet = useEditableStylesheet(parsed)
  const styles = useStylesFromStylesheet(theme, editableStylesheet.sheet)
  const themeValues = editableStylesheet.sheet[theme]

  useEffect(() => {
    if (!isMissingDomainStylesheet && !isError) {
      editableStylesheet.overrideSheet(parsed)
    }
  }, [isMissingDomainStylesheet, parsed, isError])

  if (isFetching) {
    return (
      <div className="h-full w-full py-4">
        <div className="flex h-full w-full flex-row gap-4">
          <aside className="h-full w-96 min-w-96">
            <div className="flex h-full w-full flex-col gap-4">
              <div className="bg-grayscale-100 h-12 w-full dark:bg-black"></div>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    const stylesheetString = serializeStylesheet(
      editableStylesheet.sheet['light'],
      editableStylesheet.sheet['dark'],
      {
        locks: editableStylesheet.sheet.locks,
        version: '1',
      },
    )

    try {
      const file = new File([stylesheetString], 'domainStylesheet.v4.css', {
        type: 'text/css',
      })

      const uploadResult = (await services.uploadFile(file)) as
        | UploadAssetResult
        | TytoData.Upload

      const tempUploadKey =
        'uploadFiles' in uploadResult &&
        uploadResult.uploadFiles?.[0]?.fileUploadKey
          ? uploadResult.uploadFiles[0].fileUploadKey
          : 'url' in uploadResult
            ? uploadResult.url
            : undefined

      await domainUIMutator.updateDomainUI({
        domainImages: {
          domainStylesheet: tempUploadKey,
        },
      })

      queryClient.invalidateQueries({
        queryKey: ['domainProperties', { domainID: props.domainID }],
      })

      toast.toastSuccess({
        description: 'Saved the theme',
      })
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to update the theme',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-site-bg flex h-full w-full flex-col">
      {parsed ? (
        <ThemeControlBar
          theme={theme}
          setTheme={setTheme}
          stylesheet={parsed}
          editableStylesheet={editableStylesheet}
          isRemoteStylesheet={!isMissingDomainStylesheet}
          onSave={handleSave}
          onUndo={() => {
            toast.toast({
              description: 'Changes undone',
            })
          }}
          onMergeDefault={() => {
            toast.toastSuccess({
              description: 'Fill in defaults (keeps your customizations)',
            })
          }}
          isSaving={isSaving}
        />
      ) : null}

      <div className="flex h-full w-full flex-row gap-4 py-4">
        <aside className="h-full w-96 min-w-96">
          {parsed ? (
            <ThemeEditorSidebar
              stylesheet={parsed}
              theme={theme}
              styles={styles}
              themeValues={themeValues}
              editableStylesheet={editableStylesheet}
              showGreyscaleDialog={showGreyscaleDialog}
              setShowGreyscaleDialog={setShowGreyscaleDialog}
            />
          ) : null}
        </aside>

        <article
          className="flex grow flex-col rounded-xl"
          style={styles}
          data-sitetheme={theme}
        >
          <PreviewWrapper theme={theme} />
        </article>
      </div>
    </div>
  )
}

export default ThemeEditor
