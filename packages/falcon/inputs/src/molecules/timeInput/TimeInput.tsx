import React, { forwardRef } from 'react'
import { Input, InputProps } from '@falcon/input'
import { useObjectRef } from '@react-aria/utils'

export type TimeInputProps = InputProps
/*
Expects value to be passed in 24 hour format,
Example: 13:55 passed to component will look like 1:55 PM
*/

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ ...props }: TimeInputProps, refForward) => {
    const ref = useObjectRef<HTMLInputElement>(refForward)
    return (
      <Input
        {...props}
        ref={ref}
        type={'time'}
        disableNativeIcons
        trailingIcon="clock-outline"
      />
    )
  }
)

TimeInput.displayName = 'TimeInput'

export { TimeInput }
