import { useMutation } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

const useCreateInboxCatalogMutation = ({
  onSuccess,
}: {
  onSuccess: (
    responseData: Endpoints.Tyto.CatalogInbox.Post.Response,
    args: Endpoints.Tyto.CatalogInbox.Post.Parameters
  ) => void
}) => {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async (args: Endpoints.Tyto.CatalogInbox.Post.Parameters) => {
      return await tytoClient.CatalogInbox.post(args)
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data, variables)
      }
      // Error will be returned by `instanceOfTheMutationHook.error`
    },
  })
}
export { useCreateInboxCatalogMutation }
export default useCreateInboxCatalogMutation
