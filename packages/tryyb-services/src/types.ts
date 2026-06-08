/**
 * TryybServices Types
 *
 * Defines the interface for services that can be called from packages
 * running within the tryyb app. This replaces the Syyncronyyzed postMessage
 * pattern used by iframe-based apps.
 */

/**
 * Represents a lesson/file that can be selected from the chooser
 */
export interface ChooserLesson {
  lessonID: number
  title?: string
  description?: string
  lessonTypeID?: number
  thumbnailURL?: string
  [key: string]: unknown
}

/**
 * Result from the file/lesson chooser
 */
export interface ChooseFileResult {
  lessons: ChooserLesson[]
}

/**
 * Result from an asset upload
 */
export interface UploadAssetResult {
  assetID: number
  url: string
  filename?: string
}

import type { TytoData } from '@spacedock/manifest'

/**
 * Options for navigating to a menu item
 */
export interface NavigateToMenuItemOptions {
  functionID: number
  params?: Record<string, unknown>
}

// ============================================================================
// Workflow Types
// ============================================================================

/**
 * Status of a workflow run
 */
export type WorkflowStatus =
  | 'pending'
  | 'running'
  | 'suspended'
  | 'completed'
  | 'failed'
  | 'cancelled'

/**
 * Result returned when a workflow completes
 */
export interface WorkflowTriggerResult {
  /** Unique identifier for the workflow run */
  runId: string
  /** Final status of the workflow */
  status: WorkflowStatus
  /** Output data from the workflow (if completed successfully) */
  output?: Record<string, unknown>
  /** Error message (if failed) */
  error?: string
}

/**
 * Options for triggering a workflow
 */
export interface TriggerWorkflowOptions {
  /** Skip the preflight validation (not recommended) */
  skipValidation?: boolean
  /** Suppress toast notifications */
  silent?: boolean
}

/**
 * Result from checking if user has Ambassador Chat access
 */
export interface HasAmbassadorChatResult {
  /** Whether the menu has loaded */
  hasLoaded: boolean
  /** Whether the user has access to Ambassador Chat */
  hasAmbassadorChat: boolean
}

// ============================================================================
// Scheduled workflows (ambassador-api)
// ============================================================================

/** Public schedule row as returned by the API (no session_key). */
export interface ScheduledWorkflowPublic {
  id: string
  user_id: number
  domain_id: number
  workflow_type: string
  name: string
  description?: string | null
  schedule_type: 'one-time' | 'recurring'
  cron_expression?: string | null
  timezone: string
  next_run_at: string
  last_run_at?: string | null
  max_runs?: number | null
  completed_runs: number
  consecutive_failures: number
  input_data: Record<string, unknown>
  session_status: string
  status: string
  created_at: string
  updated_at: string
}

export interface ListWorkflowSchedulesQuery {
  status?: string
  workflow_type?: string
}

export interface CreateWorkflowScheduleInput {
  workflow_type: string
  name: string
  description?: string | null
  schedule_type: 'one-time' | 'recurring'
  cron_expression?: string | null
  timezone?: string
  next_run_at?: string
  max_runs?: number | null
  input_data: Record<string, unknown>
}

/**
 * TryybServices interface
 *
 * Provides async methods for interacting with tryyb's UI services
 * (modals, navigation, etc.) from within lazy-loaded packages.
 *
 * This replaces the Syyncronyyzed postMessage pattern used by iframe-based apps.
 * The actual implementation is provided by tryyb via the TryybServicesProvider.
 */
export interface TryybServices {
  /**
   * Opens the file/lesson chooser modal and returns selected lessons.
   *
   * @param options - Chooser options (e.g., ["New", "Library"])
   * @returns Promise resolving to selected lessons
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * const { lessons } = await services.chooseFile(['Library'])
   * ```
   */
  chooseFile(options?: string[]): Promise<ChooseFileResult>
  /**
   * Opens the lesson viewer for a specific lesson.
   *
   * @param lessonID - The ID of the lesson to open
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * await services.launchLessonViewer(12345)
   * ```
   */
  launchLessonViewer(lessonID: number): Promise<void>

  /**
   * Uploads an asset file.
   *
   * @param file - The file to upload
   * @param options - Optional upload options
   * @returns Promise resolving to the uploaded asset info
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * const { assetID, url } = await services.uploadAsset(file)
   * ```
   */
  uploadAsset(
    file?: File,
    options?: { folder?: string },
  ): Promise<UploadAssetResult>

  /**
   * Uploads a file directly (no chooser) and returns the upload response.
   */
  uploadFile(file: File): Promise<TytoData.Upload>

  /**
   * Opens the image chooser so the user can pick or upload an image.
   * Resolves with an UploadAssetResult containing the uploadKey in `url`.
   */
  uploadFileViaChooser(): Promise<UploadAssetResult>
  /**
   * Opens the chooser with custom tabs/options.
   *
   * Example options: ["new","library","video","photo album","document"]
   */
  openChooser(
    options?: Array<string | Record<string, unknown>>,
  ): Promise<
    { lesson?: TytoData.Lesson; asset?: any } | ChooseFileResult | null
  >

