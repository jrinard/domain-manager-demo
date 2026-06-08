import { mergeClasses } from '@falcon/style'
import { ComboBox, ComboBoxProps, SkeletonText } from '@spacedock/falcon-ui'
import { DeepKeys, FieldApi, FormApi } from '@tanstack/react-form'
import React from 'react'

import { Field } from '../../molecules/field/Field'

export type ComboBoxInputFieldProps<
  FormData,
  FieldName extends DeepKeys<FormData>,
> = Omit<ComboBoxProps, 'name'> & {
  field?: FieldApi<FormData, FieldName, undefined, any>
  label?: string
  required?: boolean
  isLoading?: boolean
  className?: string
  form?: FormApi<FormData, any>
  name?: DeepKeys<FormData>
}

const ComboBoxInputField = <FormData, FieldName extends DeepKeys<FormData>>({
  label,
  field,
  required,
  isLoading,
  className,
  form,
  onChange,
  name,
  ...props
}: ComboBoxInputFieldProps<FormData, FieldName>) => {
  if (!form && !field) {
    throw new Error(
      '@falcon/form Fields must specify either form or field properties ',
    )
  }
  if (form && !field) {
    throw new Error('@falcon/form ComboBoxField coming soon')
  }
  if (field) {
    return (
      <Field
        name={field.name as string}
        label={label}
        meta={field.state.meta}
        required={required}
        className={mergeClasses('w-full', className || '')}
      >
        {isLoading && <SkeletonText size="6xl" className="w-full" />}
        {!isLoading && (
          <ComboBox
            {...props}
            name={field.name as string}
            value={
              field.state.value !== undefined
                ? (field.state.value as never)
                : undefined
            }
            onBlur={field.handleBlur}
            onChange={(value) => {
              if (onChange) {
                return onChange(value)
              }
              return field.handleChange(value as never)
            }}
          />
        )}
      </Field>
    )
  }
  return null
}
ComboBoxInputField.displayName = 'ComboBoxInputField'

export { ComboBoxInputField }
