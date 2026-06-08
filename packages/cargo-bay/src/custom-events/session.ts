import { CUSTOM_EVENTS } from '../constants'

export function EmitClearSession(opts?: {
  data?: {
    [x: string]: any
  }
  element?: Element | Window
}) {
  const { data, element = window } = opts ?? {}

  const event = data
    ? new CustomEvent(CUSTOM_EVENTS.CLEAR_SESSION, data)
    : new Event(CUSTOM_EVENTS.CLEAR_SESSION)

  element.dispatchEvent(event)
}

export function EmitSessionUpdated(opts?: {
  data?: {
    [x: string]: any
  }
  element?: Element | Window
}) {
  const { data, element = window } = opts ?? {}

  const event = data
    ? new CustomEvent(CUSTOM_EVENTS.SESSION_UPDATED, data)
    : new Event(CUSTOM_EVENTS.SESSION_UPDATED)

  element.dispatchEvent(event)
}

export function EmitStoredSessionsChanged(opts?: {
  data?: {
    [x: string]: any
  }
  element?: Element | Window
}) {
  const { data, element = window } = opts ?? {}

  const event = data
    ? new CustomEvent(CUSTOM_EVENTS.STORED_SESSIONS_CHANGED, data)
    : new Event(CUSTOM_EVENTS.STORED_SESSIONS_CHANGED)

  element.dispatchEvent(event)
}
