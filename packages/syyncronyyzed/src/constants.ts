export const SYYNC_CUSTOM_MESSAGE_TYPE = 'syync-request-received'
export const APP_TYPES = {
  ANALYTICS_DASHBOARD: 'analytics-dashboard',
  ACTION_PLAN: 'action-plan',
  DASHBOARD: 'dashboard',
  DOMAIN_MANAGER: 'domain-manager',
  PLATFORM_REVIEW_MANAGER: 'platform-review-manager',
  LAUNCH_LESSON_VIEWER: 'launch-lesson-viewer',
  CALENDAR: 'calendar',
  INBOX: 'inbox',
  MASTERY: 'mastery',
  PPF: 'ppf',
  R3: 'r3',
  HOME: 'home',
  TEAM_EDITOR: 'team-editor',
  TRYYB: 'tryyb',
} as const

export const COMMON_REJECTION_MESSAGES = {
  UNHANDLED_MESSAGE_TYPE: 'Message type not handled',
  UNKNOWN_ERROR_OCCURRED_IN_OTHER_APP: 'Unknown error occurred in other App',
  TIMEOUT: 'Request Timed Out',
  DATA_UNRETRIEVABLE: 'Requested Data is unretrievable',
} as const
