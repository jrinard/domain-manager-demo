import { describe, expect, it } from 'vitest'
import axios from 'axios'

import { Configuration } from './Configuration'

describe('Resource Configuration', () => {
  it('has child resources', () => {
    const resource = new Configuration(axios.create())
    expect(resource).toHaveProperty('Client')
  })

  it('does not have an endpoint property', () => {
    const resource = new Configuration(axios.create())
    expect(resource.endpoint).toBeUndefined()
  })

  it('it does not have verbs', async () => {
    const resource = new Configuration(axios.create())

    expect(resource).not.toHaveProperty('get')
    expect(resource).not.toHaveProperty('post')
    expect(resource).not.toHaveProperty('put')
    expect(resource).not.toHaveProperty('delete')
  })
})
