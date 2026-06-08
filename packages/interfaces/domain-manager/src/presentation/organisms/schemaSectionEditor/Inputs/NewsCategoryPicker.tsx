import { useCatalogNewsQuery } from '@tyto/query'
import { ComboBox } from '@spacedock/falcon-ui'
import { useMemo } from 'react'

export interface NewsCategoryPickerProps {
  domainID: number
  value: number
  onChange: (value: number) => void
}

export const NewsCategoryPicker = ({
  domainID,
  value,
  onChange,
}: NewsCategoryPickerProps) => {
  const { data: catalogNews } = useCatalogNewsQuery({
    primaryElementIDs: [domainID],
  })

  const categories = useMemo(() => {
    const items: {
      value: string
      item: React.ReactElement
      properties: Record<string, unknown>
    }[] = [
      {
        value: '0',
        item: <div>None (All Categories)</div>,
        properties: { catalogID: undefined },
      },
    ]
    if (!catalogNews?.catalogs) {
      return items
    }

    catalogNews?.catalogs.forEach((catalog) =>
      items.push({
        value: catalog.catalogID.toString(),
        item: <div>{catalog.name}</div>,
        properties: {
          catalogID: catalog.catalogID,
        },
      }),
    )

    return items
  }, [catalogNews])

  return (
    <ComboBox
      triggerClassName="max-w-full w-full"
      items={categories}
      value={typeof value === undefined ? '0' : value.toString()}
      onChange={(newValue, item) =>
        onChange(
          (item?.properties as { catalogID: number })?.catalogID ??
            Number(newValue),
        )
      }
    />
  )
}
