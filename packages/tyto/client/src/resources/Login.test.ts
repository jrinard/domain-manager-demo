import { describe, expect, it } from 'vitest'
import axios from 'axios'

import { Login } from './Login'

describe('Resource Login', () => {
  it('has child resources', () => {
    const resource = new Login(axios.create())
    expect(resource).toHaveProperty('Authenticate')
    expect(resource).toHaveProperty('Authenticate4')
    expect(resource).toHaveProperty('Recover')
    expect(resource).toHaveProperty('ResetPassword')
  })

  it('does not have an endpoint property', () => {
    const resource = new Login(axios.create())
    expect(resource.endpoint).toBeUndefined()
  })

  it('it does not have verbs', () => {
    const resource = new Login(axios.create())

    expect(resource).not.toHaveProperty('get')
    expect(resource).not.toHaveProperty('post')
    expect(resource).not.toHaveProperty('put')
    expect(resource).not.toHaveProperty('delete')
  })
})
