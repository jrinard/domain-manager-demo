import { composeStories } from '@storybook/react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import {
  ComboBox,
  isComboBoxGroup,
  convertComboBoxItemsToGroups,
} from './ComboBox'
import * as stories from './ComboBox.stories'
const { IsLoadingItems } = composeStories(stories)

describe('convertComboBoxItemsToGroups', () => {
  const item = (v: string): { value: string; item: string } => ({
    value: v,
    item: v,
  })

  it('groups consecutive single options, then titled sections, then more singles', () => {
    const g = convertComboBoxItemsToGroups([
      item('a'),
      item('b'),
      { heading: 'G', items: [item('c')] },
      item('d'),
      item('e'),
    ])
    expect(g).toHaveLength(3)
    expect(g[0]!.heading).toBeUndefined()
    expect(g[0]!.items.map((i) => i.value)).toEqual(['a', 'b'])
    expect(g[1]!.heading).toBe('G')
    expect(g[1]!.items.map((i) => i.value)).toEqual(['c'])
    expect(g[2]!.items.map((i) => i.value)).toEqual(['d', 'e'])
  })

  it('isComboBoxGroup discriminates items vs groups', () => {
    expect(isComboBoxGroup(item('x'))).toBe(false)
    expect(isComboBoxGroup({ heading: 'h', items: [item('x')] })).toBe(true)
  })
})

describe('ComboBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ComboBox
        items={[
          { value: '1', item: 'John Doe' },
          { value: '2', item: 'Jane Dove' },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('Select...')).toBeInTheDocument()
  })
  it('renders items after opening the list', () => {
    render(
      <ComboBox
        items={[
          { value: '1', item: 'John Doe' },
          { value: '2', item: 'Jane Dove' },
        ]}
      />
    )
    act(() => {
      fireEvent.click(screen.getByRole('combobox'))
    })
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders multiple titled sections when items are ComboBoxGroup objects', () => {
    render(
      <ComboBox
        items={[
          {
            heading: 'Inherited',
            items: [{ value: '10', item: 'Role A' }],
          },
          {
            heading: 'Local',
            items: [{ value: '20', item: 'Role B' }],
          },
        ]}
        separateItemGroups
      />,
    )
    act(() => {
      fireEvent.click(screen.getByRole('combobox'))
    })
    expect(screen.getByText('Inherited')).toBeInTheDocument()
    expect(screen.getByText('Local')).toBeInTheDocument()
    expect(screen.getByText('Role A')).toBeInTheDocument()
    expect(screen.getByText('Role B')).toBeInTheDocument()
  })
  it(IsLoadingItems.parameters.docs.description.story, async () => {
    render(<IsLoadingItems {...IsLoadingItems.args} />)
    await waitFor(() =>
      expect(screen.queryByText('Select...')).toBeInTheDocument()
    )
    act(() => {
      fireEvent.click(screen.getByRole('combobox'))
    })
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.queryByText('Loading...')).toBeInTheDocument()
  })
})
