import { useMemo } from 'react'
import { useDomainUIQuery } from '@tyto/query'
import { TytoData } from '@spacedock/manifest'

export const useDomainProperties = ({ domainID }: { domainID: number }) => {
  const {
    data: domainUI,
    isPending,
    isError,
    error,
    refetch,
  } = useDomainUIQuery({ domainID, disabled: !domainID })

  const domainProperties = useMemo(() => {
    const domainProperties: Partial<TytoData.DomainProperties> = {}

    domainUI?.domainUI?.keyValues?.forEach((keyVal) => {
      setDomainProperty(domainProperties, keyVal)
    })

    return domainProperties
  }, [domainUI?.domainUI?.keyValues])

  const domainPropertiesWithDefaults =
    useMemo((): NonNullable<TytoData.DomainProperties> => {
      return {
        ...domainPropertiesDefaultValues(),
        ...domainProperties,
      }
    }, [domainProperties])

  return {
    isPending,
    isError,
    error,
    domainUI: domainUI?.domainUI,
    refetch,
    remoteDomainProperties: domainProperties,
    domainProperties: domainPropertiesWithDefaults,
  }
}

function setDomainProperty(
  domainPropertiesRef: Partial<TytoData.DomainProperties>,
  storedKeyValPair: NonNullable<
    ReturnType<typeof useDomainUIQuery>['data']
  >['domainUI']['keyValues'][number],
) {
  const uiKey = storedKeyValPair.uiKey as keyof TytoData.DomainProperties

  domainPropertiesRef[uiKey] = storedKeyValPair.uiValue as any
}

function domainPropertiesDefaultValues(): NonNullable<TytoData.DomainProperties> {
  return {
    taglineLabel: '',
    themePrimaryColor: '',
    themeSecondaryColor: '',
    colorSchemes: 'dark',
    menuType: 'top',
  }
}
