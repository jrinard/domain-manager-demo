import React, { forwardRef } from 'react'
import { Input, InputProps } from '@falcon/input'

export type TextInputProps = InputProps

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ ...props }: TextInputProps, ref) => {
    return <Input {...props} type="text" ref={ref} />
  }
)
TextInput.displayName = 'TextInput'

export { TextInput }
