import React, { forwardRef } from 'react'
import { Input, InputProps } from '@falcon/input'
import { useObjectRef } from '@react-aria/utils'

export type PasswordInputProps = InputProps

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { value: passedValue, onChange, ...props }: PasswordInputProps,
    refForward,
  ) => {
    const ref = useObjectRef<HTMLInputElement>(refForward)
    const [passwordVisable, setPasswordVisable] = React.useState(false)
    return (
      <Input
        {...props}
        onChange={onChange}
        value={passedValue}
        ref={ref}
        type={passwordVisable ? 'text' : 'password'}
        trailingIcon={passwordVisable ? 'eye-off' : 'eye'}
        onTrailingClick={(e) => {
          e.preventDefault?.()
          e.stopPropagation?.()
          setPasswordVisable(!passwordVisable)
        }}
      />
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
