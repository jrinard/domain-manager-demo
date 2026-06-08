import { render } from '@spacedock/holoprojector'

import { expect, describe, it, vi } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './StatsCount.stories'
import { StatsCount } from './StatsCount'

const {
  ActiveEmployees,
  LearningSeriesCompleted,
  Loading,
  WithNegativeTrend,
  Clickable,
} = composeStories(stories)

describe('StatsCount', () => {
  it('renders the basic active employees story correctly', () => {
    const { container } = render(<ActiveEmployees {...ActiveEmployees.args} />)
    expect(container).toBeTruthy()
    expect(container.textContent).toContain('Active Employees')
    expect(container.textContent).toContain('42')
    expect(container.textContent).toContain('48 total employees')
    expect(container.textContent).toContain('+5% vs last month')
  })

  it('renders the learning series completed story correctly', () => {
    const { container } = render(
      <LearningSeriesCompleted {...LearningSeriesCompleted.args} />,
    )
    expect(container).toBeTruthy()
    expect(container.textContent).toContain('Learning Series Completed')
    expect(container.textContent).toContain('8')
    expect(container.textContent).toContain('15 in progress')
    expect(container.textContent).toContain('+2% vs last month')
  })

  it('renders loading state correctly', () => {
    const { container } = render(<Loading {...Loading.args} />)
    expect(container).toBeTruthy()
    // Loading state should show skeleton placeholders
    expect(container.innerHTML).toContain('animate-pulse')
  })

  it('renders negative trend correctly', () => {
    const { container } = render(
      <WithNegativeTrend {...WithNegativeTrend.args} />,
    )
    expect(container).toBeTruthy()
    expect(container.textContent).toContain('Completion Rate')
    expect(container.textContent).toContain('67%')
    expect(container.textContent).toContain('-3% vs last month')
    expect(container.innerHTML).toContain('text-red-600')
  })

  it('handles click events correctly', () => {
    const onClickMock = vi.fn()
    const { container } = render(
      <Clickable {...Clickable.args} onClick={onClickMock} />,
    )

    expect(container).toBeTruthy()
    expect(container.innerHTML).toContain('cursor-pointer')
    expect(container.innerHTML).toContain('tabindex="0"')
  })

  it('renders without optional props', () => {
    const { container } = render(<StatsCount title="Test Title" value="123" />)

    expect(container).toBeTruthy()
    expect(container.textContent).toContain('Test Title')
    expect(container.textContent).toContain('123')
  })

  it('renders with custom icon and color scheme', () => {
    const TestIcon = () => (
      <span data-testid="test-icon" role="img" aria-label="target icon">
        🎯
      </span>
    )

    const { container } = render(
      <StatsCount
        title="Test Title"
        value="123"
        icon={<TestIcon />}
        iconColorScheme="purple"
      />,
    )

    expect(container).toBeTruthy()
    expect(container.textContent).toContain('🎯')
    expect(container.innerHTML).toContain('bg-purple-100')
    expect(container.innerHTML).toContain('text-purple-600')
  })

  it('renders with different size variants', () => {
    const { container: smallContainer } = render(
      <StatsCount title="Test Title" value="123" size="sm" iconSize="sm" />,
    )
    expect(smallContainer.innerHTML).toContain('p-4')

    const { container: mediumContainer } = render(
      <StatsCount title="Test Title" value="123" size="md" iconSize="md" />,
    )
    expect(mediumContainer.innerHTML).toContain('p-6')

    const { container: largeContainer } = render(
      <StatsCount title="Test Title" value="123" size="lg" iconSize="lg" />,
    )
    expect(largeContainer.innerHTML).toContain('p-8')
  })

  it('renders with different variant types', () => {
    const { container: defaultContainer } = render(
      <StatsCount title="Test Title" value="123" variant="default" />,
    )
    expect(defaultContainer.innerHTML).toContain('bg-transparent')

    const { container: darkContainer } = render(
      <StatsCount title="Test Title" value="123" variant="dark" />,
    )
    expect(darkContainer.innerHTML).toContain('bg-gray-800')

    const { container: elevatedContainer } = render(
      <StatsCount title="Test Title" value="123" variant="elevated" />,
    )
    expect(elevatedContainer.innerHTML).toContain('shadow-md')
  })

  it('formats change values correctly', () => {
    const { container } = render(
      <StatsCount
        title="Test Title"
        value="123"
        change={{
          value: '5.5%',
          trend: 'positive',
          period: 'vs last week',
        }}
      />,
    )

    expect(container.textContent).toContain('+5.5% vs last week')
  })

  it('handles string numbers in change values', () => {
    const { container } = render(
      <StatsCount
        title="Test Title"
        value="123"
        change={{
          value: '+10%',
          trend: 'positive',
          period: 'vs last month',
        }}
      />,
    )

    expect(container.textContent).toContain('+10% vs last month')
  })

  it('handles numeric change values', () => {
    const { container } = render(
      <StatsCount
        title="Test Title"
        value="123"
        change={{
          value: -5,
          trend: 'negative',
          period: 'vs last quarter',
        }}
      />,
    )

    expect(container.textContent).toContain('-5 vs last quarter')
  })
})
