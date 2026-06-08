/**
 * useTryybServices Hook
 *
 * Hook for accessing tryyb services from within packages.
 * This is the primary way for migrated apps to interact with tryyb's
 * UI services (modals, navigation, etc.).
 */

import { useContext } from 'react'
import { TryybServicesContext } from './TryybServicesContext'
import type { TryybServices } from './types'

/**
 * Hook to access TryybServices
 *
 * Use this hook in components that need to interact with tryyb's services
 * like opening the file chooser, launching lessons, etc.
 *
 * @throws Error if used outside of TryybServicesProvider
 *
 * @example
 * ```tsx
 * import { useTryybServices } from '@spacedock/tryyb-services'
 *
 * function MyComponent() {
 *   const services = useTryybServices()
 *
 *   const handleChooseFile = async () => {
 *     const { lessons } = await services.chooseFile(['Library'])
 *     console.log('Selected:', lessons)
 *   }
 *
 *   return <button onClick={handleChooseFile}>Choose File</button>
 * }
 * ```
 */
export function useTryybServices(): TryybServices {
  const context = useContext(TryybServicesContext)

  if (!context) {
    throw new Error(
      'useTryybServices must be used within a TryybServicesProvider. ' +
        'Make sure your component is rendered inside tryyb or wrapped with TryybServicesProvider.',
    )
  }

  return context
}

/**
 * Hook to optionally access TryybServices
 *
 * Unlike useTryybServices(), this hook returns null instead of throwing
 * if the provider is not available. Useful for components that need to
 * work both inside and outside of tryyb.
 *
 * @example
 * ```tsx
 * import { useTryybServicesOptional } from '@spacedock/tryyb-services'
 *
 * function MyComponent() {
 *   const services = useTryybServicesOptional()
 *
 *   const handleClick = () => {
 *     if (services) {
 *       services.chooseFile()
 *     } else {
 *       // Fallback behavior
 *     }
 *   }
 *
 *   return <button onClick={handleClick}>Choose File</button>
 * }
 * ```
 */
export function useTryybServicesOptional(): TryybServices | null {
  return useContext(TryybServicesContext)
}
