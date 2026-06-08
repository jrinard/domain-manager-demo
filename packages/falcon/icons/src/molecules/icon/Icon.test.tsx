import { render } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import { noop } from 'lodash'

import { Icon } from './Icon'

// Mock the @iconify/react component since it's causing issues with TypeScript 5.8
vi.mock('@iconify/react', () => ({
  Icon: ({ icon, color, className }: any) => (
    <span
      data-testid="iconify-icon"
      data-icon={icon}
      style={{ color }}
      className={className}
    >
      Icon: {icon}
    </span>
  ),
  iconExists: () => true,
  addIcon: noop,
}))

describe('Icon', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <Icon color="primary" icon="inbox" size="xl" />,
    )
    const iconElement = getByTestId('iconify-icon')
    expect(iconElement).toBeTruthy()
    expect(iconElement.getAttribute('data-icon')).toBe('mdi:inbox')
  })

  it('should handle different icon props', () => {
    const { getByTestId } = render(
      <Icon color="secondary" icon="star" size="lg" />,
    )
    const iconElement = getByTestId('iconify-icon')
    expect(iconElement.getAttribute('data-icon')).toBe('mdi:star')
  })
})
