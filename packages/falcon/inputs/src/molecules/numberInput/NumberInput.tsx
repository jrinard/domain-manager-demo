import { IconButton } from '@spacedock/falcon-ui'
import { useNumber } from '@spacedock/use-number'
import React, { forwardRef, ChangeEvent, useEffect } from 'react'
import { useObjectRef } from '@react-aria/utils'
import { Input, InputProps } from '@falcon/input'

export type NumberInputProps = Omit<InputProps, 'onChange'> & {
  onChange?: (value: number) => void
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { value: passedValue, onChange, ...props }: NumberInputProps,
    refForward
  ) => {
    const ref = useObjectRef<HTMLInputElement>(refForward)
    const [value, { set, decrement, increment }] = useNumber(passedValue, {
      min: Number(props.min),
      max: Number(props.max),
      step: Number(props.step),
    })

    useEffect(() => {
      onChange?.(value)
    }, [value])

    return (
      <Input
        {...props}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const newValue = Number(e.target.value)
          set(newValue)
          onChange?.(newValue)
        }}
        value={value}
        inputMode="numeric"
        ref={ref}
        onKeyUp={(e) => {
          if (props.disabled) return
          if (e.key === 'ArrowDown') {
            decrement()
          }
          if (e.key === 'ArrowUp') {
            increment()
          }
        }}
        trailingChildren={
          <div className="flex flex-col">
            <IconButton
              aria-label={`${props['aria-label'] || 'number-input'}-increment`}
              disabled={props.disabled}
              onClick={() => {
                increment()
              }}
              type="button"
              icon="chevron-up"
            />
            <IconButton
              aria-label={`${props['aria-label'] || 'number-input'}-decrement`}
              disabled={props.disabled}
              onClick={() => {
                decrement()
              }}
              type="button"
              icon="chevron-down"
            />
          </div>
        }
      />
    )
  }
)
NumberInput.displayName = 'NumberInput'

export { NumberInput }
