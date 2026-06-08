import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { DomainManagerConfigDialog } from './DomainManagerConfigDialog'

describe('DomainManagerConfigDialog', () => {
  it('renders without crashing', async () => {
    render(
      <DomainManagerConfigDialog
        id={1}
        open
        onOpenChange={() => void 0}
        onSuccess={() => void 0}
      />,
      { withFalcon: true },
    )

    expect(await screen.findByText(/Create Config Options/i)).toBeTruthy()

    expect(
      await screen.findByRole('button', {
        name: /CREATE NEW CONFIG FROM LIVE/i,
      }),
    ).toBeTruthy()
  })
})
