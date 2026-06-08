import { Icon } from '@falcon/icons'
import { parseColor } from '@react-stately/color'
import { useContext } from 'react'
import {
  ColorPicker as ColorPickerPrimitive,
  type ColorPickerProps as ColorPickerPrimitiveProps,
  ColorPickerStateContext,
} from 'react-aria-components'
import { twJoin, twMerge } from 'tailwind-merge'
import { Button } from './button'
import { ColorArea } from './color-area'
import { ColorField } from './color-field'
import { ColorSlider } from './color-slider'
import { ColorSwatch } from './color-swatch'
import { Description } from './field'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  type PopoverProps as PopoverContentProps,
} from '../../molecules/popover/Popover'

interface ColorPickerProps
  extends
    Omit<ColorPickerPrimitiveProps, 'children'>,
    Pick<PopoverContentProps, 'align'> {
  label?: string
  className?: string
  children?: React.ReactNode
  showArrow?: boolean
  isDisabled?: boolean
  description?: string
  eyeDropper?: boolean
}

const ColorPicker = ({
  showArrow = false,
  align = 'center',
  label,
  isDisabled,
  children,
  description,
  eyeDropper,
  className,
  ...props
}: ColorPickerProps) => {
  return (
    <div className={twMerge('flex flex-col items-start gap-y-1', className)}>
      <ColorPickerPrimitive {...props}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled={isDisabled}
              size={label ? 'default' : 'sm'}
              variant="secondary"
              className={twJoin(
                'w-auto rounded rounded-sm p-2 *:data-[slot=color-swatch]:-mx-0.5 *:data-[slot=color-swatch]:size-5',
                !label && 'size-10',
              )}
            >
              <ColorSwatch />
              {label && label}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="**:data-[slot=color-area]:w-full **:data-[slot=color-slider]:w-full sm:**:data-[slot=color-area]:size-56 *:[[role=dialog]]:p-4 sm:*:[[role=dialog]]:p-3 overflow-auto sm:min-w-min sm:max-w-56">
            <div className="flex flex-col gap-y-1.5">
              {children || (
                <>
                  <ColorArea
                    colorSpace="hsb"
                    xChannel="saturation"
                    yChannel="brightness"
                  />
                  <ColorSlider
                    showOutput={false}
                    colorSpace="hsb"
                    channel="hue"
                  />
                  <div className="flex items-center gap-1.5">
                    {eyeDropper && <EyeDropper />}
                    <ColorField
                      enableColorPicker={false}
                      className="h-9"
                      aria-label="Hex"
                      defaultValue={props.value}
                    />
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </ColorPickerPrimitive>
      {description && <Description>{description}</Description>}
    </div>
  )
}

declare global {
  interface Window {
    EyeDropper?: new () => {
      open: () => Promise<{ sRGBHex: string }>
    }
  }
}

const EyeDropper = () => {
  const state = useContext(ColorPickerStateContext)!

  if (!window.EyeDropper) {
    return 'EyeDropper is not supported in your browser.'
  }

  return (
    <Button
      aria-label="Eye dropper"
      size="sm"
      variant="outline"
      onClick={() => {
        const eyeDropper = window.EyeDropper ? new window.EyeDropper() : null
        eyeDropper
          ?.open()
          .then((result) => state.setColor(parseColor(result.sRGBHex)))
      }}
    >
      <Icon icon="eyedropper" />
    </Button>
  )
}

export type { ColorPickerProps }
export { ColorPicker, EyeDropper }
