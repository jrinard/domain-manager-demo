import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export const useInboxCatalogUpdateMutation = ({
  onSuccess,
}: {
  onSuccess: (
    responseData: Endpoints.Tyto.CatalogInbox.Put.Response,
    args: Endpoints.Tyto.CatalogInbox.Put.Parameters
  ) => void
}) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (args: Endpoints.Tyto.CatalogInbox.Put.Parameters) => {
      return await tytoClient.CatalogInbox.put(args)
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data, variables)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export default useInboxCatalogUpdateMutation
