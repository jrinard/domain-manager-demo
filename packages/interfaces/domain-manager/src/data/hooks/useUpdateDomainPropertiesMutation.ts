import { useCallback } from 'react'
import { useQueryClient } from '@tyto/query'
import { useDomainUIUpdateMutation } from '@tyto/query'
import type { TytoData } from '@spacedock/manifest'

type CallbackArgs = {
  properties?: Partial<TytoData.DomainProperties>
  domainImages?: Partial<Record<TytoData.DomainUIImageType, string>>
}

export const useUpdateDomainUIMutation = ({
  domainID,
}: {
  domainID: number
}) => {
  const queryClient = useQueryClient()

  const mutator = useDomainUIUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['/Domain/UI', { domainID }],
      })
    },
  })

  const updateDomainUI = useCallback(
    ({ properties, domainImages }: CallbackArgs) => {
      return mutator.mutateAsync({
        domainID,
        uiKeyValues: properties ? domainPropertiesToUIKeys(properties) : [],
        uiImages: domainImages ? domainImagesToUIImages(domainImages) : [],
      })
    },
    [mutator, domainID],
  )

  return {
    updateDomainUI,
    isPending: mutator.isPending,
    isError: mutator.isError,
    error: mutator.error,
  }
}

function domainPropertiesToUIKeys(
  domainProperties: Partial<TytoData.DomainProperties>,
) {
  return Object.entries(domainProperties).map(([key, value]) => ({
    uiKey: key,
    uiValue: value,
  }))
}

function domainImagesToUIImages(
  domainImages: Partial<Record<TytoData.DomainUIImageType, string>>,
) {
  return Object.entries(domainImages).map(([key, value]) => ({
    imageName: key,
    tempUploadKey: value,
  }))
}
