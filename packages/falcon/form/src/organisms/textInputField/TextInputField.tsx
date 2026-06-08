import { mergeClasses } from '@falcon/style'
import { SkeletonText } from '@spacedock/falcon-ui'
import { DeepKeys, FieldApi } from '@tanstack/react-form'
import React from 'react'

import { TextInput, TextInputProps } from '@falcon/inputs'
import { Field } from '../../molecules/field/Field'

export type TextInputFieldProps<
  FormData,
  FieldName extends DeepKeys<FormData>
> = Omit<TextInputProps, 'name'> & {
  field: FieldApi<FormData, FieldName>
  label?: string
  isLoading?: boolean
  className?: string
}

const TextInputField = <FormData, FieldName extends DeepKeys<FormData>>({
  label,
  field,
  required,
  isLoading,
  className,
  ...props
}: TextInputFieldProps<FormData, FieldName>) => {
  return (
    <Field
      name={field.name as string}
      label={label}
      meta={field.state.meta}
      required={required}
      className={mergeClasses('w-full', className)}
    >
      {isLoading && (
        <SkeletonText size={props.dense ? '2xl' : '4xl'} className="w-full" />
      )}
      {!isLoading && (
        <TextInput
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
TextInputField.displayName = 'TextInputField'

export { TextInputField }
