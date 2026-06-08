import { describe, expect, it } from 'vitest'
import axios from 'axios'
import { People } from './People'

describe('Resource People', () => {
  it('has AdvancedSearch', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:8080/api',
      data: {
        sessionKey: 'key',
      },
    })

    const resource = new People(axiosInstance)

    expect(resource).toHaveProperty('AdvancedSearch')
  })
})
