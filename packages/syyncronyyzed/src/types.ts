import { APP_TYPES } from './constants'

export type GenericMessageTypes =
  | 'ping'
  | 'acknowledgement'
  | 'error'
  | '::REJECTION::'

export type FileMessages =
  | 'choose-file'
  | 'launch-lesson-viewer'
  | 'asset-upload'
export type MetaActionsSentToParent =
  | 'open-spotlight'
  | 'navigate-to-menu-item'
  | 'request-session-key'
  | 'sync-child-route'
  | 'store-properties'
  | 'reload-parent'
  | 'request-config'
  | FileMessages
export type MetaActionsSentToChild = 'session-changed'
export type TeamAdminMessage = 'user-import'

export type CommonMessageType = MetaActionsSentToParent | MetaActionsSentToChild
export type CoreKnownMessageTypes =
  | GenericMessageTypes
  | CommonMessageType
  | TeamAdminMessage
  | string

export type AppRole = 'parent' | 'child'
export type SyyncMessageRole = 'request' | 'response'
export type AppType = (typeof APP_TYPES)[keyof typeof APP_TYPES]
export type TargetHosts = string[]

export interface SyncMessage<MType extends string = string> {
  type: MType
  initiatorType?: MType
  messageID: string
  appType: AppType
  role: SyyncMessageRole
  isPreflight?: boolean
  errorMsg?: string
  noReply?: boolean // * Only intended for 'request' messages
  payload: {
    [key: string]: unknown
  }
}

export type ConnectionState =
  | 'uninitialized'
  | 'initializing'
  | 'connected'
  | 'disconnected'

export type SyyncProps = {
  targetWindow?: Window
  appType: AppType
  appRole: AppRole
  targetHosts: TargetHosts
}

export type SyyncLogger = {
  log: (message: string | object) => void
  warn: (message: string | object) => void
  error: (message: string | object) => void
}
