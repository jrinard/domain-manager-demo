import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * https://github.com/shadcn/ui/blob/main/templates/next-template/lib/utils.ts
 * @param inputs
 */
export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