  /**
   * Opens the user import dialog for a team.
   *
   * @param teamID - The team ID
   * @param teamName - The team name (for display)
   * @returns Promise that resolves when the dialog is closed
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * await services.openUserImport(123, 'Engineering Team')
   * ```
   */
  openUserImport(details: {
    teamID: number
    teamName: string
    team?: any
  }): Promise<void>

  /**
   * Navigates to a menu item by function ID.
   *
   * @param functionID - The function ID to navigate to
   * @param params - Optional route params
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * services.navigateToMenuItem(12345, { teamID: 123 })
   * ```
   */
  navigateToMenuItem(functionID: number, params?: Record<string, unknown>): void

  /**
   * Opens the spotlight search.
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * services.openSpotlight()
   * ```
   */
  openSpotlight(): void

  /**
   * Gets the current session key.
   *
   * @returns Promise resolving to the session key
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * const sessionKey = await services.getSessionKey()
   * ```
   */
  getSessionKey(): Promise<string>

  /**
   * Gets a URL by a constant name (for legacy URL resolution).
   *
   * @param constantName - The name of the URL constant
   * @returns Promise resolving to the URL or undefined
   */
  getUrlByConstant(
    constantName: string,
    params?: { [argumentName: string]: string | number | undefined },
    addBaseUrl?: boolean,
  ): Promise<string | undefined>

  /**
   * Opens the event send reminders modal for a calendar event.
   *
   * @param eventID - The ID of the event to send reminders for
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * services.openEventSendReminders(12345)
   * ```
   */
  openEventSendReminders(eventID: number): void

  /**
   * Impersonates a user by their person ID.
   *
   * @param personID - The ID of the person to impersonate
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * services.impersonateUser(12345)
   * ```
   */
  impersonateUser(personID: number): void

  /**
   * Triggers a workflow and monitors its progress.
   *
   * This method:
   * 1. Validates the workflow name and payload
   * 2. Triggers the workflow via the ambassador-api
   * 3. Shows a toast notification with progress updates
   * 4. Returns when the workflow completes
   *
   * @param workflowName - The type of workflow to trigger (e.g., 'training-sensei')
   * @param workflowData - Input data for the workflow
   * @param options - Optional configuration
   * @returns Promise resolving to the workflow result
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * const result = await services.triggerWorkflow('training-sensei', {
   *   teamId: 123,
   *   includeManagers: true,
   * })
   * console.log('Workflow completed:', result.status)
   * ```
   */
  triggerWorkflow(
    workflowName: string,
    workflowData: Record<string, unknown>,
    options?: TriggerWorkflowOptions,
  ): Promise<WorkflowTriggerResult>

  /**
   * Checks if the user has access to Ambassador Chat.
   *
   * This method waits for the menu to load before resolving, ensuring that
   * the returned value is accurate and not a false snapshot from initial render.
   *
   * Ambassador Chat is enabled when the menu item with functionID 51 (Search)
   * has its Alpha.href pointing to 'chat-ambassador'.
   *
   * @returns Promise resolving to an object with hasLoaded and hasAmbassadorChat flags
   *
   * @example
   * ```tsx
   * const services = useTryybServices()
   * const { hasLoaded, hasAmbassadorChat } = await services.hasAmbassadorChat()
   * if (hasAmbassadorChat) {
   *   // Show Ambassador Chat UI
   * }
   * ```
   */
  hasAmbassadorChat(): Promise<HasAmbassadorChatResult>

  /**
   * Opens the Ambassador chat pane on Workflows » Scheduled workflows.
   */
  openAmbassadorScheduledWorkflows(): void

  /**
   * Lists the current user's workflow schedules from ambassador-api.
   */
  listWorkflowSchedules(
    query?: ListWorkflowSchedulesQuery,
  ): Promise<{ schedules: ScheduledWorkflowPublic[] }>

  /**
   * Creates a workflow schedule (dedicated session key is minted server-side).
   */
  createWorkflowSchedule(
    body: CreateWorkflowScheduleInput,
  ): Promise<{ schedule: ScheduledWorkflowPublic }>

  /**
   * Cancels a schedule (sets status to cancelled).
   */
  cancelWorkflowSchedule(scheduleId: string): Promise<{ schedule: ScheduledWorkflowPublic }>

  /**
   * Updates a schedule (partial patch).
   */
  patchWorkflowSchedule(
    scheduleId: string,
    patch: Record<string, unknown>,
  ): Promise<{ schedule: ScheduledWorkflowPublic }>

  /**
   * Returns true when the page is currently being translated via Google Translate.
   */
  isTranslating(): boolean

  /**
   * Triggers Google Translate for the given BCP-47 language code.
   * Toggles back to English if translation is already active.
   */
  translateSite(langCode?: string): Promise<void>

  /**
   * Reverts an active Google Translate translation back to English.
   */
  revertTranslation(): Promise<void>
}
