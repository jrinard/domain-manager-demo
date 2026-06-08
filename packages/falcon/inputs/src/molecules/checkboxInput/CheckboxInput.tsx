import { mergeClasses } from '@falcon/style'
import React, { ElementRef, forwardRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import {
  Label,
  Checkbox as CheckboxCore,
  CheckboxProps as CheckboxPropsCore,
} from '@spacedock/falcon-ui'

export type CheckboxInputProps = CheckboxPropsCore & {
  label?: string
  labelClassName?: string
}

const CheckboxInput = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxInputProps
>(({ className, label, labelClassName, ...props }, ref) => {
  return (
    <div className={mergeClasses('flex items-center space-x-2', className)}>
      <CheckboxCore {...props} id={label} ref={ref} />
      {label && (
        <Label
          textType="body"
          htmlFor={label}
          className={mergeClasses(labelClassName)}
        >
          {label}
        </Label>
      )}
    </div>
  )
})
CheckboxInput.displayName = CheckboxPrimitive.Root.displayName

export { CheckboxInput }
