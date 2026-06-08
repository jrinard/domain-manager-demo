import { describe, expect } from 'vitest'

import { TSHelpers } from './utils/TSHelpers'

describe('TSHelpers', () => {
  it('Prettify', () => {
    interface Foo {
      name: 'greyson' | 'john'
    }

    interface Bar extends Foo {
      age: number
      type?: 'object'
    }

    interface Baz extends Bar {
      favoriteColor: 'grey' | 'blue' | 'red' | 'purple'
    }

    type Person = Baz

    type Everything = TSHelpers.Prettify<Person>
    const john: Everything = {
      age: 0,
      favoriteColor: 'blue',
      name: 'john',
    }
    expect(john.favoriteColor).toEqual('blue')
  })
  it('GUID', () => {
    const id: TSHelpers.GUID = '23-324'
    expect(id).toEqual('23-324')
  })
})
