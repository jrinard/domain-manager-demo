import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, readProjectConfiguration } from '@nx/devkit'
import { createLib } from '@nx/react/src/utils/testing-generators'

import { iconGenerator } from './generator'
import { IconGeneratorSchema } from './schema'

describe.skip('icon generator', () => {
  let tree: Tree

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' })
    await createLib(tree, '@falcon/icons')
    tree.write('libs/falcon/icons/src/molecules/icon/addIcons.ts', '')
  })

  it('should run successfully', async () => {
    const options: IconGeneratorSchema = {
      name: 'test',
      content:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M21.2104 15.89C20.5742 17.3945 19.5792 18.7202 18.3123 19.7513C17.0454 20.7824 15.5452 21.4874 13.9428 21.8048C12.3405 22.1221 10.6848 22.0421 9.12055 21.5718C7.55627 21.1014 6.13103 20.2551 4.96942 19.1067C3.80782 17.9582 2.94522 16.5428 2.45704 14.9839C1.96886 13.4251 1.86996 11.7705 2.169 10.1646C2.46804 8.55878 3.1559 7.05063 4.17245 5.77203C5.189 4.49343 6.50329 3.48332 8.0004 2.83M22.0004 12C22.0004 10.6868 21.7417 9.38642 21.2392 8.17317C20.7367 6.95991 20.0001 5.85752 19.0715 4.92893C18.1429 4.00035 17.0405 3.26375 15.8272 2.7612C14.614 2.25866 13.3136 2 12.0004 2V12H22.0004Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '</svg>\n',
    }
    await iconGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()
  })
})
