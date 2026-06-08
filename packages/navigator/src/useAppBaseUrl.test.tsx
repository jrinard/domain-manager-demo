import { useAppBaseUrl } from './useAppBaseUrl'

describe('useAppBaseUrl', () => {
  it('return path with app name', async () => {
    const result = useAppBaseUrl('mytraining')
    // Should match either the legacy path (/v25/nl/#/), new path (/x/), or empty base path (//)
    expect(result).toMatch(
      /^https:\/\/cardoneventuresceo\.com\/(v25\/nl\/#\/|x\/|\/)mytraining\/$/,
    )
  })
  it('returns undefined when app is undefined', async () => {
    expect(useAppBaseUrl(undefined)).toEqual(undefined)
  })
})
