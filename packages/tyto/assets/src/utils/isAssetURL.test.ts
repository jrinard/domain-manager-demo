import { describe, expect, it } from 'vitest'
import { isURL } from './isAssetURL'

describe('isURL', () => {
  it('returns true', () => {
    expect(
      isURL(
        'https://cardoneventuresceo.com/viewAsset/?eid=2256087&encoding=ocDEFAULT&nohist=true'
      )
    ).toEqual(true)
  })
  it('returns false', () => {
    expect(
      isURL('viewAsset/?eid=2256087&encoding=ocDEFAULT&nohist=true')
    ).toEqual(false)
  })
})
