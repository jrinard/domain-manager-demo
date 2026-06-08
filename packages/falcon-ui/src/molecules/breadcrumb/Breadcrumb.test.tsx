import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Breadcrumb } from './Breadcrumb'
import * as stories from './Breadcrumb.stories'
const { BreadcrumbAsLink } = composeStories(stories)

describe('Breadcrumb', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Breadcrumb
        items={[
          { label: '551', id: '551' },
          { label: 'CV', id: '1825957' },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(
      <Breadcrumb
        items={[
          { label: '551', id: '551' },
          { label: 'CV', id: '1825957' },
        ]}
      />
    )
    expect(screen.getByText('551')).toBeInTheDocument()
  })
  it(BreadcrumbAsLink.parameters.docs.description.story, () => {
    render(<BreadcrumbAsLink {...BreadcrumbAsLink.args} />)
  })
})
