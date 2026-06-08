import { describe, expect, it } from 'vitest'
import axios from 'axios'

import { Inbox } from './Inbox'

describe('Resource Inbox', () => {
  it('has child resources', () => {
    const resource = new Inbox(axios.create())
    expect(resource).toHaveProperty('Comment')
    expect(resource).toHaveProperty('Member')
    expect(resource).toHaveProperty('Catalog')
    expect(resource).toHaveProperty('Conversations')
  })

  it('does not have an endpoint property', () => {
    const resource = new Inbox(axios.create())
    expect(resource.endpoint).toBeUndefined()
  })

  it('it does not have verbs', async () => {
    const resource = new Inbox(axios.create())

    expect(resource).not.toHaveProperty('get')
    expect(resource).not.toHaveProperty('post')
    expect(resource).not.toHaveProperty('put')
    expect(resource).not.toHaveProperty('delete')
  })
})
