import { useState } from 'react'
import { Dialog } from '@spacedock/falcon-ui'
import { Tabs } from '@spacedock/falcon-ui'

import { useKeyedDomainImages } from '../../../data/hooks/useKeyedDomainImages'
import { useHomeConfig } from '../../../data/hooks/useHomeConfig'
import { useUploadConfigImage } from '../../../data/hooks/useUploadConfigImage'

import { ExistingLessons } from './ExistingLessons'

const TAB_OPTIONS = [
  {
    label: 'Choose Existing',
    id: 'choose-existing',
  },
]

interface ConfigLessonsChooserDialogProps {
  domainID: number
  configID: string
  onSelect: (lessonID: number) => void
  open: boolean
  onOpenChange: (openStatus: boolean) => void
}

const ConfigLessonsChooserDialog = (props: ConfigLessonsChooserDialogProps) => {
  const [selectedTab, setSelectedTab] = useState<string | number>(
    'choose-existing',
  )
  const [newFile, updateNewFile] = useState<File | null>(null)
  const [newFileTagName, updateNewFileTagName] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const [selectedImageID, setSelectedImageID] = useState<number | null>(null)

  const { uploadImage, isPending, error } = useUploadConfigImage({
    domainID: props.domainID,
    configID: props.configID,
    onProgress: setUploadProgress,
  })
  const { domainUI } = useKeyedDomainImages({ domainID: props.domainID })
  const { data: uiConfig, refetch: refetchUIConfig } = useHomeConfig({
    configID: props.configID,
  })

  return (
    <Dialog
      title="Choose File"
      open={props.open}
      onOpenChange={props.onOpenChange}
      maxWidth="xxl"
      maxHeight="screen"
      completeLabel="Select"
      action={{
        value: 'Select',
        disabled:
          (selectedTab === 'choose-existing' && !selectedImageID) ||
          (selectedTab === 'upload-new' && (!newFile || !newFileTagName)),
        onClick: async () => {
          if (selectedTab === 'upload-new' && newFile) {
            if (!newFile || !newFileTagName) return

            const result = await uploadImage(newFile, newFileTagName)

            if (result.imageID) {
              props.onSelect(result.imageID)
            }

            props.onOpenChange(false)
            updateNewFile(null)
            updateNewFileTagName('')
            setUploadProgress(0)
          } else if (selectedTab === 'choose-existing' && selectedImageID) {
            if (!selectedImageID) return

            props.onSelect(selectedImageID)
            props.onOpenChange(false)
          }
        },
      }}
    >
      <Tabs
        items={TAB_OPTIONS}
        ariaLabelBy="choose-image"
        selected={selectedTab}
        onSelect={setSelectedTab}
      />

      {selectedTab === 'choose-existing' && (
        <div>
          <ExistingLessons
            domainID={props.domainID}
            configID={props.configID}
            configLessons={uiConfig?.libraryLessons ?? []}
            onSelect={setSelectedImageID}
          />
        </div>
      )}
    </Dialog>
  )
}

export { ConfigLessonsChooserDialog }
