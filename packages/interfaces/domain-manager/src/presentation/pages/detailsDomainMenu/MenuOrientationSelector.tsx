import { Icon } from '@falcon/icons'
import { ComboBox, TextBody, Tooltip } from '@spacedock/falcon-ui'
import { isCherry } from '@spacedock/origins'
import { useMemo } from 'react'

interface MenuOrientationSelectorProps {
  value: string
  onChange: (value: string) => void
}

const allMenuLayoutOptions = [
  { value: 'left', item: 'Legacy Menu' },
  { value: 'top', item: 'Top Menu' },
]

export const MenuOrientationSelector = ({
  value,
  onChange,
}: MenuOrientationSelectorProps) => {
  // Filter out Legacy Menu option on cherry servers
  const menuLayoutOptions = useMemo(() => {
    if (isCherry()) {
      return allMenuLayoutOptions.filter((option) => option.value !== 'left')
    }
    return allMenuLayoutOptions
  }, [])

  return (
    <div className="flex items-center gap-2 text-gray-300">
      <ComboBox items={menuLayoutOptions} value={value} onChange={onChange} />
      <Tooltip
        color="neutral"
        content={
          <div className="flex gap-4">
            {/* Legacy Menu Box */}
            <div className="flex flex-col gap-2">
              <TextBody size="s" className="font-bold text-white">
                Legacy Menu
              </TextBody>
              <div
                className="border-grayscale-800 bg-grayscale-600 flex overflow-hidden rounded border-2"
                style={{ width: '100px', height: '80px' }}
              >
                <div
                  className="bg-black"
                  style={{ width: '25px', height: '100%' }}
                />
                <div className="flex-1" />
              </div>
            </div>

            {/* Top Menu Box */}
            <div className="flex flex-col gap-2">
              <TextBody size="s" className="font-bold text-white">
                Top Menu
              </TextBody>
              <div
                className="border-grayscale-800 bg-grayscale-600 flex flex-col overflow-hidden rounded border-2"
                style={{ width: '100px', height: '80px' }}
              >
                <div
                  className="bg-black"
                  style={{ width: '100%', height: '20px' }}
                />
                <div className="flex-1" />
              </div>
            </div>
          </div>
        }
      >
        <Icon icon="information-circle-outline" size="xl" />
      </Tooltip>
    </div>
  )
}
