import { cva } from '@falcon/style'
import type { VariantProps } from 'class-variance-authority'
import React, { forwardRef, ReactElement } from 'react'

import { TextInput, TextInputProps } from '../textInput/TextInput'

const variants = cva('', {
  variants: {},
  defaultVariants: {},
})

export interface ChipsInputProps
  extends TextInputProps,
    VariantProps<typeof variants> {
  items?: ReactElement[]
}

const ChipsInput = forwardRef<HTMLInputElement, ChipsInputProps>(
  ({ items, ...props }: ChipsInputProps, ref) => {
    return <TextInput leadingChildren={items} ref={ref} {...props} />
  },
)
ChipsInput.displayName = 'ChipsInput'

export { ChipsInput }
