import { noop } from 'lodash'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'
import type { AxiosProgressEvent } from 'axios'

import { useUploadFileMutation } from './useUploadFileMutation'
import type { UploadFileArgs } from './useUploadFileMutation'
import { useSaveForLessonMutation } from './useSaveForLessonMutation'

type SaveForLessonArgs = UploadFileArgs &
  Endpoints.Tyto.SaveForLesson.Post.Parameters

export const useCreateFileWithLessonMutation = ({
  uploadController,
  uploadKey,
  onUploadProgress,
  onUploadSuccess,
  onSuccess,
  onError,
}: {
  uploadController?: AbortController
  uploadKey?: string
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onUploadSuccess?: (
    responseData: Endpoints.Tyto.Upload.Post.Response,
    args: UploadFileArgs,
  ) => void
  onSuccess: (
    responseData: Endpoints.Tyto.SaveForLesson.Post.Response | null,
    args: SaveForLessonArgs,
  ) => void
  onError?: (error: unknown) => void
}) => {
  const tytoClient = useTytoClient()
  const uploadFileMutation = useUploadFileMutation({
    controller: uploadController,
    uploadKey,
    onUploadProgress,
    onSuccess: onUploadSuccess ?? noop,
  })
  const saveForLessonMutation = useSaveForLessonMutation({
    uploadKey,
    onSuccess: noop,
  })

  return useMutation({
    mutationKey: [tytoClient.Upload.endpoint, uploadKey],
    mutationFn: async ({
      file,
      endpointURL,
      ...saveForLessonArgs
    }: SaveForLessonArgs) => {
      const uploadResp = await uploadFileMutation.mutateAsync({
        file,
        endpointURL,
      })

      const uploadKey = uploadResp.uploadFiles?.[0]?.fileUploadKey

      // * If Upload Service is not found, throw an error; nothing more to do here.
      // * Can't upload to nowhere, and there is not a default upload service across all instances (at leats not as of July 2023).
      if (!uploadKey) {
        throw new Error(
          'Upload Response did not contain data needed to move on.',
        )
      }

      const saveForLessonResp = await saveForLessonMutation.mutateAsync({
        tempFileName: uploadKey,
        ...saveForLessonArgs,
      })

      if (!saveForLessonResp?.lesson?.lessonID) {
        throw new Error(
          'Lesson Saving Endpoint Response did not contain data needed to move on.',
        )
      }

      return saveForLessonResp
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data || null, variables)
      } else if (error) {
        onError?.(error)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}

/**
 * Query Version of `useCreateFileWithLessonMutation` that auto runs and caches response from last upload attempt
 * @returns SaveForLesson Response
 */
export const useCreateFileWithLessonQuery = ({
  file,
  endpointURL,
  lessonArgs,
  uploadController,
  uploadKey,
  onUploadProgress,
  onUploadSuccess,
  onCompletion,
  onError,
  isEnabled = true,
}: {
  file: File
  endpointURL?: string
  lessonArgs?: Endpoints.Tyto.SaveForLesson.Post.Parameters
  uploadController?: AbortController
  uploadKey?: string
  isEnabled?: boolean
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onUploadSuccess?: (
    responseData: Endpoints.Tyto.Upload.Post.Response,
    args: UploadFileArgs,
  ) => void
  onCompletion: (
    responseData: Pick<
      Endpoints.Tyto.SaveForLesson.Post.Response,
      'asset' | 'lesson'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}) => {
  const tytoClient = useTytoClient()
  const uploadFileMutation = useUploadFileMutation({
    throwOnError: false,
    controller: uploadController,
    uploadKey,
    onUploadProgress,
    onSuccess: onUploadSuccess ?? noop,
    onError: onError,
  })
  const saveForLessonMutation = useSaveForLessonMutation({
    uploadKey,
    onSuccess: noop,
  })

  const queryKey = [
    'upload-service',
    tytoClient.Upload.endpoint ?? '',
    uploadKey ?? '',
  ]

  return useQuery({
    throwOnError: false,
    queryKey,
    enabled: isEnabled,
    retry: false,
    queryFn: async () => {
      const uploadResp = await uploadFileMutation.mutateAsync({
        file,
        endpointURL,
      })

      const uploadKey = uploadResp?.uploadFiles?.[0]?.fileUploadKey

      // * If Upload Service is not found, throw an error; nothing more to do here.
      // * Can't upload to nowhere, and there is not a default upload service accross all instances (at leats not as of July 2023).
      if (!uploadKey) {
        throw new Error(
          'Upload Response did not contain data needed to move on.',
        )
      }

      const saveForLessonResp = await saveForLessonMutation.mutateAsync({
        tempFileName: uploadKey,
        ...lessonArgs,
      })

      if (!saveForLessonResp?.lesson?.lessonID) {
        throw new Error(
          'File successfully saved, but not identifier was returned.',
        )
      }

      const { lesson } = await tytoClient.Lesson.get({
        lessonID: saveForLessonResp.lesson.lessonID,
      })

      const resp = {
        asset: lesson.assets?.[0],
        lesson,
      }

      // * This is really gross. Would typically pass in an `onComplete` and use such
      // * But apparently `useQuery` is depreacting such methods
      onCompletion?.(resp)

      return resp

      // * return saveForLessonResp
    },
    // onSettled(data, error) {
    //   if (!error && data) {
    //     onSuccess(data)
    //   } else if (error) {
    //     onError?.(error)
    //   }
    //   // Error will be returned by `instanceOfTheMutationHook.error`
    // },
  })
}

export {
  useCreateFileWithLessonMutation as useSaveAttachmentMutation,
  useCreateFileWithLessonQuery as useSaveAttachmentQuery,
}
export default useCreateFileWithLessonMutation
