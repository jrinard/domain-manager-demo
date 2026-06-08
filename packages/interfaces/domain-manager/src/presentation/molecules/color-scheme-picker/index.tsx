import { ComboBox } from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import type { TytoData } from '@spacedock/manifest'

const COLOR_SCHEME_OPTIONS = [
  {
    value: 'light',
    item: (
      <div className="flex flex-row items-center gap-2">
        <div className="flex min-w-8 flex-row items-center justify-end gap-0.5">
          <Icon
            className="text-sm text-white"
            color="current"
            icon="white-balance-sunny"
          />
        </div>{' '}
        Light Only
      </div>
    ),
  },
  {
    value: 'dark',
    item: (
      <div className="flex flex-row items-center gap-2">
        <div className="flex min-w-8 flex-row items-center justify-end gap-0.5">
          <Icon
            className="text-sm text-white"
            color="current"
            icon="moon-waning-crescent"
          />
        </div>
        Dark Only
      </div>
    ),
  },
  {
    value: 'light,dark',
    item: (
      <div className="flex flex-row items-center gap-2">
        <div className="flex min-w-8 flex-row items-center justify-end gap-0.5">
          <Icon
            className="text-site-fg text-sm"
            color="current"
            icon="white-balance-sunny"
          />
          <Icon
            className="text-muted text-sm"
            color="current"
            icon="moon-waning-crescent"
          />
        </div>
        <span className="italic opacity-60">Both</span> - Light by Default
      </div>
    ),
  },
  {
    value: 'dark,light',
    item: (
      <div className="flex flex-row items-center gap-2">
        <div className="flex min-w-8 flex-row items-center justify-end gap-0.5">
          <Icon
            className="text-site-fg text-sm"
            color="current"
            icon="moon-waning-crescent"
          />
          <Icon
            className="text-muted text-sm"
            color="current"
            icon="white-balance-sunny"
          />
        </div>
        <span className="italic opacity-60">Both</span> - Dark by Default
      </div>
    ),
  },
]

interface Props {
  value: TytoData.DomainProperties['colorSchemes']
  onChange: (value: TytoData.DomainProperties['colorSchemes']) => void
}

export const ColorSchemePicker = (props: Props) => {
  return (
    <ComboBox
      items={COLOR_SCHEME_OPTIONS}
      value={props.value}
      onChange={(itemValue) =>
        props.onChange(
          itemValue as NonNullable<TytoData.DomainProperties['colorSchemes']>,
        )
      }
    />
  )
}
