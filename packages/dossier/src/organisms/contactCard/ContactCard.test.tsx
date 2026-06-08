import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ContactCard } from './ContactCard'
import Tdm from '../../../tests/tdm'

describe('ContactCard', () => {
  it('should render successfully', () => {
    const data = Tdm.createContactCardProps()
    const { baseElement } = render(
      <ContactCard
        avatar={data.avatar}
        email={data.email}
        title={data.email}
        phone={data.phone}
        displayName={data.displayName}
      />
    )
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    const data = Tdm.createContactCardProps()
    render(
      <ContactCard
        avatar={data.avatar}
        displayName={data.displayName}
        email={data.email}
        title={data.email}
        phone={data.phone}
      />
    )
    expect(screen.getByText(data.displayName)).toBeInTheDocument()
  })
})
