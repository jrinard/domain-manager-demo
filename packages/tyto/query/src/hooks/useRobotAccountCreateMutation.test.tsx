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

import { useRobotAccountCreateMutation } from './useRobotAccountCreateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useRobotAccountCreateMutation', () => {
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
      () => useRobotAccountCreateMutation({ onSuccess, onError }),
      { wrapper },
    )

    act(() => {
      current.mutate({
        experience: 'Exam_Evaluation',
        bio: 'This is a test',
        givenName: 'Test',
        familyName: 'Test',
        password: 'test',
        company: 'openai',
        jobTitle: '',
        nativeLanguage: 'en',
        outsideID: '',
        outsideType: '',
        primaryElementID: 1234,
        roleID: 808,
        website: '',
        personal1: '',
        personal2: '',
        personal3: '',
        personal4: '',
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onError).not.toHaveBeenCalled())
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      newUserID: 1234,
    })
  })
})
