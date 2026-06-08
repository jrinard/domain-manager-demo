import { useMemo } from 'react'
import { useMenuQuery } from '@tyto/query'
import { FUNCTIONS_BY_NAME } from '@spacedock/manifest'

interface Props {
  disabled?: boolean
}

export function useAssignedCustomTabs({ disabled }: Props) {
  const { data, isLoading, error } = useMenuQuery({
    disabled,
  })

  const customTabs = useMemo(() => {
    return (
      data?.menuItems.find(
        (item) =>
          item.functionID === FUNCTIONS_BY_NAME['Page Portal']?.functionID,
      )?.subMenu ?? []
    )
  }, [data ?? null])

  return {
    customTabs,
    isLoading,
    error,
  }
}
