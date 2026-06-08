import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export const useInboxCatalogDeleteMutation = ({
  onSuccess,
}: {
  onSuccess: (
    responseData: Endpoints.Tyto.CatalogInbox.Delete.Response,
    args: Endpoints.Tyto.CatalogInbox.Delete.Parameters
  ) => void
}) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (args: Endpoints.Tyto.CatalogInbox.Delete.Parameters) => {
      return await tytoClient.CatalogInbox.delete(args)
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data, variables)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export default useInboxCatalogDeleteMutation
