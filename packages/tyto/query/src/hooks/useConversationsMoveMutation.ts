import { useMutation } from '@tanstack/react-query'
import { TytoEndpoints, useTytoClient } from '@tyto/client'

interface UseMutationProps {
  onSuccess: (
    responseData: (
      | TytoEndpoints.CatalogItem.Post.Response
      | TytoEndpoints.CatalogItem.Put.Response
    )[]
  ) => void
  onError?: (error: unknown) => void
}

interface MutationProps {
  toCatalogID: number
  items: {
    id: number
    catalogIDs?: number[] | undefined
  }[]
}

function useConversationsMoveMutation({
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationFn: async ({ toCatalogID, items }: MutationProps) => {
      const calls: Promise<
        | TytoEndpoints.CatalogItem.Post.Response
        | TytoEndpoints.CatalogItem.Put.Response
      >[] = []
      items.forEach((item) => {
        if (item.catalogIDs?.length) {
          calls.push(
            tytoClient.CatalogItem.put({
              catalogID: item.catalogIDs[0],
              parentCatalogID: toCatalogID,
            })
          )
        } else {
          calls.push(
            tytoClient.CatalogItem.post({
              locID: item.id,
              parentCatalogID: toCatalogID,
              ocType: 'ocNOTICE',
            })
          )
        }
      })
      const result = await Promise.all<
        Promise<
          | TytoEndpoints.CatalogItem.Post.Response
          | TytoEndpoints.CatalogItem.Put.Response
        >
      >(calls)
      return result
    },
    onSettled(data, error, variables) {
      if (!error && data) {
        onSuccess(data)
      } else if (error) {
        onError?.(error)
      }
    },
  })
}

export { useConversationsMoveMutation }
export default useConversationsMoveMutation
