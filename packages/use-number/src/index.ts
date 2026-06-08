import { isNumber, isString } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

export interface UseNumberOptions {
  min?: number
  max?: number
  step?: number
}

export const useNumber = (
  originalValue: string | number | undefined | readonly string[],
  options: UseNumberOptions = {}
): [
  number,
  {
    set: (value: number | string) => number
    decrement: () => void
    increment: () => void
  }
] => {
  const minValue: number | undefined = useMemo(() => {
    return numberOrUndefined(options.min)
  }, [options.min])
  const stepValue: number = useMemo(() => {
    return numberOrUndefined(options.step) || 1
  }, [options.step])
  const maxValue: number | undefined = useMemo(() => {
    return numberOrUndefined(options.max)
  }, [options.max])

  const getValue = (
    value: string | number | undefined | readonly string[]
  ): number => {
    let result = minMax(toNumber(value, minValue), {
      min: minValue,
      max: maxValue,
    })
    if (result === undefined) {
      result = minValue !== undefined ? minValue : 0
    }
    if (stepValue) {
      return Math.round(result / stepValue) * stepValue
    }
    return result !== undefined ? result : minValue !== undefined ? minValue : 0
  }

  const [value, setRawValue] = useState<number | undefined>(
    getValue(originalValue)
  )

  const setValue = (value: string | number | undefined) => {
    const result = getValue(value)
    setRawValue(result)
    return result
  }

  useEffect(() => {
    setValue(
      minMax(toNumber(originalValue, minValue), {
        min: minValue,
        max: maxValue,
      })
    )
  }, [originalValue, minValue, maxValue])

  const increment = () => {
    setValue((value === undefined ? 0 : value) + stepValue)
  }

  const decrement = () => {
    setValue((value === undefined ? 0 : value) - stepValue)
  }

  const O = {
    get value(): number {
      return value === undefined
        ? minValue !== undefined
          ? minValue
          : 0
        : value
    },
  }

  return [O.value, { set: setValue, increment, decrement }]
}

const format = (value: HTMLInputElement['value']): string => {
  if (isString(value)) {
    return value.replace(/[^\d.]/g, '')
  }
  return value
}

const numberOrUndefined = (value: number | undefined) => {
  return value === undefined || Number.isNaN(value) ? undefined : value
}
const toNumber = (
  value: string | number | undefined | readonly string[],
  min = 0
): number => {
  if (value === undefined) return min
  let result = isNumber(value) ? value : 0
  if (isString(value)) {
    const formatted = format(value)
    result = Number(formatted)
  }
  if (Number.isNaN(result)) {
    return min
  }
  return result
}

const minMax = (value: number, options: { max?: number; min?: number }) => {
  if (!Number.isNaN(value)) {
    if (options?.max !== undefined && value > options.max) {
      return options.max
    }
    if (options.min !== undefined && value < options.min) {
      return options.min
    }
    return value
  }
  return undefined
}
