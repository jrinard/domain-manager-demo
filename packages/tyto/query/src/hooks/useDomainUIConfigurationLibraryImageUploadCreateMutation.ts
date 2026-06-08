import { useMutation } from '@tanstack/react-query'
import {
  useTytoClient,
  DomainUIConfigurationLibraryImageUpload,
} from '@tyto/client'
import { omit, get } from 'lodash'

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<
        ReturnType<
          typeof DomainUIConfigurationLibraryImageUpload.prototype.post
        >
      >,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: unknown) => void
}

function useDomainUIConfigurationLibraryImageUploadCreateMutation<
  TypeOverrides,
>({ cacheKey, onSuccess, onError }: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [
      tytoClient.DomainUIConfigurationLibraryImageUpload.endpoint,
      cacheKey,
    ],
    mutationFn: async (
      props: Parameters<
        typeof DomainUIConfigurationLibraryImageUpload.prototype.post
      >[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.DomainUIConfigurationLibraryImageUpload.post(
        props,
      )
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        ['initialized', ''].includes(get(data, 'error.msg'))
      ) {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(error)
      } else {
        onError?.(get(data, 'error.msg'))
      }
    },
  })
}

export { useDomainUIConfigurationLibraryImageUploadCreateMutation }
export default useDomainUIConfigurationLibraryImageUploadCreateMutation
