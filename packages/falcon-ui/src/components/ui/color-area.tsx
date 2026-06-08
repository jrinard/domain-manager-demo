import type { ColorAreaProps } from 'react-aria-components'
import { ColorArea as ColorAreaPrimitive } from 'react-aria-components'
import { mergeClasses as cx } from '@falcon/style'
import { ColorThumb } from './color-thumb'

const ColorArea = ({ className, ...props }: ColorAreaProps) => {
  return (
    <ColorAreaPrimitive
      {...props}
      data-slot="color-area"
      className={cx(
        'bg-muted size-56 shrink-0 rounded-md forced-colors:bg-[GrayText]',
        className,
      )}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        background: isDisabled ? undefined : defaultStyle.background,
      })}
    >
      <ColorThumb />
    </ColorAreaPrimitive>
  )
}

export { ColorArea }
