import { useAppPath } from './useAppPath'

describe('useAppPath', () => {
  it('return path with app name and to', async () => {
    const result = useAppPath('mytraining', '123')
    // Should match either the legacy path (/v25/nl/#/), new path (/x/), or empty base path (//)
    expect(result).toMatch(
      /^https:\/\/cardoneventuresceo\.com\/(v25\/nl\/#\/|x\/|\/)mytraining\/123$/,
    )
  })

  it('returns undefined if app is undefined', async () => {
    expect(useAppPath(undefined, '123')).toBeUndefined()
  })
})
