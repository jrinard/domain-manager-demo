import React, { PropsWithChildren } from 'react'
import { Icon } from '@falcon/icons'
import { cva, mergeClasses, VariantProps } from '@falcon/style'
import { FieldMeta, ValidationError } from '@tanstack/react-form'
import { TextBody, Label, Tooltip } from '@spacedock/falcon-ui'

const variants = cva('flex flex-col', {
  variants: {
    required: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    required: false,
  },
})

export interface FieldProps
  extends PropsWithChildren,
    VariantProps<typeof variants> {
  label?: string
  className?: string
  /**
   * the input name (think of this like the id)
   */
  name: string
  /**
   * https://www.c-sharpcorner.com/article/pristine-vs-dirty-touched-vs-untouched-valid-vs-invalid-in-angular/
   */
  dirty?: boolean
  errors?: ValidationError[]
  labelType?: Parameters<typeof Label>[0]['textType']
  meta?: FieldMeta
  isValidating?: boolean
  info?: string
}

const Field = ({
  label,
  children,
  required,
  className,
  dirty,
  name,
  info,
  meta,
  ...props
}: FieldProps) => {
  const errors = [
    ...(props.errors || []),
    ...(meta?.errors || []),
    ...(meta?.touchedErrors || []),
  ]
  const isValidating: boolean =
    meta?.isValidating || props?.isValidating || false
  return (
    <div className={mergeClasses(variants({ required }), className)}>
      <div className="mb-2 flex flex-row items-center gap-2">
        {label && (
          <Label htmlFor={name} textType="body" className="truncate">
            {label}
          </Label>
        )}
        {dirty && (
          <Tooltip color="warn" content={<div>Unsaved Change</div>}>
            <Icon color="warn" icon="content-save-alert-outline" />
          </Tooltip>
        )}
        {info && (
          <Tooltip
            color="primary-muted"
            content={
              <TextBody size="xs" color="muted">
                {info}
              </TextBody>
            }
          >
            <Icon color="muted" icon="info-outline" />
          </Tooltip>
        )}
      </div>
      {children}
      {!isValidating && required && errors?.length < 1 && (
        <TextBody paragraph size="s" color="info">
          Required *
        </TextBody>
      )}
      {!isValidating && errors && (
        <TextBody size="s" color="error" paragraph role="alert">
          {errors.map((error, index) => (
            <TextBody
              key={`form-field-${name}-error-${error?.toString()}-${index}`}
              size="s"
              color="error"
              span
            >
              {error} <span> </span>
            </TextBody>
          ))}
        </TextBody>
      )}
      {isValidating && (
        <TextBody paragraph size="s" color="info">
          Validating...
        </TextBody>
      )}
    </div>
  )
}
Field.displayName = 'Field'

export { Field }
