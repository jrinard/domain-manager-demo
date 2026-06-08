/**
 * TryybServicesContext
 *
 * React context for providing tryyb services to child components.
 * The actual service implementations are provided by tryyb via the provider.
 */

import { createContext, ReactNode } from 'react'
import type { TryybServices } from './types'

/**
 * Context for TryybServices
 *
 * This context is used to provide tryyb services to packages that are
 * lazy-loaded into tryyb. The actual implementation is provided by tryyb.
 */
export const TryybServicesContext = createContext<TryybServices | null>(null)

export interface TryybServicesProviderProps {
  /**
   * The services implementation to provide to children.
   * This should be created by tryyb using createTryybServices().
   */
  services: TryybServices
  children: ReactNode
}

/**
 * Provider component for TryybServices
 *
 * Wrap your routes/components with this provider to give them access
 * to tryyb services via the useTryybServices() hook.
 *
 * @example
 * ```tsx
 * // In tryyb's App.tsx
 * import { TryybServicesProvider } from '@spacedock/tryyb-services'
 * import { createTryybServices } from './services/TryybServicesImpl'
 *
 * const services = createTryybServices()
 *
 * function App() {
 *   return (
 *     <TryybServicesProvider services={services}>
 *       <TryybRoutes />
 *     </TryybServicesProvider>
 *   )
 * }
 * ```
 */
export function TryybServicesProvider({
  services,
  children,
}: TryybServicesProviderProps) {
  return (
    <TryybServicesContext.Provider value={services}>
      {children}
    </TryybServicesContext.Provider>
  )
}
