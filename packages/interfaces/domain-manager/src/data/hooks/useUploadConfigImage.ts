import _ from 'lodash'
import { useCallback } from 'react'
import {
  useDomainUIConfigurationLibraryImageUploadCreateMutation,
  useUploadFileMutation,
} from '@tyto/query'

export function useUploadConfigImage({
  domainID,
  configID,
  onProgress,
}: {
  domainID: number
  configID: string
  onProgress: (progress: number) => void
}) {
  const uploadImageMutator =
    useDomainUIConfigurationLibraryImageUploadCreateMutation({
      onSuccess: _.noop,
    })

  const uploadFileMutator = useUploadFileMutation({
    onSuccess: _.noop,
    onUploadProgress: (progress) => onProgress(progress?.progress ?? 0),
  })

  const uploadImage = useCallback(
    async (file: File, tag: string) => {
      const uploadResult = await uploadFileMutator.mutateAsync({
        file,
      })

      const saveImageResult = await uploadImageMutator.mutateAsync({
        domainID,
        UIconfigGUID: configID,
        tempUploadKey: uploadResult.uploadFiles[0].fileUploadKey,
        tag,
      })

      return saveImageResult
    },
    [uploadFileMutator, uploadImageMutator, configID],
  )

  return {
    uploadImage,
    isPending: uploadFileMutator.isPending || uploadImageMutator.isPending,
    isError: uploadFileMutator.isError || uploadImageMutator.isError,
    error: uploadFileMutator.error || uploadImageMutator.error,
  }
}
