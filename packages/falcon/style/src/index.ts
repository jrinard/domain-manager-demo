export * from './mergeClasses'
export type { VariantProps } from './variants'
export { cva } from './variants'

// Re-export clsx for cases where Tailwind merging isn't needed
// Use this instead of mergeClasses when working with non-Tailwind classes
export { clsx } from 'clsx'
