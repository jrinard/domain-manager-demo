import { Attendee_CVENT, Event_CVENT } from '@spacedock/serverless-api'

export type EventWithRegistration = Event_CVENT & {
  registration: Attendee_CVENT | null
}
