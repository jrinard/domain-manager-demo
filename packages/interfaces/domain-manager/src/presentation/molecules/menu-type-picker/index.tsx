import { ComboBox } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import type { TytoData } from '@spacedock/manifest'

const MENU_TYPE_OPTIONS = [
  {
    value: 'top',
    item: (
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center justify-end gap-0.5">
          <Icon
            className="text-site-fg text-sm"
            color="current"
            icon="page-layout-header"
          />
        </div>{' '}
        Top Menu
      </div>
    ),
  },
  {
    value: 'side',
    item: (
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center justify-end gap-0.5">
          <Icon
            className="text-site-fg text-sm"
            color="current"
            icon="page-layout-sidebar-left"
          />
        </div>
        Side Menu
      </div>
    ),
  },
  //   {
  //     value: 'light,dark',
  //     item: (
  //       <div className="flex flex-row items-center gap-2">
  //         <div className="flex min-w-8 flex-row items-center justify-end gap-0.5">
  //           <Icon
  //             className="text-site-fg text-sm"
  //             color="current"
  //             icon="white-balance-sunny"
  //           />
  //           <Icon
  //             className="text-muted text-sm"
  //             color="current"
  //             icon="moon-waning-crescent"
  //           />
  //         </div>
  //         <span className="italic opacity-60">Both</span> - Light by Default
  //       </div>
  //     ),
  //   },
]

interface Props {
  value: TytoData.DomainProperties['menuType']
  onChange: (value: TytoData.DomainProperties['menuType']) => void
}

export const MenuTypePicker = (props: Props) => {
  return (
    <ComboBox
      items={MENU_TYPE_OPTIONS}
      value={props.value}
      onChange={(itemValue) =>
        props.onChange(
          itemValue as NonNullable<TytoData.DomainProperties['menuType']>,
        )
      }
    />
  )
}
