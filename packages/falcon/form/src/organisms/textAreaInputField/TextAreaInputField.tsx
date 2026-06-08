import { SkeletonText } from '@spacedock/falcon-ui'
import { DeepKeys, FieldApi } from '@tanstack/react-form'
import React from 'react'

import { TextAreaInput, TextAreaInputProps } from '@falcon/inputs'
import { Field } from '../../molecules/field/Field'

export type TextAreaInputFieldProps<
  FormData,
  FieldName extends DeepKeys<FormData>
> = TextAreaInputProps & {
  field: FieldApi<FormData, FieldName>
  label?: string
  isLoading?: boolean
}

const TextAreaInputField = <FormData, FieldName extends DeepKeys<FormData>>({
  label,
  field,
  required,
  isLoading,
  ...props
}: TextAreaInputFieldProps<FormData, FieldName>) => {
  return (
    <Field
      name={field.name as string}
      label={label}
      meta={field.state.meta}
      required={required}
      className="w-full"
    >
      {isLoading && <SkeletonText size={'5xl'} className="w-full" />}
      {!isLoading && (
        <TextAreaInput
          {...props}
          name={field.name as string}
          value={(field.state.value as never) || ''}
          onBlur={field.handleBlur}
          onChange={(e) => {
            field.handleChange(e.target.value as never)
            props.onChange?.(e as never)
          }}
        />
      )}
    </Field>
  )
}
TextAreaInputField.displayName = 'TextAreaInputField'

export { TextAreaInputField }
