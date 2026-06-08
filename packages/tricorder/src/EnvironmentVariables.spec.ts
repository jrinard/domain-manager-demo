import { describe, it, expect, afterEach } from 'vitest'
import { EnvironmentVariables } from './EnvironmentVariables'

describe('EnvironmentVariables', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })
  it('BASE_URL', () => {
    vi.stubEnv('BASE_URL', '/action-plan')
    expect(EnvironmentVariables.BASE_URL).toEqual('/action-plan')
  })
})
