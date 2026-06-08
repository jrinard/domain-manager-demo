import { useEffect, useState } from 'react'
import { FileInput, ProgressBar, TextBody } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { TextInput } from '@falcon/inputs'
// // import { ImageCrop } from '@spacedock/image-crop'

interface UploadNewImageProps {
  file: File | null
  tagName: string
  onFileSelect: (file: File | null) => void
  onTagNameChange: (tagName: string) => void
  isUploading: boolean
  error: Error | null
  uploadProgress: number
}

const UploadNewImage = (props: UploadNewImageProps) => {
  const [fileSrc, setFileSrc] = useState<string | null>(null)

  useEffect(() => {
    if (fileSrc) {
      URL.revokeObjectURL(fileSrc)
    }

    if (props.file) {
      const newSrc = URL.createObjectURL(props.file)

      setFileSrc(newSrc)

      return () => URL.revokeObjectURL(newSrc)
    }
  }, [props.file])

  // If a file is selected but no tagName provided, default tagName to the file name (without extension)
  useEffect(() => {
    if (props.file && (!props.tagName || props.tagName.trim() === '')) {
      const name = props.file.name.replace(/\.[^/.]+$/, '')
      props.onTagNameChange(name)
    }
  }, [props.file])

  return (
    <div className="flex min-h-64 w-full flex-col gap-4">
      {props.file ? (
        <>
          <div className="aspect-video w-full">
            {fileSrc ? (
              <img
                src={fileSrc}
                alt="Selected Image"
                className="w-full object-contain"
              />
            ) : (
              <span>No Preview Image</span>
            )}
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full flex-row justify-center gap-4">
              <TextInput
                id="tag-name"
                className="w-full max-w-80"
                value={props.tagName}
                onChange={(e: any) => props.onTagNameChange(e.target.value)}
                placeholder="Enter an Image Label for this image"
                dense="auto"
              />

              <Button
                variant="outline"
                onClick={() => props.onFileSelect(null)}
              >
                Choose a different image
              </Button>
            </div>

            {props.isUploading && (
              <div className="flex w-full flex-row items-center justify-center">
                <ProgressBar
                  className="w-full max-w-80"
                  progress={props.uploadProgress}
                  size="sm"
                  color="primary"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <FileInput
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={(files) => props.onFileSelect(files[0])}
        >
          <div className="border-bg-contrast-high flex aspect-video w-full flex-row items-center justify-center rounded-lg border border-2 border-dashed">
            <TextBody color="muted">
              Drag and drop your image here or click to browse
            </TextBody>
          </div>
        </FileInput>
      )}
    </div>
  )
}

export { UploadNewImage }
