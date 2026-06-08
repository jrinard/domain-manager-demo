import { screen } from '@testing-library/react'
import { render } from '@spacedock/holoprojector'
import { setupTestServer } from '@tyto/msw/test-setup'
import { expect, describe, it, beforeAll, afterAll, afterEach } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './VersionControlTable.stories'
const { Empty, Loading } = composeStories(stories) //PopulatedNoEditPermissions, PopulatedCanEdit,

describe('VersionControlTable', () => {
  setupTestServer({ beforeAll, afterAll, afterEach })
  // it(PopulatedNoEditPermissions.parameters.docs.description.story, () => {
  //   render(<PopulatedNoEditPermissions {...PopulatedNoEditPermissions.args} />)
  //   expect(screen.queryByText('No Actions')).toBeTruthy()
  // })
  // it(PopulatedCanEdit.parameters.docs.description.story, () => {
  //   render(<PopulatedCanEdit {...PopulatedCanEdit.args} />)
  //   expect(screen.queryByText('No Actions')).toBeNull()
  // })

  it(Empty.parameters.docs.description.story, () => {
    render(<Empty {...Empty.args} />)
    expect(screen.queryByText('Droids 101')).toBeNull()
    expect(
      screen.queryByText(/There is no active layout in production/i),
    ).not.toBeNull()
  })
})
