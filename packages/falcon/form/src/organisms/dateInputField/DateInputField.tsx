import { mergeClasses } from '@falcon/style'
import { SkeletonText } from '@spacedock/falcon-ui'
import { DeepKeys, FieldApi } from '@tanstack/react-form'
import React from 'react'

import { DateInput, DateInputProps } from '@falcon/inputs'
import { Field } from '../../molecules/field/Field'

export type DateInputFieldProps<
  FormData,
  FieldName extends DeepKeys<FormData>,
> = Omit<DateInputProps, 'name'> & {
  field: FieldApi<FormData, FieldName>
  label?: string
  isLoading?: boolean
  name?: string
  info?: string
}

/**
 * DateInput powered by Tanstack Form
 */
const DateInputField = <FormData, FieldName extends DeepKeys<FormData>>({
  label,
  field,
  required,
  isLoading,
  name,
  className,
  info,
  ...props
}: DateInputFieldProps<FormData, FieldName>) => {
  return (
    <Field
      name={name || (field.name as string)}
      label={label}
      meta={field.state.meta}
      required={required}
      info={info}
      className={mergeClasses('w-full', className || '')}
    >
      {isLoading && <SkeletonText size="5xl" className="w-full" />}
      {!isLoading && (
        <DateInput
          {...props}
          name={field.name as string}
          value={field.state.value as never}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value as never)}
          className="w-full min-w-0"
        />
      )}
    </Field>
  )
}
DateInputField.displayName = 'DateInputField'

export { DateInputField }
