'use client'

import React, { useEffect, useState } from 'react'
import type { ColorFieldProps as ColorFieldPrimitiveProps } from 'react-aria-components'
import { ColorField as ColorFieldPrimitive } from 'react-aria-components'
import { twJoin } from 'tailwind-merge'
import { mergeClasses as cx } from '@falcon/style'
import { ColorPicker } from './color-picker'
import { ColorSwatch } from './color-swatch'
import {
  Description,
  FieldError,
  FieldGroup,
  type FieldProps,
  Input,
  Label,
} from './field'
import { parseColor } from '@react-stately/color'

interface ColorFieldProps extends ColorFieldPrimitiveProps, FieldProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isLoading?: boolean
  enableColorPicker?: boolean
}

const ColorField = ({
  label,
  description,
  errorMessage,
  placeholder,
  prefix,
  suffix,
  isLoading,
  enableColorPicker = true,
  className,
  ...props
}: ColorFieldProps) => {
  const value = props.value ?? props.defaultValue
  const hexValue = value?.toString('hex')
  const [inputValue, setInputValue] = useState<string>(hexValue ?? '')
  useEffect(() => {
    setInputValue(hexValue ?? '')
  }, [hexValue])
  const isValidPartialHex = (s: string) => {
    // Allow: "", "#", "#f", "#ff", "#fff", "#ffff", "#ffffff", "#ffffffff"
    // Do not propagate invalid strings to onChange
    return /^#?[0-9a-fA-F]{0,8}$/.test(s)
  }
  return (
    <ColorFieldPrimitive
      {...props}
      aria-label={props['aria-label'] ?? 'Color field'}
      className={cx(
        '**:data-[slot=color-swatch]:-ml-0.5 group flex w-full flex-col gap-y-1 *:data-[slot=label]:font-medium',
        className,
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-loading={isLoading ? 'true' : undefined}>
        {prefix && typeof prefix === 'string' ? (
          <span className="ml-2 text-neutral-500">{prefix}</span>
        ) : (
          prefix
        )}
        <div className={twJoin('flex w-full items-center', prefix && 'ml-6')}>
          {value && (
            <span className="ml-1">
              {enableColorPicker ? (
                <ColorPicker
                  className="*:[button]:size-8 *:[button]:rounded-sm *:[button]:ring-0"
                  onChange={props.onChange}
                  defaultValue={value}
                />
              ) : (
                <ColorSwatch className="size-6" color={value.toString('hex')} />
              )}
            </span>
          )}

          <Input
            className="bg-inherit"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => {
              const next = e.target.value
              if (!isValidPartialHex(next)) return
              setInputValue(next)
              // Only emit when looks like a complete 3/6/8-digit hex (with or without #)
              const normalized = next.startsWith('#') ? next : `#${next}`
              const hexDigits = normalized.replace('#', '')
              const complete =
                hexDigits.length === 3 ||
                hexDigits.length === 6 ||
                hexDigits.length === 8
              if (complete) {
                const color = parseColor(normalized)
                props.onChange?.(color)
              }
            }}
          />
        </div>
        {suffix && typeof suffix === 'string' ? (
          <span className="mr-2 text-neutral-500">{suffix}</span>
        ) : (
          suffix
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ColorFieldPrimitive>
  )
}

export type { ColorFieldProps }
export { ColorField }
