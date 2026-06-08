import { useMemo } from 'react'
import { keyBy } from 'lodash'
import { useDomainUIQuery } from '@tyto/query'
import { TytoData } from '@spacedock/manifest'

type DomainUIImage = NonNullable<
  ReturnType<typeof useDomainUIQuery>['data']
>['domainUI']['images'][number]

export const useKeyedDomainImages = ({ domainID }: { domainID: number }) => {
  const {
    data: domainUI,
    isPending,
    isError,
    error,
    refetch: refetchDomainUI,
  } = useDomainUIQuery({ domainID, disabled: !domainID })

  const keyedImages = useMemo(() => {
    return keyBy(
      domainUI?.domainUI?.images,
      (image: DomainUIImage) => image.imageName as TytoData.DomainUIImageType,
    ) as Record<TytoData.DomainUIImageType, DomainUIImage>
  }, [domainUI?.domainUI?.images])

  return {
    isPending,
    isError,
    error,
    domainUI,
    keyedImages,
    refetch: refetchDomainUI,
  }
}
