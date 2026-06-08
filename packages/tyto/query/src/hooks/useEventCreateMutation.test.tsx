import { act, renderHook, waitFor } from '@testing-library/react'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { PropsWithChildren } from 'react'
import {
  TytoClientProvider,
  QueryClientProvider,
} from '@spacedock/holoprojector'
import { setupTestServer } from '@tyto/msw/test-setup'

import { useEventCreateMutation } from './useEventCreateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useEventCreateMutation', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  // * Happy path
  it('returns the response from a Successfully mutation', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const onSuccess = vi.fn()

    const {
      result: { current },
    } = renderHook(() => useEventCreateMutation({ onSuccess }), {
      wrapper,
    })

    act(() => {
      current.mutate({
        eventName: '',
        recurrenceRules: [],
        defaultReminderMinutes: 0,
        location: '',
        eventDesc: '',
        eventType: 'ocITEM',
        invitationType: 'ocSELF',
        startTime: '',
        endTime: '',
        timeZoneIDStart: 0,
        timeZoneIDEnd: 0,
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      eventID: 2439678,
      recordsAffected: -2,
      addRecurrenceRuleResponses: [
        {
          icalRecurrenceID: 11420,
          icalRecurrenceRule: 'FREQ=WEEKLY;UNTIL=20240130T195900Z;BYDAY=MO',
          msg: '',
          sts: 0,
        },
      ],
    })
  })
})
