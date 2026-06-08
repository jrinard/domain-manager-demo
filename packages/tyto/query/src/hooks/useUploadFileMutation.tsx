import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'
import type { AxiosProgressEvent } from 'axios'

import { useClientConfigQuery } from './useClientConfigQuery'

export type UploadFileArgs = Partial<
  Pick<Endpoints.Tyto.Upload.Post.Parameters, 'endpointURL'>
> & {
  file: File | Blob
}

export const useUploadFileMutation = ({
  throwOnError,
  controller,
  uploadKey,
  onUploadProgress,
  onSuccess,
  onError,
}: {
  throwOnError?: boolean
  controller?: AbortController
  uploadKey?: string
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  onSuccess: (
    responseData: Endpoints.Tyto.Upload.Post.Response,
    args: UploadFileArgs,
  ) => void
  onError?: (error: unknown) => void
}) => {
  const tytoClient = useTytoClient()
  const clientConfigQuery = useClientConfigQuery({})

  return useMutation({
    throwOnError: throwOnError,
    mutationKey: [tytoClient.Upload.endpoint, uploadKey],
    mutationFn: async (args: UploadFileArgs) => {
      let data = clientConfigQuery.data
      // * If the Client Config query has not yet successfully loaded data, then await a refetch and use the response.
      // * NOTE: Because of the way TanStack Query works, if it is already loading the data, the below `.refetch()`
      // * NOTE: will return the *existing* query promise (no duplicate calls! :D)
      if (!data) {
        data = (await clientConfigQuery.refetch()).data
      }

      // TODO: [TEMP PATCH - REMOVE LATER] TUS Override Patch
      // * This is a temporary workaround to skip TUS-enabled upload services.
      // * The endpoint fails with a post when it has been working.
      // * TUS services (those with 'tus=1' in query params) require TUS protocol headers,
      // * but our code currently uses POST with multipart/form-data which doesn't work with TUS endpoints.
      // *
      // * TO REMOVE: Search for "TUS Override Patch" and restore the original logic:
      // *   const uploadServiceURL = args.endpointURL ?? data?.uploadServices?.[0]
      // *
      // * This should be removed once proper TUS protocol support is implemented.
      const uploadServices = data?.uploadServices ?? []
      const nonTUSService = uploadServices.find((url) => {
        try {
          const urlObj = new URL(url)
          return !urlObj.searchParams.has('tus')
        } catch {
          // If URL parsing fails, check with string matching
          return !url.includes('tus=')
        }
      })
      let uploadServiceURL =
        args.endpointURL ?? nonTUSService ?? uploadServices[0]

      // * If Upload Service is not found, throw an error; nothing more to do here.
      // * Can't upload to nowhere, and there is not a default upload service accross all instances (at leats not as of July 2023).
      if (!uploadServiceURL) {
        throw new Error('No upload service found')
      }

      // Remove tus=1 parameter from upload URL if present
      try {
        const url = new URL(uploadServiceURL)
        url.searchParams.delete('tus')
        uploadServiceURL = url.toString()
      } catch {
        // If URL parsing fails, use the original URL
      }

      const resp = await tytoClient.Upload.post(
        {
          endpointURL: uploadServiceURL,
          // * Genuinely cannot remember is a Blob needs to be converted to a `new File(...)` or not before being sent to the API...
          files: [args.file],
        },
        {
          axiosConfig: {
            onUploadProgress,
            baseURL: uploadServiceURL,
            signal: controller?.signal,
          },
        },
      )

      return resp
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data, variables)
      } else if (error) {
        onError?.(error)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export default useUploadFileMutation
