/**
 * MockTryybServicesProvider
 *
 * A mock provider for testing and Storybook usage.
 * Provides stub implementations that log warnings and return empty results.
 */

import { ReactNode } from 'react'
import { TryybServicesProvider } from './TryybServicesContext'
import type { TryybServices } from './types'

/**
 * Creates a mock TryybServices implementation for testing.
 *
 * You can override specific methods by passing a partial implementation.
 *
 * @param overrides - Partial implementation to override default mocks
 */
export function createMockTryybServices(
  overrides: Partial<TryybServices> = {},
): TryybServices {
  return {
    async chooseFile(options) {
      console.warn('[MockTryybServices] chooseFile called with:', options)
      return { lessons: [] }
    },

    async launchLessonViewer(lessonID) {
      console.warn(
        '[MockTryybServices] launchLessonViewer called with:',
        lessonID,
      )
    },

    async uploadAsset(file) {
      console.warn('[MockTryybServices] uploadAsset called with:', file?.name)
      return { assetID: 0, url: '' }
    },
    async openChooser(options) {
      console.warn(
        '[MockTryybServices] openChooserWithOptions called with:',
        options,
      )
      return { lessons: [] }
    },
    async uploadFileViaChooser() {
      console.warn('[MockTryybServices] openImageChooser called')
      return { assetID: 0, url: '' }
    },
    async uploadFile(file) {
      console.warn('[MockTryybServices] uploadFile called with:', file?.name)
      return { uploadFiles: [], uploadKey: '' }
    },

    async openUserImport(details: {
      teamID: number
      teamName: string
      team?: any
    }) {
      console.warn('[MockTryybServices] openUserImport called with:', details)
    },

    navigateToMenuItem(functionID, params) {
      console.warn(
        '[MockTryybServices] navigateToMenuItem called with:',
        functionID,
        params,
      )
    },

    openSpotlight() {
      console.warn('[MockTryybServices] openSpotlight called')
    },

    async getSessionKey() {
      console.warn('[MockTryybServices] getSessionKey called')
      return 'mock-session-key'
    },

    async getUrlByConstant(constantName, params, addBaseUrl) {
      console.warn(
        '[MockTryybServices] getUrlByConstant called with:',
        constantName,
      )
      return undefined
    },

    openEventSendReminders(eventID) {
      console.warn(
        '[MockTryybServices] openEventSendReminders called with:',
        eventID,
      )
    },

    impersonateUser(personID) {
      console.warn('[MockTryybServices] impersonateUser called with:', personID)
    },

    async triggerWorkflow(workflowName, workflowData, options) {
      console.warn(
        '[MockTryybServices] triggerWorkflow called with:',
        workflowName,
        workflowData,
        options,
      )
      return {
        runId: 'mock-run-id',
        status: 'completed' as const,
      }
    },

    async hasAmbassadorChat() {
      console.warn('[MockTryybServices] hasAmbassadorChat called')
      return {
        hasLoaded: true,
        hasAmbassadorChat: true,
      }
    },

    openAmbassadorScheduledWorkflows() {
      console.warn('[MockTryybServices] openAmbassadorScheduledWorkflows called')
    },

    async listWorkflowSchedules(query) {
      console.warn('[MockTryybServices] listWorkflowSchedules called', query)
      return { schedules: [] }
    },

    async createWorkflowSchedule(body) {
      console.warn('[MockTryybServices] createWorkflowSchedule called', body)
      throw new Error('createWorkflowSchedule not implemented in mock')
    },

    async cancelWorkflowSchedule(scheduleId) {
      console.warn('[MockTryybServices] cancelWorkflowSchedule called', scheduleId)
      throw new Error('cancelWorkflowSchedule not implemented in mock')
    },

    async patchWorkflowSchedule(scheduleId, patch) {
      console.warn('[MockTryybServices] patchWorkflowSchedule called', scheduleId, patch)
      throw new Error('patchWorkflowSchedule not implemented in mock')
    },

    isTranslating() {
      console.warn('[MockTryybServices] isTranslating called')
      return false
    },

    async translateSite(langCode) {
      console.warn('[MockTryybServices] translateSite called with:', langCode)
    },

    async revertTranslation() {
      console.warn('[MockTryybServices] revertTranslation called')
    },

    ...overrides,
  }
}

export interface MockTryybServicesProviderProps {
  children: ReactNode
  /**
   * Optional partial implementation to override default mocks
   */
  overrides?: Partial<TryybServices>
}

/**
 * Mock provider for TryybServices
 *
 * Use this in tests or Storybook to provide mock implementations
 * of tryyb services.
 *
 * @example
 * ```tsx
 * // In a test
 * render(
 *   <MockTryybServicesProvider
 *     overrides={{
 *       chooseFile: async () => ({ lessons: [mockLesson] }),
 *     }}
 *   >
 *     <MyComponent />
 *   </MockTryybServicesProvider>
 * )
 * ```
 *
 * @example
 * ```tsx
 * // In Storybook
 * export const Default: Story = {
 *   decorators: [
 *     (Story) => (
 *       <MockTryybServicesProvider>
 *         <Story />
 *       </MockTryybServicesProvider>
 *     ),
 *   ],
 * }
 * ```
 */
export function MockTryybServicesProvider({
  children,
  overrides,
}: MockTryybServicesProviderProps) {
  const mockServices = createMockTryybServices(overrides)

  return (
    <TryybServicesProvider services={mockServices}>
      {children}
    </TryybServicesProvider>
  )
}
