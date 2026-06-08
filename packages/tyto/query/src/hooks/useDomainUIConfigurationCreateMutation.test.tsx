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

import { useDomainUIConfigurationCreateMutation } from './useDomainUIConfigurationCreateMutation'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

describe('useDomainUIConfigurationCreateMutation', () => {
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
      () => useDomainUIConfigurationCreateMutation({ onSuccess, onError }),
      { wrapper },
    )

    act(() => {
      current.mutate({
        mimeType: 'application/json',
        domainID: 1234,
        configType: 'ocTRYYBSTART',
        attachments: [],
      })
    })

    await waitFor(() => expect(current.isPending).toEqual(false))
    await waitFor(() => expect(onError).not.toHaveBeenCalled())
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce())

    expect(onSuccess).toHaveBeenCalledWith({
      recordsAffected: -1,
      configName: '',
      UIconfigGUID: '',
      lastModifiedOfstDate: '',
    })
  })
})
