import React from 'react'
import { Dialog, IconButton, TextBody, ProgressBar } from '@spacedock/falcon-ui'

export interface ImageCardProps {
  title?: string
  description?: string
  imageUrl?: string
  onClick?: () => void
  onFileChange: (file?: File) => void
  onRemoveFile?: () => void
  className?: string
  variety?: 'dark' | 'light' | 'neutral'
  acceptableMimeTypes?:
    | 'image/jpg,image/jpeg,image/png'
    | 'image/jpeg'
    | 'image/png'
    | 'image/x-icon'
    | 'image/x-icon,image/png'
    | 'video/mp4'
  uploadProgress?: number
  isDimmed?: boolean
  dimmedMessage?: string
  isRequiredAndMissing?: boolean
}

interface RemoveImageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemove: () => void
  imageUrl?: string
  variety?: 'dark' | 'light' | 'neutral'
}

export const ImageCard = ({
  title,
  description,
  imageUrl,
  onClick,
  onFileChange,
  onRemoveFile,
  className = '',
  variety = 'dark',
  acceptableMimeTypes = 'image/jpg,image/jpeg,image/png',
  uploadProgress,
  isDimmed = false,
  dimmedMessage,
  isRequiredAndMissing = false,
}: ImageCardProps) => {
  const [removeImageDialog, setRemoveImageDialog] = React.useState(false)

  return (
    <>
      <div
        className={`border-grayscale-400 dark:border-grayscale-700 bg-grayscale-200 dark:bg-grayscale-900 hover:border-grayscale-500 w-[255px] cursor-pointer rounded-md border p-4 transition-colors ${isDimmed ? ' flex-shrink-0 opacity-40' : 'min-w-0 max-w-[255px] flex-1'} ${className}`}
        onClick={onClick}
        data-testid="image-card"
      >
        <div
  className={`mb-3 h-32 w-full rounded px-2 ${variety === 'light' ? 'bg-white' : variety === 'neutral' ? 'bg-grayscale-500' : 'bg-black'}`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || 'Image preview'}
              className="h-full w-full rounded object-contain p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded">
              <TextBody className="text-grayscale-500">No Image</TextBody>
            </div>
          )}
        </div>

        <div className="space-y-1">
          {title && (
            <div className="flex items-center justify-between">
              <TextBody className="text-site-fg font-medium">{title}</TextBody>
              <div className="flex gap-1">
                <div className="group">
                  <IconButton
                    className="border-grayscale-700 group-hover:border-grayscale-500 group-hover:bg-grayscale-600 cursor-pointer rounded-xl border bg-black px-4 py-1.5 text-sm text-white transition-all duration-150 group-active:scale-90"
                    color="current"
                    icon="upload"
                    size="base"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Call handler with no File to indicate chooser-first flow
                      onFileChange?.()
                    }}
                  />
                </div>
                {imageUrl && (
                  <IconButton
                    className="border-grayscale-700 group-hover:border-grayscale-500 group-hover:bg-grayscale-600 cursor-pointer rounded-xl border bg-black px-4 py-1.5 text-sm text-white transition-all duration-150 group-active:scale-90"
                    color="current"
                    icon="trash-outline"
                    size="base"
                    onClick={(e) => {
                      e.stopPropagation()
                      setRemoveImageDialog(true)
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {description && (
            <TextBody className="text-grayscale-400 text-xs opacity-50">
              {description}
            </TextBody>
          )}
          {uploadProgress !== undefined && uploadProgress > 0 && (
            <div className="mt-2">
              <ProgressBar
                progress={Math.min(uploadProgress, 100)}
                hasLabel
                color="success"
                size="lg"
              />
            </div>
          )}
          {isDimmed && dimmedMessage && (
            <TextBody className="text-grayscale-400 mt-2 text-xs italic">
              {dimmedMessage}
            </TextBody>
          )}
          {isRequiredAndMissing && (
            <TextBody className="text-warning mt-2 text-xs italic">
              This image is required for proper domain setup.
            </TextBody>
          )}
        </div>
      </div>

      <RemoveImageDialog
        open={removeImageDialog}
        onOpenChange={setRemoveImageDialog}
        onRemove={() => {
          setRemoveImageDialog(false)
          onRemoveFile?.()
        }}
        imageUrl={imageUrl}
        variety={variety}
      />
    </>
  )
}

const RemoveImageDialog = ({
  open,
  onOpenChange,
  onRemove,
  imageUrl,
  variety = 'dark',
}: RemoveImageDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="ARE YOU SURE?"
      destructiveLabel="Remove Image"
      action={{
        disabled: false,
        onClick: onRemove,
      }}
    >
      <div className="space-y-4">
        <TextBody>Are you sure you want to remove this image?</TextBody>
        {imageUrl && (
          <div className="mb-2 flex justify-center">
            <div
              className={`border-grayscale-700 mb-2 h-32 w-full max-w-xs rounded border p-4 ${variety === 'light' ? 'bg-white' : variety === 'neutral' ? 'bg-grayscale-500' : 'bg-black'}`}
            >
              <img
                src={imageUrl}
                alt="Image preview"
                className="h-full w-full rounded object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}
