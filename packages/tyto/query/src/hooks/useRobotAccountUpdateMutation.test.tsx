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

import { useRobotAccountUpdateMutation } from './useRobotAccountUpdateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useRobotAccountUpdateMutation', () => {
  setupTestServer({ afterAll, afterEach, beforeAll })
  // * Happy path
  it('returns the response from a Successfully mutation', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </TytoClientProvider>
    )
    const onSuccess = vi.fn()
    const onError = vi.fn()

    const {
      result: { current },
    } = renderHook(
      () => useRobotAccountUpdateMutation({ onSuccess, onError }),
      { wrapper },
    )

    act(() => {
      current.mutate({
        personID: 1234,
        bio: 'Updated Bio',
        company: 'openai',
        experience: 'Exam_Evaluation',
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())
    await waitFor(() => expect(onError).not.toHaveBeenCalled())

    expect(onSuccess).toHaveBeenCalledWith({
      recordsAffected: -1,
    })
  })
})
