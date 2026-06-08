/**
 * @spacedock/tryyb-services
 *
 * Provides a service context for packages running within tryyb.
 * This replaces the Syyncronyyzed postMessage pattern used by iframe-based apps.
 *
 * ## Usage in migrated packages:
 *
 * ```tsx
 * import { useTryybServices } from '@spacedock/tryyb-services'
 *
 * function MyComponent() {
 *   const services = useTryybServices()
 *
 *   const handleChooseFile = async () => {
 *     const { lessons } = await services.chooseFile(['Library'])
 *     // Use selected lessons
 *   }
 *
 *   return <button onClick={handleChooseFile}>Choose File</button>
 * }
 * ```
 *
 * ## Usage in tryyb (providing the services):
 *
 * ```tsx
 * import { TryybServicesProvider } from '@spacedock/tryyb-services'
 * import { createTryybServices } from './services/TryybServicesImpl'
 *
 * const services = createTryybServices()
 *
 * function App() {
 *   return (
 *     <TryybServicesProvider services={services}>
 *       <Routes />
 *     </TryybServicesProvider>
 *   )
 * }
 * ```
 */

// Context and Provider
export {
  TryybServicesContext,
  TryybServicesProvider,
} from './TryybServicesContext'
export type { TryybServicesProviderProps } from './TryybServicesContext'

// Hooks
export { useTryybServices, useTryybServicesOptional } from './useTryybServices'
export { useUrlByConstantQuery } from './useUrlByConstant'

// Mock provider for testing/Storybook
export {
  MockTryybServicesProvider,
  createMockTryybServices,
} from './MockTryybServicesProvider'
export type { MockTryybServicesProviderProps } from './MockTryybServicesProvider'

// Types
export type {
  TryybServices,
  ChooserLesson,
  ChooseFileResult,
  UploadAssetResult,
  NavigateToMenuItemOptions,
  WorkflowStatus,
  WorkflowTriggerResult,
  TriggerWorkflowOptions,
  HasAmbassadorChatResult,
  ScheduledWorkflowPublic,
  ListWorkflowSchedulesQuery,
  CreateWorkflowScheduleInput,
} from './types'
