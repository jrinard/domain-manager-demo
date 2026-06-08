import { useState } from 'react'
import { TextHeading, TextBody, useToast } from '@spacedock/falcon-ui'
import { useTryybServices } from '@spacedock/tryyb-services'
import type { UploadAssetResult } from '@spacedock/tryyb-services'

import type { TytoData, DomainUI } from '@spacedock/manifest'

import { ImageCard } from '../imageCard'
import { useUpdateDomainUIMutation } from '../../../data/hooks/useUpdateDomainPropertiesMutation'
import { useDomainUIImageDeleteMutation } from '@tyto/query'
import { createFileURL } from '../../../data/utils/file-path'

interface DomainImagesProps {
  domainID: number
  domainImages: Record<TytoData.DomainUIImageType, DomainUI.Image>
  refetch?: () => void
}

interface UploadProgress {
  [key: string]: number | undefined
}

const IMAGE_CONFIGS = [
  {
    key: 'logo_link' as TytoData.DomainUIImageType,
    title: 'Light Logo',
    description: 'Logo used in Light mode',
    variety: 'light' as const,
  },
  {
    key: 'logo_link_DARK' as TytoData.DomainUIImageType,
    title: 'Dark Logo',
    description: 'Logo used in Dark Mode',
    variety: 'dark' as const,
  },
  {
    key: 'logoImagePath' as TytoData.DomainUIImageType,
    title: 'Logon Screen Logo',
    description: 'Logo displayed on the login page',
    variety: 'neutral' as const,
  },
  {
    key: 'backgroundImagePath' as TytoData.DomainUIImageType,
    title: 'Logon Screen Background',
    description: 'Background image for the login page',
    variety: 'neutral' as const,
  },
]

export const DomainImages = (props: DomainImagesProps) => {
  const toast = useToast()
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})

  const domainUIMutator = useUpdateDomainUIMutation({
    domainID: props.domainID,
  })

  const deleteImageMutator = useDomainUIImageDeleteMutation({
    onSuccess: () => {
      // no-op, handled inline after mutate
    },
    onError: () => {
      // no-op, handled in catch
    },
  })

  const services = useTryybServices()

  const handleFileChange = async (
    file: File | undefined,
    imageKey: TytoData.DomainUIImageType,
  ) => {
    try {
      setUploadProgress((prev) => ({ ...prev, [imageKey]: 0 }))
      let uploadResult = null as UploadAssetResult | TytoData.Upload | null

      if (file) {
        // Native file input -> direct upload (no chooser)
        uploadResult = (await services.uploadFile(file)) as
          | UploadAssetResult
          | TytoData.Upload
      } else {
        // No file provided -> fall back to chooser flow (keeps parity with ImagesPage)
        uploadResult = (await services.uploadFileViaChooser()) as
          | UploadAssetResult
          | TytoData.Upload
      }

      const tempKey =
        'uploadFiles' in uploadResult &&
        uploadResult.uploadFiles?.[0]?.fileUploadKey
          ? uploadResult.uploadFiles[0].fileUploadKey
          : 'url' in uploadResult
            ? uploadResult.url
            : undefined

      if (!tempKey) {
        toast.toastError({ description: 'Upload did not return an upload key' })
        setUploadProgress((prev) => {
          const newProgress = { ...prev }
          delete (newProgress as any)[imageKey]
          return newProgress
        })
        return
      }

      await domainUIMutator.updateDomainUI({
        domainImages: {
          [imageKey]: tempKey,
        },
      })

      setUploadProgress((prev) => {
        const newProgress = { ...prev }
        delete (newProgress as any)[imageKey]
        return newProgress
      })

      toast.toastSuccess({
        description: `Successfully uploaded ${IMAGE_CONFIGS.find((c) => c.key === imageKey)?.title}`,
      })
      // Ensure parent wizard remains open after chooser/direct upload finishes
      window.dispatchEvent(new CustomEvent('domain-wizard-keep-open'))
    } catch (err) {
      console.error(err)
      setUploadProgress((prev) => {
        const newProgress = { ...prev }
        delete (newProgress as any)[imageKey]
        return newProgress
      })
      toast.toastError({
        description: 'Failed to upload image',
      })
      // Keep wizard open even on error so user can retry
      window.dispatchEvent(new CustomEvent('domain-wizard-keep-open'))
    }
  }

  const handleRemoveFile = async (imageKey: TytoData.DomainUIImageType) => {
    try {
      const existingImage = props.domainImages[imageKey]
      if (existingImage?.imageID) {
        await deleteImageMutator.mutateAsync({ imageID: existingImage.imageID })
      }

      toast.toastSuccess({
        description: `Successfully removed ${IMAGE_CONFIGS.find((c) => c.key === imageKey)?.title}`,
      })

      props.refetch?.()
    } catch (err) {
      console.error(err)
      toast.toastError({
        description: 'Failed to remove image',
      })
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <TextHeading>Domain Images</TextHeading>
        <TextBody className="text-grayscale-500 mt-2">
          Upload the essential images for your domain. These images will be used
          throughout your domain's interface.
        </TextBody>
      </div>

      <div className="flex flex-wrap gap-4">
        {IMAGE_CONFIGS.map((config) => {
          const existingImage = props.domainImages[config.key]
          const imageUrl = existingImage?.pathURL
            ? createFileURL(existingImage.pathURL)
            : undefined

          return (
            <ImageCard
              key={config.key}
              title={config.title}
              description={config.description}
              imageUrl={imageUrl}
              onFileChange={(file) => handleFileChange(file, config.key)}
              onRemoveFile={
                imageUrl ? () => handleRemoveFile(config.key) : undefined
              }
              variety={config.variety as any}
              uploadProgress={uploadProgress[config.key]}
            />
          )
        })}
      </div>
    </div>
  )
}
